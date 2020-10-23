import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import ChartistGraph from "react-chartist";
import {
  chart2,
  chart2Data,
  chart9Data,
  chart11Data,
  chart7Data,
  chart7Options,
  chart2Option,
  chart3Data,
  chart3Options,
  chart6Data,
  chart6Options,
  chart4Data,
  chart4Options,
  chart5Data,
  chart5Options,
  chart10Data,
  chart10Options,
  chart11Options,
  chart12Data,
  chart12Options,
} from "./chartistData";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
const Chartistchart = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Charts" title="Chartist Chart" />
      <Container fluid={true}>
        <Row>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Advanced SMIL Animations</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  key="1"
                  className="ct-6 flot-chart-container"
                  data={{
                    labels: [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                    ],
                    series: [
                      [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
                      [4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
                      [5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
                      [3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3],
                    ],
                  }}
                  type={"Line"}
                  listener={{
                    draw: function (data) {
                      if (data.type === "line" || data.type === "area") {
                        data.element.animate({
                          d: {
                            begin: 2000 * data.index,
                            dur: 2000,
                            from: data.path
                              .clone()
                              .scale(1, 0)
                              .translate(0, data.chartRect.height())
                              .stringify(),
                            to: data.path.clone().stringify(),
                          },
                        });
                      }
                    },
                  }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>SVG Path animation</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  key="1"
                  className="ct-7 flot-chart-container"
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    series: [
                      [1, 5, 2, 5, 4, 3],
                      [2, 3, 4, 8, 1, 2],
                      [5, 4, 3, 2, 1, 0.5],
                    ],
                  }}
                  type={"Line"}
                  listener={{
                    draw: function (data) {
                      if (data.type === "line" || data.type === "area") {
                        data.element.animate({
                          d: {
                            begin: 2000 * data.index,
                            dur: 2000,
                            from: data.path
                              .clone()
                              .scale(1, 0)
                              .translate(0, data.chartRect.height())
                              .stringify(),
                            to: data.path.clone().stringify(),
                          },
                        });
                      }
                    },
                  }}
                  options={chart2}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Animating a Donut with Svg.animate</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart2Data}
                  options={chart2Option}
                  type={"Pie"}
                  listener={{
                    draw: function (data) {
                      if (data.type === "slice") {
                        var pathLength = data.element._node.getTotalLength();
                        data.element.attr({
                          "stroke-dasharray":
                            pathLength + "px " + pathLength + "px",
                        });
                        var animationDefinition = {
                          "stroke-dashoffset": {
                            id: "anim" + data.index,
                            dur: 1000,
                            from: -pathLength + "px",
                            to: "0px",
                            fill: "freeze",
                          },
                        };
                        if (data.index !== 0) {
                          animationDefinition["stroke-dashoffset"].begin =
                            "anim" + (data.index - 1) + ".end";
                        }
                        data.element.attr({
                          "stroke-dashoffset": -pathLength + "px",
                        });
                        data.element.animate(animationDefinition, false);
                      }
                    },
                  }}
                  className="fct-8 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Bi-polar Line chart with area only</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart3Data}
                  options={chart3Options}
                  type={"Line"}
                  className="ct-5 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Line chart with area</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart4Data}
                  options={chart4Options}
                  type={"Line"}
                  className="ct-4 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Bi-polar bar chart</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart5Data}
                  options={chart5Options}
                  type={"Bar"}
                  className="ct-9 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Stacked bar chart</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart6Data}
                  options={chart6Options}
                  type={"Bar"}
                  className="ct-10 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Horizontal bar chart</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart7Data}
                  options={chart7Options}
                  type={"Bar"}
                  className="ct-11 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Extreme responsive configuration</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart9Data.data}
                  options={chart9Data.options}
                  responsiveOptions={chart9Data.responsiveOptions}
                  type={"Bar"}
                  className="ct-12 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Simple line chart</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart10Data}
                  options={chart10Options}
                  type={"Line"}
                  className="ct-1 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Holes in data</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart11Data}
                  options={chart11Options}
                  type={"Line"}
                  className="ct-2 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12" sm="12">
            <Card>
              <CardHeader>
                <h5>Filled holes in data</h5>
              </CardHeader>
              <CardBody>
                <ChartistGraph
                  data={chart12Data}
                  options={chart12Options}
                  type={"Line"}
                  className="ct-3 flot-chart-container"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chartistchart;
