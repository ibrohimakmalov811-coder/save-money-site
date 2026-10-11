'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQPage() {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'What is MoneyQuest?',
      qUz: 'MoneyQuest nima?',
      qRu: 'Что такое MoneyQuest?',
      a: 'MoneyQuest is an interactive gamified financial literacy platform created for school and IT academy students. It teaches practical money management through realistic budgeting simulations, decision-based missions, and structured economic lessons.',
      aUz: 'MoneyQuest — bu maktab o‘quvchilari va IT akademiyalari talabalari uchun yaratilgan interaktiv o‘yinlashtirilgan moliyaviy ta’lim platformasi. U byudjet tuzish, ssenariylar va darslar orqali pulni to‘g‘ri boshqarishni o‘rgatadi.',
      aRu: 'MoneyQuest — это интерактивная платформа финансовой грамотности для школьников и студентов IT-академий. Она обучает управлению деньгами через симуляции бюджета, миссии и уроки.',
    },
    {
      q: 'Is MoneyQuest free to use for students?',
      qUz: 'Platformadan foydalanish bepulmi?',
      qRu: 'Платформа бесплатна для студентов?',
      a: 'Yes, MoneyQuest is 100% free and open for students and educators. All simulation tools, academy modules, and mission challenges are accessible without any paywalls.',
      aUz: 'Ha, MoneyQuest talabalar va o‘quvchilar uchun mutlaqo bepul. Barcha simulyatorlar va akademiya modullari ochiq.',
      aRu: 'Да, MoneyQuest полностью бесплатен для учащихся и преподавателей. Все инструменты и курсы открыты.',
    },
    {
      q: 'Does MoneyQuest connect to my real bank card or bank account?',
      qUz: 'MoneyQuest real bank kartamga ulanadimi?',
      qRu: 'Подключается ли платформа к реальной банковской карте?',
      a: 'No! MoneyQuest never connects to real bank accounts and never asks for card numbers or SMS passwords. All numbers, stipends, and expenses are simulated fictional figures (UZS) designed solely for risk-free learning.',
      aUz: 'Yo‘q! MoneyQuest hech qachon real bank hisoblariga ulanmaydi va karta yoki SMS parollarni so‘ramaydi. Barcha mablag‘lar xavfsiz ta’limiy simulyatsiya hisoblanadi.',
      aRu: 'Нет! MoneyQuest никогда не подключается к реальным счетам и не запрашивает данные карт. Все суммы — это безопасная обучающая симуляция.',
    },
    {
      q: 'How do missions and XP rewards work?',
      qUz: 'Missiyalar va XP ballari qanday ishlaydi?',
      qRu: 'Как работают миссии и баллы опыта (XP)?',
      a: 'Completing educational actions awards Experience Points (XP). Passing academy quizzes gives 30-40 XP, while completing budgeting challenges or surviving unexpected expense scenarios awards 50-80 XP. Accumulating XP advances your student rank from Money Beginner up to Financial Master.',
      aUz: 'Dars va vazifalarni muvaffaqiyatli topshirish orqali siz XP ballari yig‘asiz. XP to‘plangan sari unvoningiz "Pul Boshlovchisi"dan "Moliyaviy Usta" darajasigacha ko‘tariladi.',
      aRu: 'Выполнение заданий и тестов приносит очки опыта (XP). Накопление XP повышает ваш статус от новичка до финансового мастера.',
    },
    {
      q: 'Can I use MoneyQuest on my smartphone?',
      qUz: 'Telefon orqali foydalanish mumkinmi?',
      qRu: 'Можно ли пользоваться платформой со смартфона?',
      a: 'Absolutely. MoneyQuest is built with responsive mobile-first architecture, fully optimized for smartphones, tablets, and desktop displays.',
      aUz: 'Albatta. MoneyQuest smartfonlar, planshetlar va kompyuterlar ekraniga to‘liq moslashtirilgan.',
      aRu: 'Да. MoneyQuest полностью адаптирован для любых мобильных экранов и планшетов.',
    },
    {
      q: 'Is my personal data protected?',
      qUz: 'Mening ma’lumotlarim himoyalanganmi?',
      qRu: 'Защищены ли мои данные?',
      a: 'Yes. In interactive demo mode, your progress is safely stored in your own browser localStorage. When integrated with Supabase, every user profile is protected by PostgreSQL Row Level Security (RLS).',
      aUz: 'Ha. Demo rejimda ma’lumotlar sizning brauzeringizda saqlanadi. Supabase ulanishida esa barcha yozuvlar RLS xavfsizlik siyosati bilan himoyalangan.',
      aRu: 'Да. В демо-режиме прогресс хранится локально в браузере, а при подключении Supabase защищён политиками Row Level Security.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/20 text-sky-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-300">
          Everything you need to know about the MoneyQuest learning platform.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, idx) => {
          const isOpen = openFaq === idx;
          const qText = language === 'uz' ? item.qUz : language === 'ru' ? item.qRu : item.q;
          const aText = language === 'uz' ? item.aUz : language === 'ru' ? item.aRu : item.a;

          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#121A2B] border border-[#23324E] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-slate-100 hover:text-white cursor-pointer"
              >
                <span>{qText}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-3" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#23324E]/60 pt-3">
                  {aText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
