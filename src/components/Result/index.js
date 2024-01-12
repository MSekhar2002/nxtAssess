import {Link} from 'react-router-dom'
import Header from '../Header'

import './result.css'

const Result = props => {
  const {location} = props
  const {state} = location
  const {score, formattedTimer} = state

  return (
    <>
      <Header />
      <div className="bg-container">
        <div className="result-container">
          <img
            src="https://res.cloudinary.com/dzaz9bsnw/image/upload/v1704821915/Layer_2_prwvp6.jpg"
            alt="submit"
            className="result-image"
          />
          <h1 className="congrats-head">
            Congrats! You completed the assessment.
          </h1>
          <p className="about-time">Time Taken: {formattedTimer}</p>
          <h1 className="about-score">Your Score: {score}</h1>
          <Link to="/assessment">
            <button type="button" className="re-btn">
              Reattempt
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Result
