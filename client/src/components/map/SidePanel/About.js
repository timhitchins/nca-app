import React, { Component } from "react";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <div>
          <img
            src="https://nca-toolkit.s3-us-west-2.amazonaws.com/crane_hook.png"
            alt="An illustration of a crane with a hook"
          ></img>
          <img
            src="https://nca-toolkit.s3-us-west-2.amazonaws.com/tractor.png"
            alt="An illustration of a tractor"
          ></img>
          <img
            src="https://nca-toolkit.s3-us-west-2.amazonaws.com/mixer_truck.png"
            alt="An illustration of a mixer truck"
          ></img>
        </div>
        <div>
          <p>
            Each construction site is given a ranking of low, medium, or high
            corresponding to the level of potential diesel emissions expected at
            a given site. This rating is given based on permit characteristics,
            such as square footage and stories for the project. Research has
            shown that larger construction projects and projects with a
            demolition component have higher emissions on average.
          </p>
          <p>
            These projects also tend to have a longer timeline of the earthworks
            phase, which results in more activity hours and more emissions. The
            earthworks stage of the project, meaning working with the soil, is
            the most emission intensive because of the heavy-duty equipment
            being used and the weight of materials being carried. Due to data
            limitations of the permits and variability of equipment used on a
            site, actual emissions associated for each site is difficult to
            predict.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
