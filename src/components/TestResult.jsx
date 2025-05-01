import { useState } from 'react'
import PaymentForm from './PaymentForm'
import EmailForm from './EmailForm'
import './TestResult.css'

function TestResult({ score, totalQuestions }) {
  const [showResults, setShowResults] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  return (
    <div className="result-container">
      {!showResults ? (
        <PaymentForm onPaymentSuccess={() => setShowResults(true)} />
      ) : !emailSent ? (
        <EmailForm 
          score={score}
          totalQuestions={totalQuestions}
          onEmailSent={() => setEmailSent(true)}
        />
      ) : (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <p>Sonuçlarınız e-posta adresinize gönderildi!</p>
        </div>
      )}
    </div>
  )
}

export default TestResult 