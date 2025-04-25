import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Adres</h3>
          <p>Örnek Mahallesi, Test Caddesi</p>
          <p>No: 45, Kat: 3</p>
          <p>Kadıköy/İstanbul</p>
        </div>

        <div className="footer-section">
          <h3>İletişim</h3>
          <p>Email: info@iqtests.com</p>
          <p>Telefon: +90 212 345 67 89</p>
          <p>WhatsApp: +90 532 123 45 67</p>
        </div>

        <div className="footer-section">
          <h3>Sosyal Medya</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Hızlı Linkler</h3>
          <ul>
            <li><a href="/">Ana Sayfa</a></li>
            <li><a href="/iq-test">IQ Testi</a></li>
            <li><a href="/hakkimizda">Hakkımızda</a></li>
            <li><a href="/iletisim">İletişim</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 IQ Tests. Tüm hakları saklıdır.</p>
        <div className="footer-links">
          <a href="/gizlilik">Gizlilik Politikası</a>
          <a href="/kullanim">Kullanım Şartları</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer 