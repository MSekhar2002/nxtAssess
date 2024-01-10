const Questions = ({props}) => {
  const {question} = props
  const {questionText, options} = question

  return (
    <div>
      <h2>{questionText}</h2>
      <ul>
        {options.map(eachOption => (
          <li key={eachOption.optionId}>{eachOption.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Questions
