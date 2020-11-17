import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import "../../../assets/css/style.css";
//import { Papa } from '../../../../node_modules/papaparse';
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
} from "reactstrap";
import { Database, ShoppingBag, MessageCircle, UserPlus } from "react-feather";
import Clock from "react-clock";
import Calendar from "react-calendar";
const Stock = (props) => {
  // eslint-disable-next-line
  const [csvfile, set_csvfile] = useState(undefined);
  const [amazonResponseUK, set_amazonResponseUK] = useState(null);
  const [amazonResponseDE, set_amazonResponseDE] = useState(null);
  const [amazonResponseES, set_amazonResponseES] = useState(null);
  const [amazonResponseFR, set_amazonResponseFR] = useState(null);
  const [amazonResponseIT, set_amazonResponseIT] = useState(null);
  const [amazonProfitUK, set_amazonProfitUK] = useState(0.0);
  const [amazonProfitDE, set_amazonProfitDE] = useState(0.0);
  const [amazonProfitIT, set_amazonProfitIT] = useState(0.0);
  const [amazonProfitFR, set_amazonProfitFR] = useState(0.0);
  const [amazonProfitES, set_amazonProfitES] = useState(0.0);
  const [buyingPrice, set_buyingPrice] = useState(0.0);
  const [salesprice, set_salesPrice] = useState(0.0);
  const [eur_gbp, seteur_gbp] = useState(0.88);
  const [wholesalers, set_wholesalers] = useState([]);
  const [primePriceUK, set_primePriceUK] = useState(0.0);
  const [buyBoxPriceUK, set_buyBoxPriceUK] = useState(0.0);
  const [title, set_Title] = useState("");
  const [prodImg, set_prodImg] = useState("");
  const [graphImg, set_graphImg] = useState("");
  const [buyBoxPriceAvg, set_buyBoxPriceAVg] = useState(0.0);
  const [buyBoxPriceAvg30, set_buyBoxPriceAvg30] = useState(0.0);
  const [buyBoxPriceAvg90, set_buyBoxPriceAVg90] = useState(0.0);
  const [buyBoxPriceAvg180, set_buyBoxPriceAvg180] = useState(0.0);
  const [keepaResponse, set_KeepaResponse] = useState(null);

  useEffect(() => {
    onloadmethod()
  }, []);
  useEffect(() => {
    onloadmethod()
  }, [amazonResponseUK]);
  // const script = document.createElement("script");
  // script.async = true;
  // script.src = "../../../assets/js/custom.js";
  // //For head
  // document.head.appendChild(script);

  // // For body
  // document.body.appendChild(script);
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
  const handleInput = (e) => {
    switch (e.target.name) {
      case 'asin':
        var doc = {};
        doc["seller_id"] = "A7F8I9TOT44ZD";
        doc["mws_auth_token"] = "amzn.mws.8eb9dc9c-e838-9c01-610a-39d8e5a4ac4a";
        doc["asin"] = e.target.value;
        var amazonurl = 'http://localhost:5000/getPrice'
        fetch(amazonurl, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(doc)
        })
          .then((amazonresponse) => {
            if (amazonresponse.status >= 400) {
            }
            return amazonresponse.json();
          })
          .then((amazonresponsedata) => {
            set_amazonResponseUK(amazonresponsedata[0].responseUK);
            set_amazonResponseDE(amazonresponsedata[0].responseDE);
            set_amazonResponseES(amazonresponsedata[0].responseES);
            set_amazonResponseFR(amazonresponsedata[0].responseFR);
            set_amazonResponseIT(amazonresponsedata[0].responseIT);
          });

        //end keepa api calling
        var url_uk = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + e.target.value + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_uk)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.products[0].stats);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + e.target.value
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            console.log(URL.createObjectURL(data1));
            set_graphImg(URL.createObjectURL(data1));
          });
        break;

      case 'salesPrice':
        if (Number(salesprice != 0)) {
          set_amazonProfitUK((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));
        }
        else {
          set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));
        }
        break;
      case 'buyingPrice':
        if (Number(salesprice != 0)) {
          set_amazonProfitUK((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));
        }
        else {
          set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));
        }
        //set_buying_price(e.target.value);
        break;
      default:
    }


  }
  const KeepaEvent = (event) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case '30':

        break;
      default:
    }
  };
  const handleChange = (event) => {
    set_csvfile(event.target.files[0]);
  };
  const importCSV = () => {
    var file = document.getElementById('csvfiletxt').files[0];
    console.log(csvfile);
    Papa.parse(file, {
      header: false,
      complete: function (results) {
        updateData(results)
      }

    });
  };
  const updateData = (result) => {
    var data = result.data;
    console.log(data);
    console.log(data[0]);
    let i = 0;
    for (i = 0; i < data[0].length; i++) {
      console.log(data[0][i]);
    }
  };
  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="General" />

      <Container fluid={true}>
        <Row>
          <div className="container">
            <div className="row">
              <div className="col col-6">
                <input type="text" className="btn-pill form-control" name="asin" placeholder="Search here ..." onBlur={(e) => handleInput(e)} />
              </div>
            </div>
          </div>
          <div className="product-details">
            <div className="container">
              <div className="row">
                <div className="col col-4">
                  <div className="product-image">
                    {
                      (prodImg != "") ? <img src={prodImg} /> : <img src={require("../../../assets/images/default.png")} />
                    }

                  </div>
                </div>
                <div className="col col-8">
                  <div className="product-details-right">
                    <h3>{title}</h3>
                  </div>
                  <div className="tables-row">
                    <div className="table">
                      <table>
                        <tbody>
                          <tr>
                            <td>BSR (Top %)</td>
                            <td>96.894 <span style={{ color: "#19b300" }}>(1.19%)</span></td>
                          </tr>
                          <tr>
                            <td>Buy Box</td>
                            <td>£ {buyBoxPriceUK}</td>
                          </tr>
                          <tr>
                            <td>Amazon</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Lowest FBA (Sellers)</td>
                            <td>£ 17.99 ({(keepaResponse != null) ? (keepaResponse.stats.offerCountFBA) : 0})
                            </td>
                          </tr>
                          <tr>
                            <td>Lowest FBM (Sellers)</td>
                            <td>£ 17.61 ({(keepaResponse != null) ? (keepaResponse.stats.offerCountFBM) : 0})
                              </td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              {/* <a href="#" className="tbl-button">Current</a> <i>30</i> <i>90</i> <i>180</i> <i>Average</i> */}
                              {/* <div className="sibling-buttons">
                                <a href="#" className="tbl-button active" name="current" onClick={(e) => KeepaEvent(e)}>Current</a>
                                <a href="#" className="tbl-button" name="30" onClick={(e) => KeepaEvent(e)}>30</a>
                                <a href="#" className="tbl-button" name="90" onClick={(e) => KeepaEvent(e)}>90</a>
                                <a href="#" className="tbl-button" name="180" onClick={(e) => KeepaEvent(e)}>180</a>
                                <a href="#" className="tbl-button" name="Average" onClick={(e) => KeepaEvent(e)}>Average</a>
                              </div> */}
                              <form action="" className="sibling-buttons">
                                <a href="#" className="tbl-button">
                                  <input type="radio" id="current" name="gender" value="current" defaultChecked="true" />
                                  <label htmlFor="current">Current</label></a>

                                <a href="#" className="tbl-button">
                                  <input type="radio" id="30" name="gender" value="30" />
                                  <label htmlFor="30">30</label></a>

                                <a href="#" className="tbl-button">
                                  <input type="radio" id="90" name="gender" value="90" />
                                  <label htmlFor="90">90</label></a>

                                <a href="#" className="tbl-button">
                                  <input type="radio" id="180" name="gender" value="180" />
                                  <label htmlFor="180">180</label></a>

                                <a href="#" className="tbl-button">
                                  <input type="radio" id="Average" name="gender" value="Average" />
                                  <label htmlFor="Average">Average</label></a>
                              </form>
                            </td>
                          </tr>
                          {/* <tr>
                            <td colSpan="2">
                              <div className="radio-btn-group">
                                <div className="radio-inline2">                                  
                                  <input type="radio" name="emotion" id="sad" className="input-hidden" />
                                  <label htmlFor="sad">
                                    <img src="https://www.countryflags.io/DE/shiny/64.png" alt="I'm sad" />
                                  </label>
                                </div>
                                <div className="radio-inline2">
                                  <input type="radio" name="emotion" id="srad" className="input-hidden" />
                                  <label htmlFor="srad">
                                    <img src="https://www.countryflags.io/ES/shiny/64.png" alt="I'm sad" />
                                  </label>
                                </div>
                                <div className="radio-inline2">
                                  <input type="radio" name="emotion" id="dad" className="input-hidden" />
                                  <label htmlFor="dad">
                                    <img src="https://www.countryflags.io/GB/shiny/64.png" alt="I'm sad" />
                                  </label>
                                </div>
                              </div>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                    </div>
                    <div className="graph">
                      <form action="" className="sibling-buttons">
                        <span>Marketplaces:</span>
                        <a href="#" className="tbl-button">
                          <input type="radio" id="DE" name="gender" value="DE"   />
                          <label htmlFor="DE"><img src="https://www.countryflags.io/DE/flat/64.png" /></label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="ES" name="gender" value="ES" />
                          <label htmlFor="ES"><img src="https://www.countryflags.io/ES/flat/64.png" /></label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="FR" name="gender" value="FR" />
                          <label htmlFor="FR"><img src="https://www.countryflags.io/FR/flat/64.png" /></label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="IT" name="gender" value="IT" />
                          <label htmlFor="IT"><img src="https://www.countryflags.io/IT/flat/64.png" /></label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="GB" name="gender" value="GB" defaultChecked="true" />
                          <label htmlFor="GB"><img src="https://www.countryflags.io/GB/flat/64.png" /></label></a>
                      </form>
                      <div class="graph-div">
                        {
                          (graphImg != "") ? <img src={graphImg} /> : <img src={require("../../../assets/images/graph.png")} />
                        }
                      </div>
                      {/* <form action="" className="sibling-buttons Days">
                        <span>Days:</span>
                        <a href="#" className="tbl-button">
                          <input type="radio" id="days" name="gender" value="days" checked="" />
                          <label htmlFor="days">7</label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="month" name="gender" value="month" />
                          <label htmlFor="month">30</label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="months" name="gender" value="months" />
                          <label htmlFor="months">90</label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="halfyear" name="gender" value="halfyear" />
                          <label htmlFor="halfyear">180</label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="year" name="gender" value="year" />
                          <label htmlFor="year">365</label></a>

                        <a href="#" className="tbl-button">
                          <input type="radio" id="twoyear" name="gender" value="twoyear" />
                          <label htmlFor="twoyear">730</label></a>
                      </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-6">
                <div className="white-tables">
                  <table>
                    <tbody>
                      <tr>
                        <td><b>Total Fees +</b></td>
                        <td width="80">
                          <b>
                            {(amazonResponseUK != null) ? (Number(amazonResponseUK.fba_fee) + Number(amazonResponseUK.ref_fee)) : (0.0)}
                          </b>
                        </td>
                      </tr>
                      <tr>
                        <td>Dropdown</td>
                        <td width="80"><select>
                          <option>1</option>
                          <option>1</option>
                          <option>1</option>
                        </select></td>
                      </tr>
                      <tr>
                        <td>VAT Deu</td>
                        <td width="80">£ 1.60</td>
                      </tr>
                      <tr>
                        <td><b>Profit</b></td>
                        <td width="80"><b style={{ color: "#01a324" }}>£ 3.00</b></td>
                      </tr>
                      <tr>
                        <td><b>ROI</b></td>
                        <td width="80"><b style={{ color: "#01a324" }}>£ 35.76%</b></td>
                      </tr>
                      <tr>
                        <td>Profit Margin</td>
                        <td width="80">£ 5.00</td>
                      </tr>
                      <tr>
                        <td>Breakeven Sale Price</td>
                        <td width="80">£ 5.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col col-6">
                <div className="white-tables lr-border">
                  <table>
                    <tbody>
                      <tr>
                        <td width="50"></td>
                        <td><b>Rank</b></td>
                        <td><b>Price</b></td>
                        <td><b>Profit</b></td>
                        <td width="60"><b>ROI</b></td>
                      </tr>
                      <tr>
                        <td><img src="https://www.countryflags.io/DE/shiny/64.png" /></td>
                        <td>{(amazonResponseDE != null) ? (amazonResponseDE.rank) : "-"}</td>
                        <td>{(amazonResponseDE != null) ? (amazonResponseDE.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                        <td>£ {amazonProfitDE}</td>
                        <td>136%</td>
                      </tr>
                      <tr>
                        <td><img src="https://www.countryflags.io/ES/shiny/64.png" /></td>
                        <td>{(amazonResponseES != null) ? (amazonResponseES.rank) : "-"}</td>
                        <td>{(amazonResponseES != null) ? (amazonResponseES.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                        <td>£ {amazonProfitES}</td>
                        <td style={{ color: "#01a324" }}>36%</td>
                      </tr>
                      <tr>
                        <td><img src="https://www.countryflags.io/FR/shiny/64.png" /></td>
                        <td>{(amazonResponseFR != null) ? (amazonResponseFR.rank) : "-"}</td>
                        <td>{(amazonResponseFR != null) ? (amazonResponseFR.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                        <td>£ {amazonProfitFR}</td>
                        <td style={{ color: "#01a324" }}>36%</td>
                      </tr>
                      <tr>
                        <td><img src="https://www.countryflags.io/IT/shiny/64.png" /></td>
                        <td>{(amazonResponseIT != null) ? (amazonResponseIT.rank) : "-"}</td>
                        <td>{(amazonResponseIT != null) ? (amazonResponseIT.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                        <td>£ {amazonProfitIT}</td>
                        <td>36%</td>
                      </tr>
                      <tr>
                        <td><img src="https://www.countryflags.io/GB/shiny/64.png" /></td>
                        <td>{(amazonResponseUK != null) ? (amazonResponseUK.rank) : "-"}</td>
                        <td>{(amazonResponseUK != null) ? (amazonResponseUK.listingPrice) : "-"}</td>
                        <td>£ {amazonProfitUK}</td>
                        <td>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col col-6">
                <div className="white-tables">
                  <table>
                    <tbody>
                      <tr>
                        <td>Cost</td>
                        <td><div className="price-type"><span>£</span> <input type="text" defaultValue="0" name="buyingPrice" onChange={(e) => set_buyingPrice(e.target.value)} onBlur={(e) => handleInput(e)} /></div></td>
                      </tr>
                      <tr>
                        <td>Sale Price</td>
                        <td><div className="price-type"><span>£</span> <input type="text" defaultValue="0" name="salesPrice" onChange={(e) => set_salesPrice(e.target.value)} onBlur={(e) => handleInput(e)} /></div></td>
                      </tr>
                      <tr>
                        <td><b>Storage (Month)</b></td>
                        <td><div id="price-slider"><span className="cercul"></span></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col col-6">
                <div className="amazon-seller">
                  <span className="amazon-icon"><img src={require("../../../assets/images/amazon-icon.png")} /></span>
                  <form className="search-form">
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/search.png" />
                    <input type="text" name="asin" onBlur={(e) => handleInput(e)} placeholder="Search Agian" />
                  </form>
                  <div className="btn-group">
                    <button className="purpel-btn">Add Product</button>
                    <button className="purpel-btn">Inventory</button>
                    <button className="purpel-btn">Orders</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>

      </Container>

    </Fragment>
  );
};

export default Stock;