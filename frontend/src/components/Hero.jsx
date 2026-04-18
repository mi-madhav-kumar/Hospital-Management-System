import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
           Mediant-X is a state-of-the-art, high-tech hospital dedicated to delivering comprehensive healthcare services with advanced technology, compassion, and expertise. Our team of skilled professionals provides personalized care tailored to each patient’s needs, ensuring accurate diagnosis and effective treatment. At Mediant-X, we prioritize your well-being, offering a seamless and modern healthcare experience for a smooth journey toward optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;