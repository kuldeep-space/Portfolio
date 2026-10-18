import React, { useState } from 'react';
import './Contact.css';
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiCheck,
  FiArrowUpRight,
  FiSend
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', contactInfo: '', message: '' });
  const [activeChannel, setActiveChannel] = useState('whatsapp'); // 'whatsapp', 'email'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const emailAddress = 'KuldeepJangid2008@gmail.com';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
    if (successMsg) setSuccessMsg('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDispatch = (channel) => {
    const { name, contactInfo, message } = formData;

    if (!name.trim() || !message.trim()) {
      setErrorMsg('Please specify your name and message details.');
      return;
    }

    const payloadText = `Hi Kuldeep,\n\nFrom: ${name}\nContact: ${contactInfo || 'Not specified'}\n\nMessage:\n${message}`;

    if (channel === 'whatsapp') {
      const waUrl = `https://wa.me/919166292611?text=${encodeURIComponent(payloadText)}`;
      window.open(waUrl, '_blank');
      setSuccessMsg("Opening WhatsApp chat directly with Kuldeep!");
    } else if (channel === 'email') {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        emailAddress
      )}&su=${encodeURIComponent(`Engineering Inquiry from ${name}`)}&body=${encodeURIComponent(
        payloadText
      )}`;
      window.open(gmailUrl, '_blank');
      setSuccessMsg("Opening Gmail composer with pre-filled details!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDispatch(activeChannel);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="contact-section-header">
          <div className="contact-kicker-row">
            <span className="contact-kicker-num">04</span>
            <span className="contact-kicker-slash">/</span>
            <span className="contact-kicker-tag">DIRECT COMMUNICATION</span>
          </div>
          <h2 className="contact-section-title">
            LET&apos;S CONNECT.
            <br />
            START A CONVERSATION.
          </h2>
          <p className="contact-section-lead">
            Available for software engineering internships, junior developer roles, and computer vision collaborations. Messages reach my direct WhatsApp or email inbox immediately.
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Endpoints */}
          <div className="contact-endpoints-col">
            <span className="endpoints-kicker">DIRECT CHANNELS</span>

            <div className="endpoints-list">
              <a
                href="https://wa.me/919166292611?text=Hi%20Kuldeep,%20I%20am%20contacting%20you%20regarding%20an%20engineering%20opportunity."
                target="_blank"
                rel="noreferrer"
                className="endpoint-item"
              >
                <div className="endpoint-left">
                  <FaWhatsapp className="endpoint-icon" aria-hidden="true" />
                  <span className="endpoint-name">WHATSAPP / +91-9166292611</span>
                </div>
                <span className="endpoint-action">
                  <span>MESSAGE</span>
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </a>

              <div className="endpoint-item">
                <div className="endpoint-left">
                  <FiMail className="endpoint-icon" aria-hidden="true" />
                  <span className="endpoint-name">{emailAddress}</span>
                </div>
                <div className="endpoint-actions-sub">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="sub-action-link"
                  >
                    MAILTO
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="sub-action-link"
                  >
                    {copiedEmail ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>

              <a
                href="https://github.com/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                className="endpoint-item"
              >
                <div className="endpoint-left">
                  <FiGithub className="endpoint-icon" aria-hidden="true" />
                  <span className="endpoint-name">GITHUB / KULDEEP-SPACE</span>
                </div>
                <span className="endpoint-action">
                  <span>VIEW</span>
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </a>

              <a
                href="https://www.linkedin.com/in/kuldeep-space"
                target="_blank"
                rel="noreferrer"
                className="endpoint-item"
              >
                <div className="endpoint-left">
                  <FiLinkedin className="endpoint-icon" aria-hidden="true" />
                  <span className="endpoint-name">LINKEDIN / KULDEEP-SPACE</span>
                </div>
                <span className="endpoint-action">
                  <span>CONNECT</span>
                  <FiArrowUpRight aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="contact-form-col">
            <span className="endpoints-kicker">SEND A DIRECT MESSAGE</span>

            {/* Target Channel Selector */}
            <div className="channel-toggles">
              <button
                type="button"
                className={`channel-toggle-btn ${activeChannel === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setActiveChannel('whatsapp')}
              >
                <FaWhatsapp aria-hidden="true" />
                <span>SEND VIA WHATSAPP</span>
              </button>

              <button
                type="button"
                className={`channel-toggle-btn ${activeChannel === 'email' ? 'active' : ''}`}
                onClick={() => setActiveChannel('email')}
              >
                <FiMail aria-hidden="true" />
                <span>SEND VIA EMAIL</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="contact-dispatch-form" noValidate>
              {errorMsg && (
                <div className="contact-alert error" role="alert">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="contact-alert success" role="status">
                  <FiCheck aria-hidden="true" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-info" className="contact-label">
                  YOUR EMAIL OR PHONE
                </label>
                <input
                  id="contact-info"
                  type="text"
                  name="contactInfo"
                  placeholder="e.g. alex@company.com"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-msg" className="contact-label">
                  YOUR MESSAGE
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={5}
                  placeholder="Outline your opportunity, collaboration, or question..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-textarea"
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                <span>SEND MESSAGE VIA {activeChannel.toUpperCase()}</span>
                <FiSend aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;