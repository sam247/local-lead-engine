#!/usr/bin/env bash
# Vercel Ignored Build Step: exit 0 = skip build, exit 1 = run build.
# For surveys: only build when verticals/surveys or engine changed.
# Invoke from project Root Directory (e.g. verticals/surveys) as: bash ../../scripts/vercel-ignore-build-surveys.sh
set -e
# Ensure we're at repo root (script may be run from verticals/surveys as ../../scripts/... or from repo root as scripts/...)
if [ -d "verticals/surveys" ] && [ -d "engine" ]; then
  REPO_ROOT="$(pwd)"
else
  REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
fi
cd "$REPO_ROOT"
if [ -z "${VERCEL_GIT_COMMIT_SHA}" ]; then exit 1; fi
if [ -z "${VERCEL_GIT_PREVIOUS_SHA}" ] || [ "${VERCEL_GIT_PREVIOUS_SHA}" = "0000000000000000000000000000000000000000" ]; then
  exit 1
fi
if git diff --name-only "${VERCEL_GIT_PREVIOUS_SHA}" "${VERCEL_GIT_COMMIT_SHA}" | grep -qE '^(verticals/surveys|engine)/'; then
  exit 1
fi
exit 0
