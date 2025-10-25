import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://youtu.be/_nTpsv9PNqo?si=DlIkk6sAfkAvuOEG"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          ⓒ
        </a>{" "}
        Debunkify. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
