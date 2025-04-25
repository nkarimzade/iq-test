import { useState, useEffect } from 'react'
import './IQTest.css'
import TestResult from './TestResult'

function IQTest() {
  const [timeLeft, setTimeLeft] = useState(5)
  const [testStarted, setTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const questions = [
    {
      question: "2, 4, 8, 16, ?",
      options: ["24", "32", "30", "28"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 1, 2, 3, 5, 8, ?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 3
    },
    {
      question: "Aşağıdaki şekillerden hangisi farklıdır?",
      options: ["Kare", "Daire", "Üçgen", "Dikdörtgen"],
      correctAnswer: 1
    },
    {
      question: "3, 6, 9, 12, ?",
      options: ["14", "15", "16", "17"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki sayıyı bulun: 2, 5, 10, 17, ?",
      options: ["24", "26", "28", "30"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: B, D, F, H, ?",
      options: ["I", "J", "K", "L"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 4, 9, 16, ?",
      options: ["20", "25", "30", "35"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: C, F, I, L, ?",
      options: ["M", "N", "O", "P"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 3, 6, 10, ?",
      options: ["12", "14", "15", "16"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki harfi bulun: D, G, J, M, ?",
      options: ["N", "O", "P", "Q"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 2, 4, 8, ?",
      options: ["12", "14", "16", "18"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki harfi bulun: E, H, K, N, ?",
      options: ["O", "P", "Q", "R"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 5, 13, 25, ?",
      options: ["35", "41", "45", "50"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: F, I, L, O, ?",
      options: ["P", "Q", "R", "S"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 8, 27, 64, ?",
      options: ["100", "125", "150", "175"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: G, J, M, P, ?",
      options: ["Q", "R", "S", "T"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 2, 6, 24, ?",
      options: ["48", "96", "120", "144"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki harfi bulun: H, K, N, Q, ?",
      options: ["R", "S", "T", "U"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 3, 7, 15, ?",
      options: ["23", "27", "31", "35"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki harfi bulun: I, L, O, R, ?",
      options: ["S", "T", "U", "V"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 4, 9, 16, 25, ?",
      options: ["30", "36", "42", "49"],
      correctAnswer: 1
    },
    {
      question: "Bir sonraki harfi bulun: J, M, P, S, ?",
      options: ["T", "U", "V", "W"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki sayıyı bulun: 1, 2, 3, 5, 8, ?",
      options: ["10", "12", "13", "15"],
      correctAnswer: 2
    },
    {
      question: "Bir sonraki harfi bulun: K, N, Q, T, ?",
      options: ["U", "V", "W", "X"],
      correctAnswer: 2
    }
  ]

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setTestStarted(true)
    }
  }, [timeLeft])

  useEffect(() => {
    if (testStarted && questionTimeLeft > 0) {
      const timer = setTimeout(() => setQuestionTimeLeft(questionTimeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (questionTimeLeft === 0) {
      handleNextQuestion()
    }
  }, [questionTimeLeft, testStarted])

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    handleNextQuestion()
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setQuestionTimeLeft(30)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    return <TestResult score={score} totalQuestions={questions.length} />
  }

  if (!testStarted) {
    return (
      <div className="test-container">
        <h1>IQ Testi</h1>
        <p>Test başlamak üzere...</p>
        <p className="countdown">{timeLeft}</p>
      </div>
    )
  }

  return (
    <div className="test-container">
      <div className="question-container">
        <div className="question-header">
          <h2>Soru {currentQuestion + 1}/{questions.length}</h2>
          <p className="timer">Kalan Süre: {questionTimeLeft} saniye</p>
        </div>
        
        <h3>{questions[currentQuestion].question}</h3>
        
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IQTest 