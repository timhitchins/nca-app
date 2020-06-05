import React, { Component } from "react";
import "./SidePanel.scss";

class SidePanel extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <div>NCA Construction Diesel Toolkit</div> */}
        <article className="side-panel-container">
          <div>
            <aside className="panel-label">Construction Permits by Type</aside>
            <aside className="panel-label">Search by location</aside>
          </div>
          <div>
            <aside className="panel-label">Construction Site Information</aside>
          </div>
          <div>
            <aside className="panel-label">About</aside>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

export default SidePanel;
