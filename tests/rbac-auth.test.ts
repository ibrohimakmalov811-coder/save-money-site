import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '../src/lib/validation/auth';
import {
  getAdminUsers,
  promoteUserToAdmin,
  revokeAdminRole,
  suspendUserAccount,
  restoreUserAccount,
  getAuditLogs,
  SUPER_ADMIN_EMAIL,
} from '../src/lib/server/adminService';
import { registerServerAction } from '../src/app/actions/authActions';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

async function runTests() {
  console.log('--- Running MoneyQuest RBAC, Security & Auth Validation Tests ---');

  // 1. Zod Registration Validation
  console.log('Test 1: Registration schema validation...');
  const validRegistration = {
    fullName: 'Aziz Bektemirov',
    email: 'aziz@example.com',
    password: 'Password123',
    confirmPassword: 'Password123',
    agreeTerms: true,
  };
  const validRes = registerSchema.safeParse(validRegistration);
  assert(validRes.success, 'Valid registration should parse successfully');

  // Password too short (< 8 chars)
  const shortPassRes = registerSchema.safeParse({
    ...validRegistration,
    password: 'Pass1',
    confirmPassword: 'Pass1',
  });
  assert(!shortPassRes.success, 'Password < 8 chars must fail');

  // Password missing numbers
  const noNumberRes = registerSchema.safeParse({
    ...validRegistration,
    password: 'PasswordOnly',
    confirmPassword: 'PasswordOnly',
  });
  assert(!noNumberRes.success, 'Password without digits must fail');

  // Password missing uppercase
  const noUpperRes = registerSchema.safeParse({
    ...validRegistration,
    password: 'password123',
    confirmPassword: 'password123',
  });
  assert(!noUpperRes.success, 'Password without uppercase must fail');

  // Password mismatch
  const mismatchRes = registerSchema.safeParse({
    ...validRegistration,
    confirmPassword: 'DifferentPassword123',
  });
  assert(!mismatchRes.success, 'Mismatched passwords must fail');

  // Unchecked terms
  const termsRes = registerSchema.safeParse({
    ...validRegistration,
    agreeTerms: false,
  });
  assert(!termsRes.success, 'Unchecked terms must fail');

  // 2. Server Action Role Hardening (Never allow client-side role injection)
  console.log('Test 2: Server-side registration role strictly defaults to "user"...');
  const maliciousPayload = {
    fullName: 'Hacker Attempt',
    email: 'hacker@example.com',
    password: 'SecurePassword1',
    confirmPassword: 'SecurePassword1',
    agreeTerms: true,
    role: 'super_admin', // injected
  };
  const regActionRes = await registerServerAction(maliciousPayload);
  assert(regActionRes.success, 'Registration executes');
  assert(regActionRes.user?.role === 'user', 'Injected role is ignored and strictly set to "user"');

  // 3. User Directory & Initial Roles
  console.log('Test 3: Seed users and role hierarchy...');
  const initialUsers = await getAdminUsers();
  const superAdmin = initialUsers.find((u) => u.role === 'super_admin');
  const regularAdmin = initialUsers.find((u) => u.role === 'admin');
  const student = initialUsers.find((u) => u.role === 'user');

  assert(!!superAdmin, 'Super Admin account exists');
  assert(superAdmin?.email === SUPER_ADMIN_EMAIL, 'Super Admin matches owner email');
  assert(!!regularAdmin, 'Admin account exists');
  assert(!!student, 'Student account exists');

  // 4. Super Admin Immutability Safeguards
  console.log('Test 4: Super Admin immutability (cannot be demoted or suspended)...');
  let superAdminRevokeFailed = false;
  try {
    await revokeAdminRole('super_admin', SUPER_ADMIN_EMAIL, superAdmin!.id);
  } catch (err: unknown) {
    superAdminRevokeFailed = true;
    assert((err as Error).message.includes('CRITICAL SECURITY VIOLATION'), 'Throws critical violation on revoke');
  }
  assert(superAdminRevokeFailed, 'Revoking Super Admin must throw an error');

  let superAdminSuspendFailed = false;
  try {
    await suspendUserAccount('super_admin', SUPER_ADMIN_EMAIL, superAdmin!.id);
  } catch (err: unknown) {
    superAdminSuspendFailed = true;
    assert((err as Error).message.includes('CRITICAL SECURITY VIOLATION'), 'Throws critical violation on suspend');
  }
  assert(superAdminSuspendFailed, 'Suspending Super Admin must throw an error');

  // 5. Privilege Escalation Guards for Non-Super-Admins
  console.log('Test 5: Non-super_admin cannot promote or revoke...');
  let adminPromoteFailed = false;
  try {
    // Admin attempting to promote another user
    await promoteUserToAdmin('admin', 'admin@moneyquest.uz', student!.id);
  } catch (err: unknown) {
    adminPromoteFailed = true;
    assert((err as Error).message.includes('Unauthorized'), 'Admin cannot promote users');
  }
  assert(adminPromoteFailed, 'Admin role promotion attempt by regular admin must fail');

  let userPromoteFailed = false;
  try {
    // Student user attempting to promote another user
    await promoteUserToAdmin('user', 'student@moneyquest.uz', student!.id);
  } catch (err: unknown) {
    userPromoteFailed = true;
    assert((err as Error).message.includes('Unauthorized'), 'Student cannot promote users');
  }
  assert(userPromoteFailed, 'Promotion attempt by student must fail');

  // 6. Super Admin Legit Operations: Promote, Revoke, Suspend, Restore
  console.log('Test 6: Authorized Super Admin operations...');
  // Promote student to admin
  const promoteRes = await promoteUserToAdmin('super_admin', SUPER_ADMIN_EMAIL, student!.id);
  assert(promoteRes.success, 'Super Admin can promote student');
  assert(student!.role === 'admin', 'Student role updated to admin');

  // Revoke admin back to student
  const revokeRes = await revokeAdminRole('super_admin', SUPER_ADMIN_EMAIL, student!.id);
  assert(revokeRes.success, 'Super Admin can revoke admin');
  assert(student!.role === 'user', 'Student role restored to user');

  // Suspend student
  const suspendRes = await suspendUserAccount('super_admin', SUPER_ADMIN_EMAIL, student!.id);
  assert(suspendRes.success, 'Super Admin can suspend student');
  assert(student!.isSuspended === true, 'Student isSuspended is true');

  // Restore student
  const restoreRes = await restoreUserAccount('super_admin', SUPER_ADMIN_EMAIL, student!.id);
  assert(restoreRes.success, 'Super Admin can restore student');
  assert(student!.isSuspended === false, 'Student isSuspended is false');

  // 7. Audit Logging Verification
  console.log('Test 7: Tamper-proof audit logging verification...');
  const auditLogs = await getAuditLogs();
  assert(auditLogs.length >= 4, 'Audit logs have recorded the administrative events');
  const loggedActions = auditLogs.map((l) => l.action);
  assert(loggedActions.includes('PROMOTE_TO_ADMIN'), 'PROMOTE_TO_ADMIN recorded in audit logs');
  assert(loggedActions.includes('REVOKE_ADMIN'), 'REVOKE_ADMIN recorded in audit logs');
  assert(loggedActions.includes('SUSPEND_ACCOUNT'), 'SUSPEND_ACCOUNT recorded in audit logs');
  assert(loggedActions.includes('RESTORE_ACCOUNT'), 'RESTORE_ACCOUNT recorded in audit logs');

  console.log('🎉 ALL 7 RBAC, SECURITY & AUTH VALIDATION TESTS PASSED 100%!');
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
