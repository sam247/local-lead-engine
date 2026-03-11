export interface ServiceImageGalleryProps {
  images: { src: string; alt?: string }[];
}

export function ServiceImageGallery({ images }: ServiceImageGalleryProps) {
  if (!images?.length) return null;
  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt ?? ""}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
