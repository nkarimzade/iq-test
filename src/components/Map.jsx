import React from 'react'
import './Map.css'

function Map() {
  return (
    <div className="map-container">
      <h3>Bize Ulaşın</h3>
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.963369833931!2d28.994858315414!3d41.037002979298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSxLCBHw7xtw7zFn3N1eXUsIDM0NDM1IEJleW_En2x1L8Swc3RhbmJ1bA!5e0!3m2!1str!2str!4v1645000000000!5m2!1str!2str"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="map-info">
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <p>Örnek Mahallesi, Test Caddesi No: 45, Kat: 3, Kadıköy/İstanbul</p>
        </div>
        <div className="info-item">
          <i className="fas fa-phone"></i>
          <p>+90 212 345 67 89</p>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <p>info@iqtests.com</p>
        </div>
      </div>
    </div>
  )
}

export default Map 