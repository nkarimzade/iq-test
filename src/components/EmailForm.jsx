import { useState } from 'react'
import './EmailForm.css'

function EmailForm({ score, totalQuestions, onEmailSent }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // E-posta gönderme API'si
      const response = await fetch('http://localhost:3001/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          score,
          totalQuestions,
          testId: Date.now() // Benzersiz test ID'si
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setSuccess(true)
      onEmailSent && onEmailSent()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="email-form-container">
      <div className="email-form">
        <h3>Test Sonuçlarınızı E-posta ile Alın</h3>
        <p>Detaylı sonuç raporunuzu e-posta adresinize gönderelim</p>
        
        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                className="email-input"
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Gönderiliyor...' : 'Sonuçları Gönder'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p>Sonuçlarınız başarıyla gönderildi!</p>
            <p>E-posta adresinizi kontrol edin.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailForm 