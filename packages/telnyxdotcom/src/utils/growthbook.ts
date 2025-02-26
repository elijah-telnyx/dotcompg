/**
 * `as const` and a map that has feature id/key exactly matching feature keys in https://app.growthbook.io/features is necessary to make sure growthbook code references are linked. See:
 * - https://docs.growthbook.io/features/code-references
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
 */
export const FEATURES = {
  'contact-us-dotcom-3553': 'contact-us-dotcom-3553' as const,
};
