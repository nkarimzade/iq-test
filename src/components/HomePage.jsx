import { useState, useEffect } from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import NewsletterForm from './NewsletterForm'
import Map from './Map'

function HomePage() {
  const navigate = useNavigate()
  const [showInfoBoxes, setShowInfoBoxes] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      title: "Profesyonel Test",
      description: "Bilimsel olarak hazırlanmış IQ testleri",
      icon: "🧠"
    },
    {
      title: "Anında Sonuç",
      description: "Test sonunda hemen sonuçlarınızı görün",
      icon: "⚡"
    },
    {
      title: "Detaylı Rapor",
      description: "Kişiselleştirilmiş detaylı analiz raporu",
      icon: "📊"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setShowInfoBoxes(true)
      }
    }

    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(featureInterval)
    }
  }, [])

  const startTest = () => {
    navigate('/iq-test')
  }

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="text-content">
          <h1>IQ Testine Hoş Geldiniz</h1>
          <p>Zekanızı ölçmek için hazır mısınız?</p>
          <div className="feature-slider">
            <div className="feature-content">
              <span className="feature-icon">{features[currentFeature].icon}</span>
              <h3>{features[currentFeature].title}</h3>
              <p>{features[currentFeature].description}</p>
            </div>
          </div>
          <button className="start-button" onClick={startTest}>
            IQ Testine Başla
          </button>
        </div>
        <div className="image-content">
          <img src="/brain.png" alt="Beyin" />
        </div>
      </div>

      <div className={`info-boxes ${showInfoBoxes ? 'visible' : ''}`}>
        <div className="info-box">
          <h3>Hakkımızda</h3>
          <p>Profesyonel IQ testi platformu olarak, güvenilir ve bilimsel testler sunuyoruz.</p>
        </div>
        <div className="info-box">
          <h3>Ödeme Yöntemleri</h3>
          <ul>
            <li>Kredi Kartı</li>
            <li>Havale/EFT</li>
            <li>Banka Kartı</li>
          </ul>
        </div>
        <div className="info-box">
          <h3>İletişim</h3>
          <p>info@iqtests.com</p>
          <p>+90 555 123 4567</p>
        </div>
      </div>

      <NewsletterForm />
      <Map />
      <Footer />
    </div>
  )
}

export default HomePage 