import { cn } from "../utils/cn";

export interface MapEmbedProps {
  lat: number;
  lng: number;
  className?: string;
  /** Height of the iframe in pixels. Default 300. */
  height?: number;
  /** Optional title for the iframe for accessibility. */
  title?: string;
}

const DEFAULT_HEIGHT = 300;

export function MapEmbed({
  lat,
  lng,
  className,
  height = DEFAULT_HEIGHT,
  title = "Map",
}: MapEmbedProps) {
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height={height}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      className={cn("rounded-lg", className)}
    />
  );
}
