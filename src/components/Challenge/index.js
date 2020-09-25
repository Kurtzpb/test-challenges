// modules
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

// redux
import { getChallenge } from '../../store/modules/challenges/thunks'
import { setActiveChallenge } from '../../store/modules/challenges/actions'
import {
  activeChallenge$,
  activeChallengeLoading$
} from '../../store/modules/challenges/selectors'

// component
import Challenge from './Challenge'

const mapStateToProps = state => ({
  activeChallenge: activeChallenge$(state),
  activeChallengeLoading: activeChallengeLoading$(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getChallenge,
  setActiveChallenge
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Challenge))