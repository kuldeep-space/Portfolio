import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" style={{ textAlign: "center" }}>
      <h1>CONTACT ME </h1>
      <div
        className="visme_d"
        data-title="CONTACT ME"
        data-url="meq773gj-contact-me"
        data-domain="forms"
        data-full-page="false"
        data-min-height="500px"
        data-form-id="141012"
      ></div>
    </section>
  );
};

export default Contact;
