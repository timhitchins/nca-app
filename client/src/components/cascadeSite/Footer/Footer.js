import React from "react";
import "./Footer.scss";

function Footer({ className }) {
  return (
    <div className={className}>
      <footer>
        <div> &copy; 2020 | NEIGHBORS FOR CLEAN AIR</div>
        <div></div>
        <div>A project by</div>
        <div className="nca-logo">
          <a
            href="https://neighborsforcleanair.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/NCA_logo_only_WHITE.png"
              alt="NCA logo"
            ></img>
          </a>
        </div>
        <div>in partnership with</div>
        <div>
          <a
            href="https://mappingaction.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/MAC_Logo_horizontal-02.png"
              alt="MAC logo"
            ></img>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
