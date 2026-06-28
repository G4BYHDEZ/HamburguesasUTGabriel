import React from "react";
import Navbar from "../components/Navbar";
import FooterBar from "../components/FooterBar";

function Home() {
  return (
    <div className="home-wrapper">
      <div className="hero-bg-wrapper">
        <Navbar />
        <section className="home-card">
          <img
            src="src/HamburguesasUT.png"
            alt="HamburguesasUT Logo"
            className="home-logo"
          />
          <h1 className="home-title">Bienvenido a HamburguesasUT</h1>
          <p className="home-message">
            El sabor que te acompaña siempre 🍔
          </p>
        </section>
      </div>
      <FooterBar />
    </div>
  );
}

export default Home;
