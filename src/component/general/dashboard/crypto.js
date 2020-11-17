import React, { Fragment, useState } from "react";
import Papa from "papaparse";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  bitcoinapexcharts1,
  bitcoinapexcharts2,
  bitcoinapexcharts3,
  candlesticapexcharts,
} from "./charts/apexchartsData";
import Apexchart from "react-apexcharts";
import {
  Container,
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Table,
} from "reactstrap";
import ChartistGraph from "react-chartist";
import {
  chartistcrypto1data,
  chartistcrypto1option,
} from "./charts/chartistchartsData";
import Slider from "react-slick";
const Crypto = (props) => {
  // eslint-disable-next-line
  const [settings, setSettings] = useState({});
  const[ csvfile,set_csvfile]=useState(undefined);
  const handleChange = (event) => {
    set_csvfile(event.target.files[0]);
   };
   const importCSV = () => {
    // const { csvfile } = this.state;
    var file = document.getElementById('csvfiletxt').files[0];
    console.log(csvfile);
     Papa.parse(file, {
       header: false,
        complete: function (results) {
       updateData(results)
     }
 
     });
   };
   const updateData=(result)=> {
     var data = result.data;
     console.log(data);
     
     console.log(data[0]);
     let i=0;
     for(i=0;i<data[0].length;i++)
     {
       console.log(data[0][i]);
     }
   }
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Scanner" />
      <Container fluid={true}>
        <Row>
          <Col xl="4 box-col-6" lg="12" md="6">
          <h2>Import CSV File!</h2>
        <input id="csvfiletxt"
          className="csv-input"
          type="file"
          name="file"
          placeholder={null}
          onChange={(e)=>handleChange(e)}
        />     
        <button onClick={importCSV}> Upload now!</button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Crypto;
