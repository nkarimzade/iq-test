import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './PaymentForm.css'

const stripePromise = loadStripe('pk_test_your_stripe_public_key')

function PaymentForm({ onPaymentSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    // Payment Intent oluştur
    fetch('http://localhost:3001/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const stripe = await stripePromise
    const elements = useElements()

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/payment-success',
      },
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    } else {
      onPaymentSuccess()
    }
  }

  return (
    <div className="payment-container">
      <div className="payment-form">
        <h3>Test Sonuçlarınızı Görüntüleyin</h3>
        <div className="price-info">
          <span className="price">$1.99</span>
          <span className="currency">USD</span>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="card-element">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>

          <button 
            type="submit"
            className="payment-button"
            disabled={loading || !clientSecret}
          >
            {loading ? 'İşleniyor...' : 'Ödeme Yap'}
          </button>
        </form>
      </div>
    </div>
  )
}

// Stripe Elements wrapper
export default function PaymentFormWrapper({ onPaymentSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  )
} 