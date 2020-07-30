import React, { Component } from "react";
import Footer from "../Footer/Footer";
import "./TakeAction.scss";

class TakeAction extends Component {
  render() {
    return (
      <div className="take-action-container">
        <section className="take-action-section">
          <h1>Join Neighbors for Clean Air</h1>
          <p>
            Neighbors for Clean Air educates, motivates and activates Oregonians
            to improve air quality in our region and state. We work to change
            policy, strengthen regulations, and push businesses subject to air
            quality regulation to reduce emissions. We engage members from every
            background in in this work to create a better future for us all.
          </p>

          <p>
            For the past 10 years, we’ve focused on the serious dangers that
            diesel presents to our health, our beloved communities and our
            planet.
          </p>

          <p>
            Right now, we have specific plans and goals that we know are
            achievable in reducing diesel – regulations, community engagements,
            and specific policy changes. With your help, they’re within our
            grasp. Will you join us?
          </p>
          <div className="take-action-button-container">
            <img
              src="https://nca-toolkit.s3-us-west-2.amazonaws.com/banner_heart_crop.png"
              alt="Illustration of a person holding a sign with a heart"
            />
            <a
              href="https://neighborsforcleanair.org/act-now/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>Get Involved!</div>
            </a>
          </div>
        </section>
        <Footer className="take-action-footer" />
      </div>
    );
  }
}

export default TakeAction;
