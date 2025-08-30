import React from "react";
import "./About.css";

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">Get to know me better</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <div className="about-intro">
              <h3>Hello! I'm Tihomir</h3>
              <p>
                I'm a passionate Frontend Developer with over 4 years of experience creating engaging and user-friendly web applications. I love turning complex problems into
                simple, beautiful, and intuitive solutions.
              </p>
            </div>

            <div className="about-details">
              <p>
                My journey in web development started in 2019, and since then I've had the privilege of working with various companies, from startups to established tech firms. I
                specialize in React, TypeScript, and modern CSS, always staying up-to-date with the latest industry trends and best practices.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and mentoring
                fellow developers.
              </p>
            </div>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-number">50+</div>
                <div className="highlight-text">Projects Completed</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">4+</div>
                <div className="highlight-text">Years Experience</div>
              </div>
              <div className="highlight-item">
                <div className="highlight-number">10+</div>
                <div className="highlight-text">Technologies Mastered</div>
              </div>
            </div>

            <div className="about-cta">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Download Resume
              </a>
            </div>
          </div>

          <div className="about-image">
            <div className="about-photo">
              <img
                src="/placeholder-about.jpg"
                alt="Tihomir working on a project"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = '<div class="photo-placeholder">👨‍💻</div>';
                }}
              />
            </div>

            <div className="about-tech-stack">
              <h4>Current Tech Stack</h4>
              <div className="tech-icons">
                <span className="tech-item">React</span>
                <span className="tech-item">TypeScript</span>
                <span className="tech-item">Next.js</span>
                <span className="tech-item">Vite</span>
                <span className="tech-item">Sass</span>
                <span className="tech-item">Git</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
