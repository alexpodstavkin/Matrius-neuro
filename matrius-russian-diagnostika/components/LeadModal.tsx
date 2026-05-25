'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LeadForm from './LeadForm';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LeadModal({ open, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="shell relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.96, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.96, y: 20, filter: 'blur(6px)' }}
            transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-flush p-6 md:p-8 relative">
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть"
                className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-navy hover:bg-surface-soft transition-colors"
              >
                ✕
              </button>

              <h2 className="h2 mb-5">
                Записаться на&nbsp;<span className="text-orange">бесплатную диагностику</span>
              </h2>

              <LeadForm variant="light" submitLabel="Записаться" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
