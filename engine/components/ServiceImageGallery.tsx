export interface ServiceImageGalleryProps {
  images: { src: string; alt?: string }[];
  /** When an image has no alt, use this fallback (e.g. from getImageAlt). Only used when alt is missing. */
  imageAltFallback?: (index: number) => string;
}

export function ServiceImageGallery({ images, imageAltFallback }: ServiceImageGalleryProps) {
  if (!images?.length) return null;
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt ?? imageAltFallback?.(i) ?? ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
