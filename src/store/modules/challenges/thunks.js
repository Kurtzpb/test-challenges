// API
import HttpClient from '../../../services/HttpClient'

// components
import Modal from 'antd/es/modal'

// constants
import {
  GET_CHALLENGES_LIST,
  GET_CHALLENGE
} from '../../../constants'

// actions
import {
  setChallengesList,
  setChallengesListLoading,
  setActiveChallenge,
  setActiveChallengeLoading
} from './actions'

export const getChallengesList = (query = {}) => async dispatch => {
  dispatch(setChallengesListLoading(true))

  try {
    const { challengesList, totalCount, totalPages } = await HttpClient.request({
      method: 'get',
      url: {
        pathname: GET_CHALLENGES_LIST,
        query
      }
    })

    const mappedList = challengesList.map(challenge => ({
      ...challenge,
      isFavorite: false
    }))

    dispatch(setChallengesList(mappedList))

    return { totalCount, totalPages }
  } catch (err) {
    Modal.error()
    return err
  } finally {
    dispatch(setChallengesListLoading(false))
  }
}

export const getChallenge = challengeId => async dispatch => {
  dispatch(setActiveChallengeLoading(true))

  try {
    const challenge = await HttpClient.request({
      method: 'get',
      url: {
        pathname: GET_CHALLENGE,
        params: { challengeId }
      }
    })

    dispatch(setActiveChallenge(challenge))
  } catch (err) {
    Modal.error()
    return err
  } finally {
    dispatch(setActiveChallengeLoading(false))
  }
}
