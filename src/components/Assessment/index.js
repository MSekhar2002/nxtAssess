import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Questions from '../Questions'

class Assessment extends Component {
  state = {
    assQuestions: [],
    currentQuestionIndex: 0,
    answeredCount: 0,
    unansweredCount: 0,
    timer: 300,
    selectedOptions: {},
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    const data = await response.json()
    // console.log(data)
    const updatedData = data.questions.map(eachQuestion => ({
      id: eachQuestion.id,
      optionsType: eachQuestion.options_type,
      questionText: eachQuestion.question_text,
      options: eachQuestion.options.map(eachOption => ({
        optionId: eachOption.id,
        text: eachOption.text,
        isCorrect: eachOption.is_correct,
        imageUrl: eachOption.image_url,
      })),
    }))
    this.setState({assQuestions: updatedData})
    console.log(updatedData)
  }

  render() {
    const {assQuestions, currentQuestionIndex} = this.state

    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="question-container">
            <h1>question</h1>

            <Questions
              key={assQuestions[currentQuestionIndex].id}
              question={assQuestions[currentQuestionIndex]}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Assessment
