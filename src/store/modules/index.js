import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// reducers
import challenges from './challenges'

export default history => combineReducers({
  router: connectRouter(history),
  challenges
})
