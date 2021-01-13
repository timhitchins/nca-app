import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as styleVars from "../../theme.scss";
import "./About.scss";

const Methodology = () => {
  return (
    <div>
      <p>
        Each construction site is given a ranking of low, medium, or high
        corresponding to the level of potential diesel emissions expected at a
        given site. This rating is given based on permit characteristics, such
        as square footage and stories for the project. Research has shown that
        larger construction projects and projects with a demolition component
        have higher emissions on average.
      </p>
      <p>
        These projects also tend to have a longer timeline of the earthworks
        phase, which results in more activity hours and more emissions. The
        earthworks stage of the project, meaning working with the soil, is the
        most emission intensive because of the heavy-duty equipment being used
        and the weight of materials being carried. Due to data limitations of
        the permits and variability of equipment used on a site, actual
        emissions associated for each site is difficult to predict.
      </p>

      <p>
        To learn about current efforts to create cleaner construction in
        Portland, <Link to="/join-us">Join us</Link>.
      </p>
    </div>
  );
};

const Formula = () => {
  return (
    <div>
      <p>
        In partnership with{" "}
        <a
          href="https://star.research.pdx.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portland State University
        </a>
        , the following algorithm was developed to characterize construction
        sites into low, medium, and high{" "}
        <strong> Potential Diesel Impact (PDI)</strong> using the data available
        from the City of Portland's publicly available permit data.
      </p>

      <pre>
        <strong>
          PDI = [sq. footage] + [stories] + [demolition included/not] + [status]
        </strong>
      </pre>

      <p>
        This algorithm only applies to new construction of commercial or
        residential permits.
      </p>
    </div>
  );
};

class About extends Component {
  state = {
    activeMenu: "Methodology",
  };

  _toggleMenu = (activeMenu) => {
    if (activeMenu !== "|") {
      this.setState({ activeMenu });
    }
  };

  render() {
    const { activeMenu } = this.state;
    const menus = ["Methodology", "|", "Algorithm"];
    return (
      <div className="about-container">
        <div className="about-select">
          {menus.map((item) => (
            <div
              key={item}
              style={{
                borderBottom:
                  activeMenu === item ? "3px solid " + styleVars.uiBlack : null,
              }}
              onClick={() => {
                this._toggleMenu(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
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
        {activeMenu === "Methodology" ? <Methodology /> : <Formula />}
      </div>
    );
  }
}

export default About;
