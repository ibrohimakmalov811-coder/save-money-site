'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Mission Idea');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Contact & Feedback</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Have an idea for a new mission or want to partner with your IT school? Send us a message!
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] shadow-2xl">
        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Message Dispatched!</h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Tashkent IT Academy & School educational team has received your note. Thank you for contributing to better financial literacy in Uzbekistan!
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold cursor-pointer"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jasur Temirov"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.uz"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500 cursor-pointer"
              >
                <option value="Feedback / Mission Idea">Feedback / Suggest a Mission Idea</option>
                <option value="School Partnership">IT Academy or School Partnership</option>
                <option value="Bug Report">Technical Bug Report</option>
                <option value="General Question">General Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Message Content</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your feedback, suggestion, or question..."
                className="w-full p-3 rounded-xl bg-[#0B1020] border border-[#23324E] text-white focus:outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/30 flex items-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
