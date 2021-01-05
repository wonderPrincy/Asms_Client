import React, { Fragment, useState, useEffect } from "react";
import "../../../assets/css/style.css";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Papa from "papaparse";
import $ from 'jquery';
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
  Button
} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, UserPlus } from "react-feather";
import Clock from "react-clock";
import Calendar from "react-calendar";
const FilesList = (props) => {
  const history = useHistory();
  const [amazonResponseUK, set_amazonResponseUK] = useState(null);
  const [getFiles, set_getFiles] = useState(null);
  try {
    var userid = localStorage.getItem("id");
    var url = 'http://localhost:5000/getFiles/' + userid;
    fetch(url)
      .then((response1) => {
        if (response1.status >= 400) {
        }
        return response1.json();
      })
      .then((data1) => {
        // console.log(data1);
        set_getFiles(data1);
      });
    //end here

  }
  catch (error) {
  }
  useEffect(() => {
    //onloadmethod()
  }, []);
  // useEffect(() => {
  //   onloadmethod()
  // }, [getFiles]);
  const onloadmethod = () => {
    try {
      var userid = localStorage.getItem("id");
      var url = 'http://localhost:5000/getFiles/' + userid;
      console.log(url);
      fetch(url)
        .then((response1) => {
          if (response1.status >= 400) {
          }
          return response1.json();
        })
        .then((data1) => {
          // console.log(data1);
          set_getFiles(data1);
        });
      //end here

    }
    catch (error) {
    }
  }
  const navigateToFileData = (fileId) => {
    ///${fileId}
    localStorage.removeItem("selectedfilelistdata");
    localStorage.setItem("selectedfilelistdata", fileId);
    console.log(fileId);
    history.push(`${process.env.PUBLIC_URL}/dashboard/FileListData`);
  };
  // const onloadmethod = () => {
  //   try {
  //     var userid = localStorage.getItem("id");
  //     var url = 'http://localhost:5000/getFiles/' + userid;
  //     console.log(url);
  //     fetch(url)
  //       .then((response1) => {
  //         if (response1.status >= 400) {
  //         }
  //         return response1.json();
  //       })
  //       .then((data1) => {
  //         console.log(data1);
  //         set_getFiles(data1);
  //       });
  //     //end here

  //   }
  //   catch (error) {
  //   }
  // }
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
            <div className="table-responsive">
              <Table className="table-de">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Supplier Name</th>
                    <th scope="col">Total Products</th>
                    <th scope="col">Marketplace</th>
                    <th scope="col">View Products</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (getFiles != null) ?
                      getFiles.map(item => (
                        <tr key={item._id}>
                          <td>{new Date(item.CreatedOn).toLocaleDateString()}</td>
                          <td>{item.supplierid}</td>
                          <td>{item.totalRecords}</td>
                          <td>{item.marketplace}</td>
                          <td>
                            {/* {
                            (graphImg != "") ? <img src={graphImg} /> : <img src={require("../../../assets/images/graph.png")} />
                          } */}
                            {
                              (item.status == "processed")
                                ?
                                <Button
                                  color="primary btn-block"
                                  onClick={(e) => navigateToFileData(item.filename)}
                                 
                                >
                                  View Products
                                    </Button>
                                :
                                <Button
                                  color="primary btn-block"
                                  disabled="true"
                                  onClick={(e) => navigateToFileData(item.filename)}
                                >
                                  Processing
                                    </Button>
                            }
                          </td>
                        </tr>
                      ))
                      :
                      <tr><td colSpan="4"><span> Currently no file exist</span></td></tr>
                  }

                </tbody>
              </Table>
            </div>
          </Card>
        </Col>


      </Container>

    </Fragment>
  );
};

export default FilesList;