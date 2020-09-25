// modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// redux
import { getChallengesList } from '../../store/modules/challenges/thunks'
import {
  challengesList$,
  challengesListLoading$
} from '../../store/modules/challenges/selectors'
import { setChallengesList } from '../../store/modules/challenges/actions'

// component
import ChallengesList from './ChallengesList'

const mapStateToProps = state => ({
  challengesList: challengesList$(state),
  challengesListLoading: challengesListLoading$(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getChallengesList,
  setChallengesList
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengesList))
