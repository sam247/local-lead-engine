export interface LocationContextProps {
  serviceTitle: string;
  locationName: string;
  locationArea: string;
  neighbourNames: string[];
  /** When provided, renders H2 + this paragraph (60–100 words) and optional neighbour list; otherwise uses the default short paragraph. */
  contextParagraph?: string;
}

export function LocationContext({
  serviceTitle,
  locationName,
  locationArea,
  neighbourNames,
  contextParagraph,
}: LocationContextProps) {
  return (
    <div className="mb-8">
      {contextParagraph ? (
        <>
          <h2 className="mb-4 font-display text-2xl font-bold">
            {serviceTitle} in {locationName}
          </h2>
          <p className="mb-4 text-muted-foreground">{contextParagraph}</p>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
