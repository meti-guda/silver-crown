import React from "react";

const ContactDetails = () => {
  return (
    <div className="contact-details-grid">
      <div className="contact-details">
        <h2>Location</h2>
        <p>
          Piassa, near Adwa Museum<br />
          Addis Ababa, Ethiopia
        </p>

        <h2>Hours</h2>
        <p>
          Monday – Friday: 7:00 AM – 9:00 PM<br />
          Saturday – Sunday: 8:00 AM – 10:00 PM
        </p>

        <h2>Contact</h2>
        <p>
          Phone:{" "}
          <a href="tel:+251900000000">+251 900 000 000</a>
          <br />
          Email:{" "}
          <a href="mailto:hello@silvercrown.cafe">hello@silvercrown.cafe</a>
        </p>
      </div>

      <div className="contact-map">
        <h2>Getting Here</h2>
        <p>
          We are a few minutes on foot from the main Adwa Museum entrance.
          Taxis and Ride cars can drop you at the museum gate; from there,
          follow the signs toward Piassa.
        </p>
        <p>Parking is available on nearby side streets or in the museum.</p>
        <p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Adwa+Museum,+Piassa,+Addis+Ababa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactDetails;
