export interface InlineTextSegment {
  type: "text";
  value: string;
}

export interface InlineLinkSegment {
  type: "link";
  text: string;
  href: string;
}

export type InlineSegment = InlineTextSegment | InlineLinkSegment;

/** Parses markdown-style inline links like [label](/path) for simple rich text rendering. */
export function parseInlineLinks(text: string): InlineSegment[] {
  const out: InlineSegment[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      out.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    out.push({ type: "link", text: match[1], href: match[2] });
    lastIndex = re.lastIndex;
  }

  if (lastIndex < text.length) {
    out.push({ type: "text", value: text.slice(lastIndex) });
  }

  return out.length > 0 ? out : [{ type: "text", value: text }];
}
