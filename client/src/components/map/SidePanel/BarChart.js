import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryLabel,
  VictoryAxis,
} from "victory";
import * as styleVars from "../../theme.scss";

class BarChart extends Component {
  static propTypes = {
    mapData: PropTypes.object.isRequired,
    panelIsOpen: PropTypes.bool.isRequired,
  };
  render() {
    const { attributeTotals } = this.props.mapData;
    if (attributeTotals) {
      const { chartData } = attributeTotals;
      return (
        <VictoryChart domainPadding={{ x: 15 }}>
          <VictoryAxis dependentAxis={true} />
          <VictoryBar
            style={{
              data: {
                fill: styleVars.uiWhite,
                stroke: styleVars.uiBlack,
                strokeWidth: 2,
              },
            }}
            height={200}
            data={chartData}
            barRatio={1}
            labels={({ datum }) =>
              `${datum.count} ${datum.permit_type} permits`
            }
            x="permit_type"
            y="count"
            animate={{
              onExit: {
                duration: 300,
              },
            }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          console.log(props.datum);
                          // add handler here
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            labelComponent={
              <VictoryTooltip
                cornerRadius={0.8}
                flyoutPadding={({ text }) =>
                  text.length > 1
                    ? { top: 10, bottom: 10, left: 10, right: 10 }
                    : 10
                }
                flyoutStyle={{
                  stroke: styleVars.black,
                  strokeWidth: 2,
                  fill: styleVars.uiwhite,
                }}
              />
            }
          />
        </VictoryChart>
      );
    }
    return null;
  }
}

export default BarChart;
