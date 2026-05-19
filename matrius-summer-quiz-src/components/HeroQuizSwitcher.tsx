'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Quiz, { type Answers } from './Quiz';

type Mode = 'hero' | 'quiz' | 'success';

export default function HeroQuizSwitcher() {
  const [mode, setMode] = useState<Mode>('hero');
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    function onStart() {
      setMode('quiz');
      const el = document.getElementById('hero-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.addEventListener('matrius:start-quiz', onStart);
    return () => window.removeEventListener('matrius:start-quiz', onStart);
  }, []);

  return (
    <section id="hero-section" className="relative w-full">
      <div className="w-full px-4 md:px-[216px] lg:px-[288px] py-10 md:py-14 lg:py-20">
        <div className="relative">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {mode === 'hero' && <Hero onStart={() => setMode('quiz')} />}
            {mode === 'quiz' && (
              <Quiz
                initialAnswers={answers}
                onBackToHero={() => setMode('hero')}
                onSuccess={(data) => {
                  setAnswers(data);
                  setMode('success');
                }}
              />
            )}
            {mode === 'success' && (
              <div className="mx-auto max-w-2xl">
                <div className="card p-6 md:p-10 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 text-orange text-2xl font-bold mb-4">
                    ✓
                  </div>
                  <h2 className="h2 mb-3">Спасибо!</h2>
                  <p className="lead mb-6">
                    Материалы придут на&nbsp;указанную почту.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMode('hero')}
                    className="btn-ghost"
                  >
                    Вернуться на главную
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
