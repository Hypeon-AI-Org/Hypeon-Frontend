'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { SiClaude, SiGooglegemini, SiOpenai, SiPerplexity } from 'react-icons/si';
import type { IconType } from 'react-icons';

import type { EngineId } from '@/lib/tools/engines';

const ENGINE_LOOK: Record<EngineId, { Icon: IconType; tint: string }> = {
  chatgpt: { Icon: SiOpenai, tint: 'bg-[#10a37f]' },
  claude: { Icon: SiClaude, tint: 'bg-[#d97757]' },
  gemini: { Icon: SiGooglegemini, tint: 'bg-gradient-to-br from-[#4796e3] to-[#9177c7]' },
  perplexity: { Icon: SiPerplexity, tint: 'bg-[#20808d]' },
};

export function EngineMark({ id, size = 32 }: { id: EngineId; size?: number }) {
  const { Icon, tint } = ENGINE_LOOK[id];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-[30%] text-white ${tint}`}
      style={{ width: size, height: size }}
    >
      <Icon style={{ width: size * 0.55, height: size * 0.55 }} aria-hidden />
    </span>
  );
}

/** Three bouncing dots, for an assistant that is still answering. */
export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Answering">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-white/50"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

/** Model answers arrive as Markdown; show them as clean prose. */
export function cleanAnswer(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1')
    .replace(/\[\d+\]/g, '')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)\*([^*\n]+)\*/g, '$1$2')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Wraps every occurrence of the given names in a green highlight. */
export function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const usable = terms.filter((t) => t.length >= 3);
  if (!usable.length) return <>{text}</>;
  const re = new RegExp(`(${usable.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="rounded bg-[#00da7f]/20 px-0.5 text-[#00da7f]">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
