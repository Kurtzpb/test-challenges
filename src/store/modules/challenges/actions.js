// modules
import { createAction } from 'redux-actions'

export const setChallengesList = createAction('SET_CHALLENGES_LIST')
export const setChallengesListLoading = createAction('SET_CHALLENGES_LIST_LOADING')

export const setActiveChallenge = createAction('SET_ACTIVE_CHALLENGE')
export const setActiveChallengeLoading = createAction('SET_ACTIVE_CHALLENGE_LOADING')
