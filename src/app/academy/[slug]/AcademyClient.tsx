'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useApp } from '@/context/AppContext';
import { academyModules } from '@/lib/data/academyData';
import { playErrorSound } from '@/lib/sounds';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Check,
  X,
  RotateCcw,
} from 'lucide-react';

export function AcademyClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { language } = useLanguage();
  const { state, completeLessonQuiz } = useApp();

  const currentModule = academyModules.find((m) => m.slug === slug);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  if (!currentModule) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Module Not Found</h2>
        <p className="text-slate-400 text-sm">This lesson module does not exist.</p>
        <Link href="/academy" className="inline-block px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold">
          Return to Academy
        </Link>
      </div>
    );
  }

  const isAlreadyCompleted = state.completedLessons.includes(currentModule.id);
  const localizedTitle =
    language === 'uz'
      ? currentModule.titleUz
      : language === 'ru'
      ? currentModule.titleRu
      : currentModule.title;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    const unanswered = currentModule.quiz.filter((q) => userAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      playErrorSound();
      alert(`Please answer all ${currentModule.quiz.length} questions before submitting.`);
      return;
    }

    let correctCount = 0;
    currentModule.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / currentModule.quiz.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= 70) {
      completeLessonQuiz(currentModule.id, calculatedScore, currentModule.xpReward);
    } else {
      playErrorSound();
    }
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const currentIndex = academyModules.findIndex((m) => m.id === currentModule.id);
  const nextModule =
    currentIndex + 1 < academyModules.length ? academyModules[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/academy"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Modules</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-violet-600/15 border border-violet-500/20 text-violet-300 text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>+{currentModule.xpReward} XP Quiz Reward</span>
          </span>
          {isAlreadyCompleted && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Passed</span>
            </span>
          )}
        </div>
      </div>

      {/* Lesson Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#182238] via-[#121A2B] to-[#0B1020] border border-[#23324E] space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-[#0B1020] text-sky-400 border border-[#23324E] font-medium">
            Module {currentIndex + 1} • {currentModule.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {currentModule.durationMin} minutes read
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{localizedTitle}</h1>
      </div>

      {/* Structured Lesson Content Sections */}
      <article className="space-y-6">
        {currentModule.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-[#121A2B] border border-[#23324E] space-y-3"
          >
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center text-xs font-extrabold">
                {idx + 1}
              </span>
              <span>{sec.heading}</span>
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {sec.body}
            </div>
          </div>
        ))}
      </article>

      {/* INTERACTIVE QUIZ SECTION */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#182238] to-[#121A2B] border border-violet-500/30 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-[#23324E]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Module Comprehension Quiz</h3>
              <p className="text-xs text-slate-400">
                Score 70% or higher to earn XP and complete this module.
              </p>
            </div>
          </div>

          {quizSubmitted && (
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Your Score:</span>
              <span
                className={`text-xl font-black ${
                  (quizScore || 0) >= 70 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {quizScore}%
              </span>
            </div>
          )}
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {currentModule.quiz.map((q, qIndex) => {
            const chosen = userAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-[#0B1020] border border-[#23324E] space-y-3"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#182238] text-slate-300 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIndex + 1}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {q.question}
                  </h4>
                </div>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex;
                    let optionStyle = 'bg-[#121A2B] border-[#23324E] text-slate-300 hover:border-slate-500';

                    if (quizSubmitted) {
                      if (optIndex === q.correctIndex) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-violet-600/20 border-violet-500 text-white font-semibold';
                    }

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-violet-400 bg-violet-600 text-white'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{opt}</span>
                        </div>

                        {quizSubmitted && optIndex === q.correctIndex && (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {quizSubmitted && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3 rounded-xl bg-[#182238] border border-[#23324E] text-[11px] text-slate-300 leading-relaxed space-y-1">
                    <span className="font-bold text-sky-400 block">Economic Explanation:</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Controls */}
        <div className="pt-4 border-t border-[#23324E] flex flex-col sm:flex-row items-center justify-between gap-3">
          {!quizSubmitted ? (
            <button
              type="button"
              onClick={handleSubmitQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Quiz Answers</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 w-full justify-between">
              <button
                type="button"
                onClick={handleRetakeQuiz}
                className="px-4 py-2 rounded-xl bg-[#182238] hover:bg-[#202d4a] text-slate-300 text-xs font-semibold border border-[#23324E] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              {nextModule && (
                <Link
                  href={`/academy/${nextModule.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>Next: {nextModule.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
