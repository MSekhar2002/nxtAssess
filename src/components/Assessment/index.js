import {Component} from 'react'
import './index.css'
import Header from '../Header'
import DefaultQuestion from '../DefaultQuestion'
import ImageQuestion from '../ImageQuestion'
import SingleSelectQuestion from '../SingleSelectQuestion'
import AssessmentSummary from '../AssessmentSummary'

class Assessment extends Component {
  state = {
    assQuestions: [],
    currentQuestionIndex: 0,
    answeredQuestions: 0,
    unansweredQuestions: 0,
    timer: 600,
    selectedOptions: {},
    score: 0,
    isSelected: false,
    selectedQuestionIndex: null,
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

  handleOptionSelect = optionId => {
    const {assQuestions, currentQuestionIndex, selectedOptions} = this.state
    const currentQuestion = assQuestions[currentQuestionIndex]
    const selectedOptionData = currentQuestion.options.find(
      option => option.optionId === optionId,
    )

    if (selectedOptionData.isCorrect === 'true') {
      this.setState(prevState => ({
        score: prevState.score + 1,
        isSelected: true,
      }))
    } else if (selectedOptions) {
      this.setState(prevState => ({
        answeredQuestion: prevState.answeredQuestion + 1,
      }))
    }
    this.setState({selectedOptions: optionId, isSelected: true})
  }

  moveToNextQuestion = () => {
    const {isSelected, assQuestions, answeredQuestions} = this.state
    if (isSelected) {
      this.setState(prevState => ({
        answeredQuestions: prevState.answeredQuestions + 1,
        isSelected: false,
      }))
    }
    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      selectedOptions: null,
    }))
  }

  handleQuestionClick = id => {
    const {assQuestions} = this.state
    const selectedQuestionData = assQuestions.findIndex(
      question => question.id === id,
    )
    console.log(selectedQuestionData)
    this.setState({selectedQuestionIndex: selectedQuestionData})
  }

  render() {
    const {
      assQuestions,
      currentQuestionIndex,
      selectedOptions,
      timer,
      answeredQuestions,
      unansweredQuestions,
      score,
      isSelected,
      selectedQuestionIndex,
    } = this.state
    console.log(isSelected)
    const currentQuestion = assQuestions[currentQuestionIndex]

    return (
      <>
        <Header />
        <div className="assessment-container">
          <div className="question-container">
            {currentQuestion && (
              <div>
                {currentQuestion.optionsType === 'DEFAULT' && (
                  <DefaultQuestion
                    question={
                      selectedQuestionIndex !== null
                        ? assQuestions[selectedQuestionIndex]
                        : currentQuestion
                    }
                    selectedOption={selectedOptions}
                    handleOptionSelect={this.handleOptionSelect}
                    moveToNextQuestion={this.moveToNextQuestion}
                    questionNumber={
                      selectedQuestionIndex !== null
                        ? selectedQuestionIndex
                        : currentQuestionIndex
                    }
                  />
                )}
                {currentQuestion.optionsType === 'IMAGE' && (
                  <ImageQuestion
                    question={selectedQuestionIndex !== null && currentQuestion}
                    selectedOption={selectedOptions}
                    handleOptionSelect={this.handleOptionSelect}
                    moveToNextQuestion={this.moveToNextQuestion}
                    questionNumber={
                      selectedQuestionIndex !== null
                        ? selectedQuestionIndex
                        : currentQuestionIndex
                    }
                  />
                )}
                {currentQuestion.optionsType === 'SINGLE_SELECT' && (
                  <SingleSelectQuestion
                    question={currentQuestion}
                    selectedOption={selectedOptions}
                    handleOptionSelect={this.handleOptionSelect}
                    moveToNextQuestion={this.moveToNextQuestion}
                  />
                )}
              </div>
            )}
          </div>
          <div className="summary-card">
            <AssessmentSummary
              totalQuestions={assQuestions.length}
              answeredQuestions={answeredQuestions}
              unansweredQuestions={unansweredQuestions}
              currentQuestionNo={currentQuestionIndex}
              questions={assQuestions}
              timeLeft={timer}
              onSubmit={this.onSubmit}
              onQuestionClick={this.handleQuestionClick}
              selectedQuestionIndex={selectedQuestionIndex}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Assessment
