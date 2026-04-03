export type StrikingDistancePriority = "high" | "medium";
export type StrikingDistanceStatus = "testing" | "winner" | "stalled";

export interface StrikingDistanceDonorAssignments {
  relatedServicePages: string[];
  nearbyLocationPages: string[];
  guideDonorStrategy: string;
}

export interface StrikingDistanceManifestEntryBase {
  vertical: string;
  serviceSlug: string;
  locationSlug: string;
  currentPosition: number | null;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  sourceRowCount: number;
  sourceMatchType: "exact" | "mapped" | "mixed";
  sampleQueries: string[];
  donorAssignments: StrikingDistanceDonorAssignments;
  locationArea: string | null;
}

export interface StrikingDistanceManifestLifecycleFields {
  priority?: StrikingDistancePriority;
  phase?: number;
  status?: StrikingDistanceStatus;
  dateAdded?: string;
  lastUpdated?: string;
  notes?: string;
}

export interface StrikingDistanceManifestEntry
  extends StrikingDistanceManifestEntryBase,
    Required<StrikingDistanceManifestLifecycleFields> {}
