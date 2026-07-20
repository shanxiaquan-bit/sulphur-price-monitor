import { ExternalLink } from 'lucide-react';

interface SourceLinkProps {
  source: string;
  url: string;
  className?: string;
}

/** 来源标注：名称 + 可点击外链 */
export default function SourceLink({ source, url, className = '' }: SourceLinkProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs text-[#8A8177] transition-colors hover:text-[#B45309] ${className}`}
    >
      <span className="leading-snug">来源：{source}</span>
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden />
    </a>
  );
}
