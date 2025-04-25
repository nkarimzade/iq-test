import { useState } from 'react'
import './NewsletterForm.css'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu')
      }

      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="newsletter-container">
      <div className="newsletter-form">
        <h3>Bültenimize Abone Olun</h3>
        <p>Yeni testler ve güncellemelerden haberdar olun</p>
        
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
              {loading ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </form>
        ) : (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            <p>Başarıyla abone oldunuz!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsletterForm 