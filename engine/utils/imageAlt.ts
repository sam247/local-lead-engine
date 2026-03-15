export interface GetImageAltParams {
  /** Service or page context (e.g. "Drain collapse repair", "CCTV drain survey"). */
  service: string;
  /** Location name when relevant (e.g. "Richmond", "Kingston"). */
  location?: string;
  /** Suffix when no location (e.g. "drainage service", "drainage inspection"). Default "drainage service". */
  noLocationSuffix?: string;
}

const DEFAULT_NO_LOCATION_SUFFIX = "drainage service";

/**
 * Generate alt text for images when alt is missing.
 * With location: "{service} in {location}".
 * Without location: "{service} {noLocationSuffix}".
 */
export function getImageAlt({
  service,
  location,
  noLocationSuffix = DEFAULT_NO_LOCATION_SUFFIX,
}: GetImageAltParams): string {
  if (location?.trim()) {
    return `${service} in ${location}`;
  }
  return `${service} ${noLocationSuffix}`;
}
