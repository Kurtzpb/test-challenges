// modules
import { createSelector } from 'reselect'
import { get } from 'lodash'

export const challengesState = state => get(state, 'challenges', {})

export const challengesList$ = createSelector(
  challengesState,
  ({ challengesList }) => challengesList
)

export const challengesListLoading$ = createSelector(
  challengesState,
  ({ challengesListLoading }) => challengesListLoading
)

export const activeChallenge$ = createSelector(
  challengesState,
  ({ activeChallenge }) => activeChallenge
)

export const activeChallengeLoading$ = createSelector(
  challengesState,
  ({ activeChallengeLoading }) => activeChallengeLoading
)
