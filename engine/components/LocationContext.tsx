export interface LocationContextProps {
  serviceTitle: string;
  locationName: string;
  locationArea: string;
  neighbourNames: string[];
}

export function LocationContext({
  serviceTitle,
  locationName,
  locationArea,
  neighbourNames,
}: LocationContextProps) {
  return (
    <div className="mb-8">
      <p className="mb-4 text-muted-foreground">
        Our engineers provide {serviceTitle.toLowerCase()} services across {locationName} and
        surrounding areas. We regularly attend residential and commercial properties throughout the
        region including nearby towns and boroughs.
      </p>
      {neighbourNames.length > 0 && (
        <>
          <p className="mb-2 text-sm font-medium text-foreground">
            Nearby areas we cover include:
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {neighbourNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
