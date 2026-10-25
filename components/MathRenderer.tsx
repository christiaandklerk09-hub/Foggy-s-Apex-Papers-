'use client';

import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  text: string;
  isBlock?: boolean;
}

/**
 * Safely renders LaTeX formulas with KaTeX, falling back to clean text if syntax is in-progress.
 */
function SafeInlineMath({ math }: { math: string }) {
  try {
    return <InlineMath math={math} errorColor="#e11d48" renderError={() => <span className="font-mono text-rose-600">{math}</span>} />;
  } catch {
    return <span className="font-mono text-rose-600">{math}</span>;
  }
}

function SafeBlockMath({ math }: { math: string }) {
  try {
    return <BlockMath math={math} errorColor="#e11d48" renderError={() => <div className="font-mono text-rose-600 my-1">{math}</div>} />;
  } catch {
    return <div className="font-mono text-rose-600 my-1">{math}</div>;
  }
}

/**
 * Renders text with LaTeX formulas. 
 * Looks for $...$ for inline and $$...$$ for block math.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ text }) => {
  if (!text) return null;

  // Simple regex to split text and math ($...$ or $$...$$)
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const content = part.slice(2, -2).trim();
          return <SafeBlockMath key={index} math={content} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const content = part.slice(1, -1).trim();
          return <SafeInlineMath key={index} math={content} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
