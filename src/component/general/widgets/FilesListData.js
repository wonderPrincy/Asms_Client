import React, { Fragment, useState, useEffect } from "react";
import "../../../assets/css/style.css";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import DataTable from "react-data-table-component";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, UserPlus } from "react-feather";
import Clock from "react-clock";
import Calendar from "react-calendar";
const FilesListData = (props) => {
  const [amazonResponseUK, set_amazonResponseUK] = useState(null);
  const [getFiles, set_getFiles] = useState(null);
  const [data, setData] = useState(null);
  const[filedata,setfileData]=useState(null);

  useEffect(() => {
    try {
      var fileid = localStorage.getItem("selectedfilelistdata");
      console.log(fileid);
      var url = 'http://localhost:5000/getFilesData/' + fileid;
      fetch(url)
        .then((response1) => {
          if (response1.status >= 400) {
          }
          return response1.json();
        })
        .then((data1) => {
          console.log(data1);
          setData(data1);
          setfileData(data1);
        });
      //end here

    }
    catch (error) {
    }
  }, []);
  const columns = [
    {
      name: "ASIN",
      selector: "ASIN",
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: "title",
      sortable: true,
      center: true,
    },
    {
      name: "Group",
      selector: "ProductGroup",
      sortable: true,
      center: true,
    },
    {
      name: "BuyBox Price",
      selector: "buying_price",
      sortable: true,
      center: true,
    },
    {
      name: "Profit",
      selector: "Profit",
      sortable: true,
      center: true,
    },
    {
      name: "ROI",
      selector: "ROI",
      sortable: true,
      center: true,
    },
    {
      name: "Total Fee",
      selector: "Total_fee",
      sortable: true,
      center: true,
    },
    {
      name: "Referral Fee",
      selector: "ref_fees",
      sortable: true,
      center: true,
    },
    {
      name: "Fba Fee",
      selector: "fba_fees",
      sortable: true,
      center: true,
    },
    {
      name: "Shipping Price",
      selector: "shippingPrice",
      sortable: true,
      center: true,
    },
  ];
  const convertToCSV=(e)=>{
    e.preventDefault();
    const items = data;
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(filedata[filedata.length-1])
    console.log(filedata);
    console.log(header);
    let csv = filedata.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    console.log(csv)

    var dt = new Date();
    var date = dt.getFullYear() + '/' + (((dt.getMonth() + 1) < 10) ? '0' : '') + (dt.getMonth() + 1) + '/' + ((dt.getDate() < 10) ? '0' : '') + dt.getDate();

    const filename = 'ASMSData_'+date+'.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        var data = encodeURI(csv);

        var link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();

  }
  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="Uploaded Files List"></Breadcrumb>
      <Container fluid={true}>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Default Table</h5>
              <span>
                Example of large table, Add <code>.table-de</code>class to the{" "}
                <code>.table</code>to create a table with large spacing.
                  larger table all rows have <code>0.75rem</code> height.
                </span>
           
            </CardHeader>
            <CardBody>
            <div className="row">
                <div className="col col-12">
                  <div className="export-btn-group">
                    <button className="btns export-btn"  onClick={(e) => convertToCSV(e)}>Export to csv</button>
                    {/* <button className="btns setting-btn"><img src="https://img.icons8.com/windows/32/000000/gear.png" /></button> */}
                  </div>
                </div>
              </div>
              {
                (data != null) ?
                  <DataTable
                    columns={columns}
                    data={data}
                    striped={true}
                    center={true}
                    persistTableHead
                  // contextActions={contextActions}
                  // onSelectedRowsChange={handleRowSelected}
                  // clearSelectedRows={toggleCleared}
                  />

                  :
                  ""
              }
            </CardBody>
          </Card>
        </Col>


      </Container>

    </Fragment>
  );
};

export default FilesListData;