// modules
import { handleActions } from 'redux-actions'

// actions
import {
  setChallengesList,
  setChallengesListLoading,
  setActiveChallenge,
  setActiveChallengeLoading
} from './actions'

const initialState = {
  challengesList: [],
  challengesListLoading: false,
  activeChallenge: {},
  activeChallengeLoading: false
}

export default handleActions({
  [setChallengesList] (state, { payload: challengesList }) {
    return {
      ...state,
      challengesList
    }
  },
  [setChallengesListLoading] (state, { payload: challengesListLoading }) {
    return {
      ...state,
      challengesListLoading
    }
  },
  [setActiveChallenge] (state, { payload: activeChallenge }) {
    return {
      ...state,
      activeChallenge
    }
  },
  [setActiveChallengeLoading] (state, { payload: activeChallengeLoading }) {
    return {
      ...state,
      activeChallengeLoading
    }
  }
}, initialState)
