import Link from "next/link";

export interface NearbyAreasProps {
  serviceSlug: string;
  neighbourLocations: { id: string; name: string }[];
}

export function NearbyAreas({ serviceSlug, neighbourLocations }: NearbyAreasProps) {
  if (neighbourLocations.length === 0) return null;
  return (
    <div className="mb-8">
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
