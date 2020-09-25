// modules
import React from 'react'
import { isEmpty } from 'lodash'

const QuestionsList = ({ list }) => {
  return (
    !isEmpty(list) ? <div className="questions-list">
      {
        list.map(({ question, answer }, key) => (
          <div key={key} className="question-item">
            <p className="question">{`Q: ${question}`}</p>
            <p className="answer">{`A: ${answer}`}</p>
          </div>
        ))
      }
    </div> : null
  )
}

export default QuestionsList
