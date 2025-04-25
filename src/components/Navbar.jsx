import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Logo</div>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <a href="#home">Ana Sayfa</a>
        <a href="#about">Hakkımızda</a>
        <a href="#services">Hizmetler</a>
        <a href="#contact">İletişim</a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar 