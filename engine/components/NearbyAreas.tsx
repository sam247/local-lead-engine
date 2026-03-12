import Link from "next/link";

export interface NearbyAreasProps {
  serviceSlug: string;
  neighbourLocations: { id: string; name: string }[];
  /** When provided, a short intro sentence is shown above the list (e.g. "X services are also provided across nearby areas including A, B, C."). */
  serviceTitle?: string;
}

function formatList(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  const last = names[names.length - 1];
  const rest = names.slice(0, -1);
  return `${rest.join(", ")} and ${last}`;
}

export function NearbyAreas({ serviceSlug, neighbourLocations, serviceTitle }: NearbyAreasProps) {
  if (neighbourLocations.length === 0) return null;
  const names = neighbourLocations.map((l) => l.name);
  return (
    <div className="mb-8">
      {serviceTitle && names.length > 0 && (
        <p className="mb-3 text-muted-foreground">
          {serviceTitle} services are also provided across nearby areas including {formatList(names)}.
        </p>
      )}
      <h3 className="mb-3 font-display text-lg font-bold">Nearby service areas</h3>
      <ul className="space-y-2">
        {neighbourLocations.map((loc) => (
          <li key={loc.id}>
            <Link
              href={`/${serviceSlug}/${loc.id}`}
              className="text-primary hover:underline"
            >
              {loc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
