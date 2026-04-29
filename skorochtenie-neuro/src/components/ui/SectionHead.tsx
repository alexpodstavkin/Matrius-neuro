import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type Props = {
  kicker: string;
  title: ReactNode;
  text?: ReactNode;
};

export function SectionHead({ kicker, title, text }: Props) {
  return (
    <Reveal className="section-head">
      <span className="kicker">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
