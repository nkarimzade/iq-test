import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import './TestResult.css'
import EmailForm from './EmailForm'

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY') // Stripe'dan alacağınız public key

function TestResult({ score, totalQuestions }) {
  const [showPayment, setShowPayment] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const correctAnswers = score
  const wrongAnswers = totalQuestions - score

  const handlePayment = async (paymentMethod) => {
    try {
      setLoading(true)
      
      // Backend'e ödeme isteği gönder
      const response = await fetch('http://localhost:3001/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000, // 10.00 TL
          currency: 'try',
          paymentMethod: paymentMethod
        }),
      })

      const { clientSecret } = await response.json()

      // Stripe ödeme formunu göster
      const stripe = await stripePromise
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/success',
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      setShowEmailForm(true)
    } catch (error) {
      console.error('Ödeme hatası:', error)
      alert('Ödeme işlemi başarısız oldu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    // Burada email gönderme işlemi yapılacak
    setEmailSent(true)
    setShowResults(true)
  }

  return (
    <div className="result-container">
      <h1>Test Sonucu</h1>
      
      {!showResults ? (
        <>
          <div className="result-stats">
            <div className="stat-box">
              <h3>Doğru</h3>
              <p>X</p>
            </div>
            <div className="stat-box">
              <h3>Yanlış</h3>
              <p>X</p>
            </div>
          </div>

          {!showPayment ? (
            <button className="payment-button" onClick={() => setShowPayment(true)}>
              Sonuçları Gör
            </button>
          ) : (
            <div className="payment-section">
              <h2>Sonuçları Görmek İçin Ödeme Yapın</h2>
              <p>Detaylı sonuçları görmek için ödeme yapmanız gerekmektedir.</p>
              <div className="payment-options">
                <button 
                  className="payment-option" 
                  onClick={() => handlePayment('card')}
                  disabled={loading}
                >
                  {loading ? 'İşleniyor...' : 'Kredi Kartı ile Öde'}
                </button>
                <button 
                  className="payment-option" 
                  onClick={() => handlePayment('bank_transfer')}
                  disabled={loading}
                >
                  {loading ? 'İşleniyor...' : 'Havale/EFT ile Öde'}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="result-stats">
            <div className="stat-box correct">
              <h3>Doğru</h3>
              <p>{correctAnswers}</p>
            </div>
            <div className="stat-box wrong">
              <h3>Yanlış</h3>
              <p>{wrongAnswers}</p>
            </div>
          </div>

          {!emailSent ? (
            <EmailForm 
              score={score}
              totalQuestions={totalQuestions}
              onEmailSent={() => setEmailSent(true)}
            />
          ) : (
            <div className="email-success">
              <p>Sonuçlarınız e-posta adresinize gönderildi!</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TestResult 