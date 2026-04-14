# Service Hero Image Manifest

This project uses a deterministic build-time Unsplash manifest for service hero images.

## Why

- Same `serviceSlug` always resolves to the same hero image.
- No runtime Unsplash API dependency during page requests.
- No serverless cache randomness across verticals.

## Source of truth

- Generated file: `engine/data/generated/serviceHeroManifest.ts`
- Shared resolver: `engine/utils/heroImages.ts`
- Vertical adapters: `verticals/*/lib/images.ts`

## Required environment variable

- `UNSPLASH_API_KEY`

Keep this server/build-side only. Do not expose via `NEXT_PUBLIC_*`.

## Generate/refresh manifest

```bash
npm run images:service-heroes
```

Optional full refresh (re-fetch all known services):

```bash
node scripts/generate-service-hero-manifest.mjs --refresh
```

## Behavior

Image resolution order for hero images:

1. Build-time Unsplash manifest entry for `{verticalId}/{serviceSlug}`
2. Existing local static mapping in each vertical's `lib/images.ts`
3. Generic final fallback image URL

## Notes

- Script preserves existing manifest entries by default to avoid image churn.
- New services are discovered from each vertical's `services` array in `lib/data.ts`.
- Query strings are deterministic and grounded by vertical context.

