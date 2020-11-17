import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
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
const CustomCsv = (props) => {
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
    console.log('pppppp');
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
    // <Fragment>
    //   <Breadcrumb parent="Widgets" title="Upload CSv" />

    //   <Container fluid={true}>
    //     <Row>
         
    //     </Row>

    //   </Container>

    // </Fragment>
    <div> <span>Princi testing bbfhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</span></div>
  );
};

export default CustomCsv;