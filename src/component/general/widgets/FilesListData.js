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
 
  useEffect(() => {
    try {
      var fileid=localStorage.getItem("selectedfilelistdata");
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
      selector: "ProductName",
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
      selector: "ListingPrice",
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
      selector: "Ref_fee",
      sortable: true,
      center: true,
    },
    {
      name: "Fba Fee",
      selector: "Fba_fee",
      sortable: true,
      center: true,
    },
    {
      name: "Shipping Price",
      selector: "ShippingPrice",
      sortable: true,
      center: true,
    },
  ];
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