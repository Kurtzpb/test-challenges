// modules
import React from 'react'
import { get } from 'lodash'
import moment from 'moment'

// components
import QuestionsList from './children/QuestionsList'
import Spin from 'antd/es/spin'
import { Link } from 'react-router-dom'

class Challenge extends React.Component {
  componentDidMount = () => {
    const {
      match: { params: { id } },
      getChallenge
    } = this.props

    getChallenge(id)
  }

  componentWillUnmount = () => {
    const { setActiveChallenge } = this.props

    setActiveChallenge({})
  }

  render () {
    const {
      activeChallenge,
      activeChallengeLoading      
    } = this.props

    if (activeChallengeLoading) return <Spin size="large" />

    return (
      <div className="challenge-page">
        <Link to="/">Back to Challenges List</Link>
        <div className="challenge-header">
          <img alt="Logo" src={get(activeChallenge, 'challengeImage', '')} width={150} height={150} />
          <div>
            <p>{`${get(activeChallenge, 'challengeName', '')} - ${moment(get(activeChallenge, 'createdAt', moment())).format('Do MMMM, YYYY')}`}</p>
            <div className="author-info">
              <img alt="Logo" src={get(activeChallenge, ['author', 'icon'], '')} width={100} height={100} />
              <p>{`${get(activeChallenge, ['author', 'firstName'], '')} ${get(activeChallenge, ['author', 'lastName'], '')}`}</p>
            </div>
          </div>
        </div>        
        <QuestionsList list={get(activeChallenge, 'questions', '')} />
      </div>
    )
  }
}

export default Challenge
