import React from 'react';

const Landing = () => (
  <section className="landing">

        <img className="banner-img" src='assets/images/cassettes.jpeg' alt="turntable banner" />
      <div className="bannerContainer">
      <section className="selling-points">
        <div className="point" id="point1">
          <span className="icon ion-music-note"></span>
          <h2 className="point-title">Choose your music</h2>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="point" id="point2">
          <span className="icon ion-wifi"></span>
          <h2 className="point-title">Unlimited streaming, ad-free</h2>
          <p className="point-description">No arbitrary limits. No distractions.</p>
        </div>
        <div className="point" id="point3">
          <span className="icon ion-iphone"></span>
          <h2 className="point-title">Mobile enabled</h2>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </section>
      </div>
  </section>
);

export default Landing;
