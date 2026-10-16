import React, { useState } from "react";
import "./Contact.css";
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiMapPin, FiArrowRight, FiCheck } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=KuldeepJangid2008@gmail.com&su=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailtoLink, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact">
      <div className="contact-inner">

        {/* Header */}
        <div className="contact-header reveal">
          <h2>Contact</h2>
          <span className="contact-header-italic">me.</span>
        </div>

        <div className="contact-body">

          {/* LEFT - info block */}
          <div className="contact-info reveal">
            <p className="contact-intro">
              Looking for a Python &amp; AI/ML developer or want to collaborate?<br />
              <em>Let&apos;s build impactful solutions together.</em>
            </p>

            <div className="contact-links">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=KuldeepJangid2008@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <FiMail />
                <span>KuldeepJangid2008@gmail.com</span>
                <FiArrowRight className="contact-link-arrow" />
              </a>

              <a
                href="tel:+919166292611"
                className="contact-link"
              >
                <FiPhone />
                <span>+91-9166292611</span>
                <FiArrowRight className="contact-link-arrow" />
              </a>

              <a
                href="https://github.com/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <FiGithub />
                <span>github.com/kuldeep-space</span>
                <FiArrowRight className="contact-link-arrow" />
              </a>

              <a
                href="https://www.linkedin.com/in/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                className="contact-link"
              >
                <FiLinkedin />
                <span>linkedin.com/in/kuldeep-space</span>
                <FiArrowRight className="contact-link-arrow" />
              </a>

              <div className="contact-link contact-link-static">
                <FiMapPin />
                <span>Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* RIGHT - form */}
          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="cf-name">Your Name</label>
              <input
                id="cf-name"
                type="text"
                name="name"
                placeholder="Kuldeep Jangid"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="cf-email">Email Address</label>
              <input
                id="cf-email"
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                placeholder="Tell me about your project, opportunity or question..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary contact-submit">
              {submitted ? (
                <>
                  Opening Gmail <FiCheck />
                </>
              ) : (
                <>
                  Send Message <FiArrowRight />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;