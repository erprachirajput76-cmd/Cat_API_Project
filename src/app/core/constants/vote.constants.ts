/**
 * Vote values for like/dislike (API and UI).
 */
export enum VoteValue {
  Dislike = 0,
  Like = 1,
}

export const VOTE_VALUE = {
  LIKE: 1 as const,
  DISLIKE: 0 as const,
} as const;
