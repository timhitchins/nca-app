import React, { Component } from "react";
import { VictoryPie } from "victory-pie";
import PropTypes from "prop-types";

class PieChart extends Component {
  render() {
    return (
      <VictoryPie
        data={[
          { x: "Cats", y: 35 },
          { x: "Dogs", y: 40 },
          { x: "Birds", y: 55 },
        ]}
        startAngle={90}
        endAngle={-90}
      />
    );
  }
}

export default PieChart;
