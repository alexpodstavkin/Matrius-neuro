import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

type BookingCtx = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<BookingCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  return <Ctx.Provider value={{ isOpen, open, close }}>{children}</Ctx.Provider>;
}

export function useBooking() {
  return useContext(Ctx);
}
