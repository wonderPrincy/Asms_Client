import React, { Fragment, useState, useEffect } from "react";
import "../../../assets/css/style.css";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Link, NavLink, useHistory } from 'react-router-dom';
//import { Papa } from '../../../../node_modules/papaparse';
import LoadingOverlay from 'react-loading-overlay';
import Papa from "papaparse";
import request from 'superagent';
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
const FileScanUpload = (props) => {
  // eslint-disable-next-line
  const history = useHistory();
  const [csvfile, set_csvfile] = useState(undefined);
  const [amazonResponseUK, set_amazonResponseUK] = useState(null);
  const [eur_gbp, seteur_gbp] = useState(0.88);
  const [headers, set_headers] = useState([]);
  const [selectedupcId, setSelectedupcId] = useState(null);
  const [selectedpriceId, setSelectedpriceId] = useState(null);
  const [fileId, set_fileId] = useState(null);
  const [selectedfield, setselectedfield] = useState(null);
  const [supplier, set_supplier] = useState("");
  const [isLoading, set_IsLoading] = useState(false);
  const[selectedMarketPlace,setselectedMarketPlace]=useState("UK");
  useEffect(() => {
    onloadmethod()
  }, []);
  useEffect(() => {
    onloadmethod()
  }, [amazonResponseUK]);
  const onloadmethod = () => {
    try {
      var cur_url = 'https://api.exchangeratesapi.io/latest?symbols=GBP'
      fetch(cur_url)
        .then((response) => {
          if (response.status >= 400) {
          }
          return response.json();
        })
        .then((data) => {
          seteur_gbp(data.rates.GBP);
          console.log(eur_gbp)
        });

        // var shell = new ActiveXObject("Shell.Application");       
        //     var command = "C:\\windows\\ winword.exe";
        //     shell.ShellExecute(command, "",   "", "open", "1");
      // var url = '/getWholesalers'
      // var url = 'https://www.amazstock.com/getwholesalers'
      // fetch(url)
      //   .then((response1) => {
      //     if (response1.status >= 400) {
      //     }
      //     return response1.json();
      //   })
      //   .then((data1) => {
      //     set_wholesalers(data1);
      //     console.log(wholesalers);
      //   });
      //end here

    }
    catch (error) {
    }
  }

  const handleChange = (event) => {
    set_csvfile(event.target.files[0]);
    importCSV();
  };
  const importCSV = () => {
    var file = document.getElementById('csvfiletxt').files[0];
    request.post('http://localhost:5000/uploadCsvfile')
      .field('avatar', file)
      .end((err, res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res.body);
          localStorage.removeItem("filename");
          localStorage.setItem("filename", res.body.data.name);
          // this.setState({
          //   done:'Success',
          //   data: res.body
          // });
        }
        else
          alert("Error!")
      })
    // console.log(csvfile);
    Papa.parse(file, {
      header: false,
      complete: function (results) {
        updateData(results)
      }

    });
  };
  const updateData = (result) => {
    var data = result.data;
    localStorage.removeItem("fileRecord");
    localStorage.setItem("fileRecord", JSON.stringify(data));
    console.log(data[0]);
    let myItems = [];
    let i = 0;
    for (i = 0; i < data[0].length; i++) {
      console.log(data[0][i]);
      myItems.push({
        hedaerId: i,
        headerName: data[0][i],
      });
    }
    console.log(myItems);
    set_headers(myItems);
  };
  const saveFileData = (e) => {
    e.preventDefault();
    set_IsLoading(true);
    var userid = localStorage.getItem("id");
    var fileRecord = JSON.parse(localStorage.getItem("fileRecord") || "[]");
    var totalRecords = fileRecord.length;
    if (selectedfield != null && selectedupcId != selectedpriceId) {
      try {
        var doc = {};

        doc["userid"] = userid;
        doc["totalRecords"] = totalRecords;
        doc["supplierid"] = supplier;
        doc["CreatedOn"] = Date();
        doc["priceheader"] = selectedpriceId;
        doc["upcHeader"] = selectedupcId;
        doc["selectedField"] = selectedfield;
        doc["filename"] = localStorage.getItem("filename");
        doc["marketplace"]=selectedMarketPlace;
        doc["seller_id"] = "A7F8I9TOT44ZD";
        doc["mws_auth_token"] = "amzn.mws.8eb9dc9c-e838-9c01-610a-39d8e5a4ac4a";
        doc["status"]="pending";
        var url = 'http://localhost:5000/addFile';
        fetch(url,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(doc)
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.Error == null) {
              var user = data[0];
              console.log(user);
              set_fileId(user._id);
              localStorage.setItem("fileUploadedId", user._id);
              console.log(props);
              set_IsLoading(false);
              history.push(`${process.env.PUBLIC_URL}/dashboard/FilesList`);
              //saveFileRecordsData(user._id);
            }
          });

      }
      catch (error) {
      }

    }

  };
  const saveFileRecordsData = (fileIdentity) => {
    var userid = localStorage.getItem("id");
    var fileRecord = JSON.parse(localStorage.getItem("fileRecord") || "[]");
    var totalRecords = fileRecord.length;

    fileRecord.forEach(element => {
      try {
        var doc = {};
        doc["seller_id"] = "A7F8I9TOT44ZD";
        doc["mws_auth_token"] = "amzn.mws.8eb9dc9c-e838-9c01-610a-39d8e5a4ac4a";
        doc["userid"] = userid;
        doc["FileID"] = fileIdentity;
        doc["CreatedOn"] = Date();
        if (selectedfield != null) {
          if (selectedfield == "ASIN") {
            doc["ASIN"] = element[selectedupcId];
            doc["EAN"] = null;
            doc["UPC"] = null;
          }
          else if (selectedfield == "EAN") {
            doc["ASIN"] = null;
            doc["EAN"] = element[selectedupcId];
            doc["UPC"] = null;
          }
          else if (selectedfield == "UPC") {
            doc["ASIN"] = null;
            doc["EAN"] = null;
            doc["UPC"] = element[selectedupcId];
          }
        }
        doc["ProductName"] = element[1];
        doc["Qty"] = element[2];
        doc["Price"] = element[selectedpriceId];
        doc["ProductGroup"] = null;
        doc["weight"] = 0.0;
        doc["ListingPrice"] = 0.0;
        doc["ShippingPrice"] = 0.0;
        doc["IsAmazonFullFilled"] = false;
        doc["Total_fee"] = 0.0;
        doc["Ref_fee"] = 0.0;
        doc["Fba_fee"] = 0.0;
        doc["Variable_fee"] = 0.0;
        doc["OrderHandling_fee"] = 0.0;
        doc["PickPack_fee"] = 0.0;
        doc["WeightHandling_fee"] = 0.0;
        doc["Profit"] = 0.0;
        doc["ROI"] = 0.0;
        var url = 'http://localhost:5000/addFileData';
        fetch(url,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(doc)
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.Error == null) {
              var user = data[0];
              // localStorage.setItem("fileId", user._id);
              // set_fileId(user._id);
            }

          });
      }
      catch (error) {
      }

      setTimeout(() => { }, 5000);
    });


  };
  const upcHeader = (event) => {
    console.log(event.target.value);
    setSelectedupcId(event.target.value);
  };
  const priceHeader = (event) => {
    console.log(event.target.value);
    setSelectedpriceId(event.target.value);
  };
  const marketplace = (event) => {
    setselectedMarketPlace(event.target.value);
  };
  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="Upload CSV" />

      <Container fluid={true}>
        <LoadingOverlay
          active={isLoading}
          spinner
          //text='Loading your content...'
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rgba(241, 231, 254, 0.5)'
            }),
            spinner: (base) => ({
              ...base,
              width: '100px',
              '& svg circle': {
                stroke: 'rgba(255, 0, 0, 0.5)'
              }
            })
          }}
        >
          <div className="product-details">
            <div className="container">
              <div className="row">
                <div className="col col-12">
                  {/* <div>< input type="file" id="csvfiletxt" onChange={(e) => handleChange(e)}></input></div> */}

                  <form className="upload-csv-form">
                    <div className="form-group">
                      <label>File Upload</label>
                      <div className="file-upload-field">
                        <input type="file" name="upload file" id="csvfiletxt" onChange={(e) => handleChange(e)} />
                        <span>Choose File</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Identify products by</label>
                      <div className="radio-btn-group">
                        <div className="radio-inline">
                          <input type="radio" id="ASIN" name="gender" value="asin" onChange={(e) => setselectedfield("ASIN")} />
                          <span></span>
                          <label htmlFor="ASIN">ASIN</label>
                        </div>
                        <div className="radio-inline">
                          <input type="radio" id="UPC" name="gender" value="upc" onChange={(e) => setselectedfield("UPC")} />
                          <span></span>
                          <label htmlFor="UPC">UPC</label>
                        </div>
                        <div className="radio-inline">
                          <input type="radio" id="EAN" name="gender" value="ean" onChange={(e) => setselectedfield("EAN")} />
                          <span></span>
                          <label htmlFor="EAN">EAN</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>UPC Field</label>
                      <select id="upcHeader" onChange={(e) => upcHeader(e)} >
                        <option>Select Type</option>
                        {headers.map(item => (
                          <option
                            key={item.hedaerId}
                            value={item.hedaerId}
                          >
                            {item.headerName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price Field</label>
                      <select id="priceHeader" onChange={(e) => priceHeader(e)}>
                        <option>Select Price</option>
                        {headers.map(item => (
                          <option
                            key={item.hedaerId}
                            value={item.hedaerId}
                          >
                            {item.headerName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Supplier</label>
                      <Input
                        className="btn-pill form-control"
                        type="text"
                        name="supplier"
                        value={supplier}
                        onChange={(e) => set_supplier(e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                    <div className="form-group">
                      <label>MarketPlace</label>
                      <select  onChange={(e) => marketplace(e)}>
                        <option>Select MarketPlace</option>
                        <option>UK</option>
                        <option>Italy</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Spain</option>
                      </select>
                    </div>
                    {/* <div className="Supplier-box">
                    <h3>Supplier</h3>
                    <button className="add-new-supplier">add a new supplier</button>
                    <div className="form-group">
                      <label>Select Existing supplier</label>
                      <select>
                        <option>Select One</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div> */}
                    <div className="form-group">
                      <button className="Import-btn" onClick={(e) => saveFileData(e)}>Import</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </Container>

    </Fragment>
  );
};

export default FileScanUpload;