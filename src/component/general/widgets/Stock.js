import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import "../../../assets/css/style.css";
//import { Papa } from '../../../../node_modules/papaparse';
import Papa from "papaparse";
import Loader from 'react-loader-spinner';
import LoadingOverlay from 'react-loading-overlay';
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
  const [selectedASIN, setselectedASIN] = useState(null);
  const [selectedCountry, set_selectedCountry] = useState(null);
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

  const [amazonROIUK, set_amazonROIUK] = useState(0.0);
  const [amazonROIDE, set_amazonROIDE] = useState(0.0);
  const [amazonROIIT, set_amazonROIIT] = useState(0.0);
  const [amazonROIFR, set_amazonROIFR] = useState(0.0);
  const [amazonROIES, set_amazonROIES] = useState(0.0);

  const [buyingPrice, set_buyingPrice] = useState(0.0);
  const [salesprice, set_salesPrice] = useState(0.0);
  const [eur_gbp, seteur_gbp] = useState(0.88);
  const [wholesalers, set_wholesalers] = useState([]);

  const [title, set_Title] = useState("");
  const [prodImg, set_prodImg] = useState("");
  const [graphImg, set_graphImg] = useState("");
  const [buyBoxPriceAvg, set_buyBoxPriceAVg] = useState(0.0);
  const [buyBoxPriceAvg30, set_buyBoxPriceAvg30] = useState(0.0);
  const [buyBoxPriceAvg90, set_buyBoxPriceAVg90] = useState(0.0);
  const [buyBoxPriceAvg180, set_buyBoxPriceAvg180] = useState(0.0);
  const [keepaResponse, set_KeepaResponse] = useState(null);
  const [keepaResponseDE, set_KeepaResponseDE] = useState(null);
  const [keepaResponseIT, set_KeepaResponseIT] = useState(null);
  const [keepaResponseES, set_KeepaResponseES] = useState(null);
  const [keepaResponseFR, set_KeepaResponseFR] = useState(null);
  const [keepaResponseGB, set_KeepaResponseGB] = useState(null);
  const [keepaResponse30, set_KeepaResponse30] = useState(null);
  const [keepaResponse90, set_KeepaResponse90] = useState(null);
  const [keepaResponse180, set_KeepaResponse180] = useState(null);
  const [keepaResponseAverage, set_KeepaResponseAverage] = useState(null);
  const [vat, set_vat] = useState(0.0);
  const [isLoading, set_IsLoading] = useState(false);
  const [primePriceUK, set_primePriceUK] = useState(0.0);
  const [buyBoxPriceUK, set_buyBoxPriceUK] = useState(0.0);
  const [primePriceFR, set_primePriceFR] = useState(0.0);
  const [buyBoxPriceFR, set_buyBoxPriceFR] = useState(0.0);
  const [primePriceIT, set_primePriceIT] = useState(0.0);
  const [buyBoxPriceIT, set_buyBoxPriceIT] = useState(0.0);
  const [primePriceDE, set_primePriceDE] = useState(0.0);
  const [buyBoxPriceDE, set_buyBoxPriceDE] = useState(0.0);
  const [primePriceES, set_primePriceES] = useState(0.0);
  const [buyBoxPriceES, set_buyBoxPriceES] = useState(0.0);

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
        set_IsLoading(true);
        setselectedASIN(e.target.value);
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
            set_IsLoading(false);
            set_amazonResponseUK(amazonresponsedata[0].responseUK);
            set_amazonResponseDE(amazonresponsedata[0].responseDE);
            set_amazonResponseES(amazonresponsedata[0].responseES);
            set_amazonResponseFR(amazonresponsedata[0].responseFR);
            set_amazonResponseIT(amazonresponsedata[0].responseIT);
          });

        //end keepa api calling
        set_selectedCountry("GB");
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
            set_KeepaResponseGB(data.products[0]);
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

          set_amazonROIUK(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIDE(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIES(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIFR(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIIT(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));

        }
        else {
          set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

          set_amazonROIUK(((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseUK.listingPrice)).toFixed(2));
          set_amazonROIDE(((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseDE.listingPrice)).toFixed(2));
          set_amazonROIES(((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseES.listingPrice)).toFixed(2));
          set_amazonROIFR(((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseFR.listingPrice)).toFixed(2));
          set_amazonROIIT(((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseIT.listingPrice)).toFixed(2));

        }
        break;
      case 'buyingPrice':
        if (Number(salesprice != 0)) {
          set_amazonProfitUK((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

          set_amazonROIUK(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIDE(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIES(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIFR(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
          set_amazonROIIT(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));


        }
        else {
          set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
          set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
          set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
          set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
          set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

          set_amazonROIUK(((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseUK.listingPrice)).toFixed(2));
          set_amazonROIDE(((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseDE.listingPrice)).toFixed(2));
          set_amazonROIES(((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseES.listingPrice)).toFixed(2));
          set_amazonROIFR(((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseFR.listingPrice)).toFixed(2));
          set_amazonROIIT(((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseIT.listingPrice)).toFixed(2));

        }
        //set_buying_price(e.target.value);
        break;
      default:
    }


  }
  const KeepaEvent = (e) => {
    switch (e.target.value) {
      case 'DE':
        set_selectedCountry("DE");
        var url_de = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=3&asin=' + selectedASIN + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_de)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            set_KeepaResponseDE(data.products[0]);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=3&asin=' + selectedASIN
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            set_graphImg(URL.createObjectURL(data1));
          });
        break;
      case 'ES':
        set_selectedCountry("ES");
        var url_es = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=9&asin=' + selectedASIN + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_es)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            set_KeepaResponseES(data.products[0]);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=9&asin=' + selectedASIN
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            set_graphImg(URL.createObjectURL(data1));
          });
        break;
      case 'FR':
        set_selectedCountry("FR");
        var url_fr = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=4&asin=' + selectedASIN + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_fr)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            set_KeepaResponseFR(data.products[0]);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=4&asin=' + selectedASIN
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            set_graphImg(URL.createObjectURL(data1));
          });
        break;
      case 'IT':
        set_selectedCountry("IT");
        var url_it = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=8&asin=' + selectedASIN + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_it)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            set_KeepaResponseIT(data.products[0]);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=8&asin=' + selectedASIN
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            set_graphImg(URL.createObjectURL(data1));
          });
        break;
      case 'GB':
        set_selectedCountry("GB");
        var url_uk = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + selectedASIN + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
        fetch(url_uk)
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            set_KeepaResponseGB(data.products[0]);
            set_KeepaResponse(data.products[0]);
            set_primePriceUK((((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2));
            set_Title(data.products[0].title);
            set_prodImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
            set_buyBoxPriceUK(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));

          });

        var url_graph = 'https://api.keepa.com/graphimage?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + selectedASIN
        fetch(url_graph)
          .then((response1) => {
            if (response1.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response1.blob();
          })
          .then((data1) => {
            set_graphImg(URL.createObjectURL(data1));
          });
        break;
      default:
    }
  };
  const KeepaHistory = (e) => {
    if (selectedCountry == "GB") {
      switch (e.target.value) {
        case '30':
          var result = keepaResponseGB;
          console.log(result);
          set_primePriceUK((((result.stats.avg30[0] != -1) ? result.stats.avg30[0] : result.stats.avg30[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg30[0]) / 100).toFixed(2));

          break;
        case '90':
          var result = keepaResponseGB;
          set_primePriceUK((((result.stats.avg90[0] != -1) ? result.stats.avg90[0] : result.stats.avg90[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg90[0]) / 100).toFixed(2));

          break;
        case '180':
          var result = keepaResponseGB;
          set_primePriceUK((((result.stats.avg180[0] != -1) ? result.stats.avg180[0] : result.stats.avg180[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg180[0]) / 100).toFixed(2));

          break;
        case 'Average':
          var result = keepaResponseGB;
          set_primePriceUK((((result.stats.avg[0] != -1) ? result.stats.avg[0] : result.stats.avg[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg[0]) / 100).toFixed(2));

          break;
        default:
      }
    }
    else if (selectedCountry == "DE") {
      var result = keepaResponseDE;
      switch (e.target.value) {
        case '30':
          set_primePriceUK((((result.stats.avg30[0] != -1) ? result.stats.avg30[0] : result.stats.avg30[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg30[0]) / 100).toFixed(2));

          break;
        case '90':
          set_primePriceUK((((result.stats.avg90[0] != -1) ? result.stats.avg90[0] : result.stats.avg90[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg90[0]) / 100).toFixed(2));

          break;
        case '180':
          set_primePriceUK((((result.stats.avg180[0] != -1) ? result.stats.avg180[0] : result.stats.avg180[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg180[0]) / 100).toFixed(2));

          break;
        case 'Average':
          set_primePriceUK((((result.stats.avg[0] != -1) ? result.stats.avg[0] : result.stats.avg[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg[0]) / 100).toFixed(2));

          break;
        default:
      }
    }
    else if (selectedCountry == "ES") {
      var result = keepaResponseES;
      switch (e.target.value) {
        case '30':
          set_primePriceUK((((result.stats.avg30[0] != -1) ? result.stats.avg30[0] : result.stats.avg30[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg30[0]) / 100).toFixed(2));

          break;
        case '90':
          set_primePriceUK((((result.stats.avg90[0] != -1) ? result.stats.avg90[0] : result.stats.avg90[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg90[0]) / 100).toFixed(2));

          break;
        case '180':
          set_primePriceUK((((result.stats.avg180[0] != -1) ? result.stats.avg180[0] : result.stats.avg180[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg180[0]) / 100).toFixed(2));

          break;
        case 'Average':
          set_primePriceUK((((result.stats.avg[0] != -1) ? result.stats.avg[0] : result.stats.avg[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg[0]) / 100).toFixed(2));

          break;
        default:
      }
    }
    else if (selectedCountry == "IT") {
      var result = keepaResponseIT;
      switch (e.target.value) {
        case '30':
          set_primePriceUK((((result.stats.avg30[0] != -1) ? result.stats.avg30[0] : result.stats.avg30[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg30[0]) / 100).toFixed(2));

          break;
        case '90':
          set_primePriceUK((((result.stats.avg90[0] != -1) ? result.stats.avg90[0] : result.stats.avg90[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg90[0]) / 100).toFixed(2));

          break;
        case '180':
          set_primePriceUK((((result.stats.avg180[0] != -1) ? result.stats.avg180[0] : result.stats.avg180[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg180[0]) / 100).toFixed(2));

          break;
        case 'Average':
          set_primePriceUK((((result.stats.avg[0] != -1) ? result.stats.avg[0] : result.stats.avg[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg[0]) / 100).toFixed(2));

          break;
        default:
      }
    }
    else if (selectedCountry == "FR") {
      var result = keepaResponseFR;
      switch (e.target.value) {
        case '30':
          set_primePriceUK((((result.stats.avg30[0] != -1) ? result.stats.avg30[0] : result.stats.avg30[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg30[0]) / 100).toFixed(2));

          break;
        case '90':
          set_primePriceUK((((result.stats.avg90[0] != -1) ? result.stats.avg90[0] : result.stats.avg90[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg90[0]) / 100).toFixed(2));

          break;
        case '180':
          set_primePriceUK((((result.stats.avg180[0] != -1) ? result.stats.avg180[0] : result.stats.avg180[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg180[0]) / 100).toFixed(2));

          break;
        case 'Average':
          set_primePriceUK((((result.stats.avg[0] != -1) ? result.stats.avg[0] : result.stats.avg[10]) / 100).toFixed(2));
          set_buyBoxPriceUK(((result.stats.avg[0]) / 100).toFixed(2));

          break;
        default:
      }
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
  const selectedVatOption = (event) => {
    console.log(event.target.value);
    if (event.target.value == "20%") {
      let buyingPrice_inlcTax = Number(Number(buyingPrice) + (Number(buyingPrice * 20) / 100)).toFixed(2);
      console.log(buyingPrice_inlcTax);
      set_vat(((buyingPrice * 20) / 100).toFixed(2));
      if (Number(salesprice != 0)) {
        set_amazonProfitUK((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
        set_amazonProfitDE((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
        set_amazonProfitES((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
        set_amazonProfitFR((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
        set_amazonProfitIT((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

        set_amazonROIUK(((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIDE(((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIES(((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIFR(((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIIT(((Number(salesprice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));

      }
      else {
        set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
        set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
        set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
        set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
        set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

        set_amazonROIUK(((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseUK.listingPrice)).toFixed(2));
        set_amazonROIDE(((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseDE.listingPrice)).toFixed(2));
        set_amazonROIES(((Number(amazonResponseES.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseES.listingPrice)).toFixed(2));
        set_amazonROIFR(((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseFR.listingPrice)).toFixed(2));
        set_amazonROIIT(((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice_inlcTax) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseIT.listingPrice)).toFixed(2));

      }
    }

    else {
      set_vat(0.0);
      if (Number(salesprice != 0)) {
        set_amazonProfitUK((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
        set_amazonProfitDE((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
        set_amazonProfitES((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
        set_amazonProfitFR((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
        set_amazonProfitIT((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

        set_amazonROIUK(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIDE(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIES(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIFR(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));
        set_amazonROIIT(((Number(salesprice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(salesprice)).toFixed(2));

      }
      else {
        set_amazonProfitUK((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2));
        set_amazonProfitDE((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2));
        set_amazonProfitES((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2));
        set_amazonProfitFR((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2));
        set_amazonProfitIT((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2));

        set_amazonROIUK(((Number(amazonResponseUK.listingPrice) - (Number(buyingPrice) + Number(amazonResponseUK.ref_fee) + Number(amazonResponseUK.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseUK.listingPrice)).toFixed(2));
        set_amazonROIDE(((Number(amazonResponseDE.listingPrice) - (Number(buyingPrice) + Number(amazonResponseDE.ref_fee) + Number(amazonResponseDE.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseDE.listingPrice)).toFixed(2));
        set_amazonROIES(((Number(amazonResponseES.listingPrice) - (Number(buyingPrice) + Number(amazonResponseES.ref_fee) + Number(amazonResponseES.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseES.listingPrice)).toFixed(2));
        set_amazonROIFR(((Number(amazonResponseFR.listingPrice) - (Number(buyingPrice) + Number(amazonResponseFR.ref_fee) + Number(amazonResponseFR.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseFR.listingPrice)).toFixed(2));
        set_amazonROIIT(((Number(amazonResponseIT.listingPrice) - (Number(buyingPrice) + Number(amazonResponseIT.ref_fee) + Number(amazonResponseIT.fba_fee))).toFixed(2) * 100) / (Number(amazonResponseIT.listingPrice)).toFixed(2));

      }
    }
  };
  const addStockData = (e) => {
    e.preventDefault();
    var doc = {};
    var emptyFlag = false;
    let errors = {};
    doc["img"] = prodImg;
    doc["asin"] = selectedASIN;
    doc["product_title"] = title;
    doc["buying_price"] = buyingPrice;

    // doc["order_quantity"] = this.refs.qty.value;
    // doc["prod_code"] = this.refs.prod_code.value;
    // doc["wholesalers"] = this.state.selectedValue;
    // doc["fba_ship_charges"] = this.refs.fba_ship_charges.value;

    doc["vat"] = vat;
    doc["order_status"] = "Order in progress";

    doc["ref_rate"] = this.state.ref_rate;
    doc["category"] = this.state.category;

    doc["uk_prime_price"] = (((keepaResponseGB.stats.current[0] != -1) ? keepaResponseGB.stats.current[0] : keepaResponseGB.stats.current[10]) / 100).toFixed(2);;
    doc["uk_fba_fees"] = Number(amazonResponseUK.fba_fee);
    doc["uk_buybox_price"] = Number(amazonResponseUK.listingPrice);
    doc["uk_ref_fees"] = Number(amazonResponseUK.ref_fee);
    doc["uk_profit"] = amazonProfitUK;
    doc["uk_roi"] = amazonROIUK;
    doc["uk_sales_rank"] = amazonResponseUK.rank;
    // doc["uk_monthly_approx_sales"] = this.refs.uk_monthly_approx_sales.value;
    doc["uk_keepa_90avg"] = ((keepaResponseGB.stats.avg90[0]) / 100).toFixed(2);
    // doc["uk_minprice"] = this.state.uk_minprice;
    // doc["uk_gpp15price"] = this.state.uk_gpp15price;


    doc["fr_prime_price"] = (((keepaResponseFR.stats.current[0] != -1) ? keepaResponseFR.stats.current[0] : keepaResponseFR.stats.current[10]) / 100).toFixed(2);
    doc["fr_fba_fees"] = Number(amazonResponseFR.fba_fee);
    doc["fr_buybox_price"] = Number(amazonResponseFR.listingPrice);
    doc["fr_ref_fees"] = Number(amazonResponseFR.ref_fee);
    doc["fr_profit"] = amazonProfitFR;
    doc["fr_roi"] = amazonROIFR;
    doc["fr_sales_rank"] = amazonResponseFR.rank;
    // doc["fr_monthly_approx_sales"] = this.refs.uk_monthly_approx_sales.value;
    doc["fr_keepa_90avg"] = ((keepaResponseFR.stats.avg90[0]) / 100).toFixed(2);
    // doc["uk_minprice"] = this.state.uk_minprice;
    // doc["uk_gpp15price"] = this.state.uk_gpp15price;
    
    doc["es_prime_price"] = (((keepaResponseES.stats.current[0] != -1) ? keepaResponseES.stats.current[0] : keepaResponseES.stats.current[10]) / 100).toFixed(2);
    doc["es_fba_fees"] = Number(amazonResponseFR.fba_fee);
    doc["es_buybox_price"] = Number(amazonResponseES.listingPrice);
    doc["es_ref_fees"] = Number(amazonResponseES.ref_fee);
    doc["es_profit"] = amazonProfitES;
    doc["es_roi"] = amazonROIES;
    doc["es_sales_rank"] = amazonResponseES.rank;
    // doc["fr_monthly_approx_sales"] = this.refs.uk_monthly_approx_sales.value;
    doc["es_keepa_90avg"] = ((keepaResponseES.stats.avg90[0]) / 100).toFixed(2);
    // doc["uk_minprice"] = this.state.uk_minprice;
    // doc["uk_gpp15price"] = this.state.uk_gpp15price;

    doc["it_prime_price"] = (((keepaResponseIT.stats.current[0] != -1) ? keepaResponseIT.stats.current[0] : keepaResponseIT.stats.current[10]) / 100).toFixed(2);
    doc["it_fba_fees"] = Number(amazonResponseIT.fba_fee);
    doc["it_buybox_price"] = Number(amazonResponseIT.listingPrice);
    doc["it_ref_fees"] = Number(amazonResponseIT.ref_fee);
    doc["it_profit"] = amazonProfitIT;
    doc["it_roi"] = amazonROIIT;
    doc["it_sales_rank"] = amazonResponseIT.rank;
    // doc["fr_monthly_approx_sales"] = this.refs.uk_monthly_approx_sales.value;
    doc["it_keepa_90avg"] = ((keepaResponseIT.stats.avg90[0]) / 100).toFixed(2);
    // doc["uk_minprice"] = this.state.uk_minprice;
    // doc["uk_gpp15price"] = this.state.uk_gpp15price;


    doc["de_prime_price"] = (((keepaResponseDE.stats.current[0] != -1) ? keepaResponseDE.stats.current[0] : keepaResponseDE.stats.current[10]) / 100).toFixed(2);
    doc["de_fba_fees"] = Number(amazonResponseDE.fba_fee);
    doc["de_buybox_price"] = Number(amazonResponseDE.listingPrice);
    doc["de_ref_fees"] = Number(amazonResponseDE.ref_fee);
    doc["de_profit"] = amazonProfitDE;
    doc["de_roi"] = amazonROIDE;
    doc["de_sales_rank"] = amazonResponseDE.rank;
    // doc["fr_monthly_approx_sales"] = this.refs.uk_monthly_approx_sales.value;
    doc["de_keepa_90avg"] = ((keepaResponseDE.stats.avg90[0]) / 100).toFixed(2);
    // doc["uk_minprice"] = this.state.uk_minprice;
    // doc["uk_gpp15price"] = this.state.uk_gpp15price;


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;

    doc["created_date"] = today;
    doc["last_updated_date"] = today;
    doc["user_name"] = localStorage.getItem("Name");

    // if (!this.refs.Amazon_approval_yes.disabled) {

    //   if (this.state.selectedOptionAmz == "No") {
    //     errors["amz_approval"] = "Verification pending";
    //     emptyFlag = true;
    //   }


    // }

    console.log("Doc Object");
    console.log(doc);

    console.log(errors);
    // for(var i in errors)
    // alert(i + " is missing");

    //this.setState({ errors: errors });

    if (emptyFlag == false) {
      //  this.setState({ submit_status: 'submitted' });
     // var url = '/addStockData';
      var url = 'http://localhost:5000/addStockData';
      fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(doc)

        })

        .then(alert("Details Added !!"))
        .catch(function (res) { console.log(res) })

    }

  }
  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="General" />

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


          <Row>
            {/* {
            isLoading ? <div class="loading"></div> : <div></div>
          } */}

            <div className="container">
              <div className="row">
                <div className="col col-6">
                  <input type="text" className="btn-pill form-control" name="asin"
                    placeholder="Search here ..." onBlur={(e) => handleInput(e)}
                    onChange={(e) => setselectedASIN(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="product-details">
              <div className="container">
                <div className="row">
                  <div className="col col-4">
                    <div className="product-image">
                      {
                        (prodImg != "") ? <img src={prodImg} /> : <img src={require("../../../assets/images/default.png")} style={{ maxWidth: "280px" }} />
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
                                <form action="" className="sibling-buttons">
                                  <a href="#" className="tbl-button">
                                    <input type="radio" id="current" name="gender" value="current" defaultChecked="true" onChange={(e) => KeepaHistory(e)} />
                                    <label htmlFor="current">Current</label></a>

                                  <a href="#" className="tbl-button">
                                    <input type="radio" id="30" name="gender" value="30" onChange={(e) => KeepaHistory(e)} />
                                    <label htmlFor="30">30</label></a>

                                  <a href="#" className="tbl-button">
                                    <input type="radio" id="90" name="gender" value="90" onChange={(e) => KeepaHistory(e)} />
                                    <label htmlFor="90">90</label></a>

                                  <a href="#" className="tbl-button">
                                    <input type="radio" id="180" name="gender" value="180" onChange={(e) => KeepaHistory(e)} />
                                    <label htmlFor="180">180</label></a>

                                  <a href="#" className="tbl-button">
                                    <input type="radio" id="Average" name="gender" value="Average" onChange={(e) => KeepaHistory(e)} />
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
                            <input type="radio" id="DE" name="gender" value="DE" onChange={(e) => KeepaEvent(e)} />
                            <label htmlFor="DE"><img src="https://www.countryflags.io/DE/flat/64.png" /></label></a>

                          <a href="#" className="tbl-button">
                            <input type="radio" id="ES" name="gender" value="ES" onChange={(e) => KeepaEvent(e)} />
                            <label htmlFor="ES"><img src="https://www.countryflags.io/ES/flat/64.png" /></label></a>

                          <a href="#" className="tbl-button">
                            <input type="radio" id="FR" name="gender" value="FR" onChange={(e) => KeepaEvent(e)} />
                            <label htmlFor="FR"><img src="https://www.countryflags.io/FR/flat/64.png" /></label></a>

                          <a href="#" className="tbl-button">
                            <input type="radio" id="IT" name="gender" value="IT" onChange={(e) => KeepaEvent(e)} />
                            <label htmlFor="IT"><img src="https://www.countryflags.io/IT/flat/64.png" /></label></a>

                          <a href="#" className="tbl-button">
                            <input type="radio" id="GB" name="gender" value="GB" defaultChecked="true" onChange={(e) => KeepaEvent(e)} />
                            <label htmlFor="GB"><img src="https://www.countryflags.io/GB/flat/64.png" /></label></a>
                        </form>
                        <div className="graph-div">
                          {
                            (graphImg != "") ? <img src={graphImg} /> : <img src={require("../../../assets/images/graph.png")} />
                          }
                        </div>
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
                          <td>VAT</td>
                          <td width="80">
                            <select onChange={(e) => selectedVatOption(e)}>
                              <option>No VAT</option>
                              <option>20%</option>
                            </select></td>
                        </tr>
                        <tr>
                          <td>VAT Deu</td>
                          <td width="80">£ {vat}</td>
                        </tr>
                        <tr>
                          <td><b>Profit</b></td>
                          <td width="80"><b style={{ color: "#01a324" }}>£ {amazonProfitUK}</b></td>
                        </tr>
                        <tr>
                          <td><b>ROI</b></td>
                          <td width="80"><b style={{ color: "#01a324" }}>{amazonROIUK.toFixed(2)}%</b></td>
                        </tr>
                        {/* <tr>
                        <td>Profit Margin</td>
                        <td width="80">£ 5.00</td>
                      </tr>
                      <tr>
                        <td>Breakeven Sale Price</td>
                        <td width="80">£ 5.00</td>
                      </tr> */}
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
                          <td>{amazonROIDE.toFixed(2)}%</td>
                        </tr>
                        <tr>
                          <td><img src="https://www.countryflags.io/ES/shiny/64.png" /></td>
                          <td>{(amazonResponseES != null) ? (amazonResponseES.rank) : "-"}</td>
                          <td>{(amazonResponseES != null) ? (amazonResponseES.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                          <td>£ {amazonProfitES}</td>
                          <td style={{ color: "#01a324" }}>{amazonROIES.toFixed(2)}%</td>
                        </tr>
                        <tr>
                          <td><img src="https://www.countryflags.io/FR/shiny/64.png" /></td>
                          <td>{(amazonResponseFR != null) ? (amazonResponseFR.rank) : "-"}</td>
                          <td>{(amazonResponseFR != null) ? (amazonResponseFR.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                          <td>£ {amazonProfitFR}</td>
                          <td style={{ color: "#01a324" }}>{amazonROIFR.toFixed(2)}%</td>
                        </tr>
                        <tr>
                          <td><img src="https://www.countryflags.io/IT/shiny/64.png" /></td>
                          <td>{(amazonResponseIT != null) ? (amazonResponseIT.rank) : "-"}</td>
                          <td>{(amazonResponseIT != null) ? (amazonResponseIT.listingPrice) : "-"} <a href="#" className="purpel-btn">FBA</a></td>
                          <td>£ {amazonProfitIT}</td>
                          <td>{amazonROIIT.toFixed(2)}%</td>
                        </tr>
                        <tr>
                          <td><img src="https://www.countryflags.io/GB/shiny/64.png" /></td>
                          <td>{(amazonResponseUK != null) ? (amazonResponseUK.rank) : "-"}</td>
                          <td>{(amazonResponseUK != null) ? (amazonResponseUK.listingPrice) : "-"}</td>
                          <td>£ {amazonProfitUK}</td>
                          <td>{amazonROIUK.toFixed(2)}%</td>
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
                          {/* <td><b>Storage (Month)</b></td>
                          <td><div id="price-slider"><span className="cercul"></span></div></td> */}
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
                      <button className="purpel-btn"  onClick={(e) => addStockData(e)}>Add Product</button>
                      {/* <button className="purpel-btn">Inventory</button>
                      <button className="purpel-btn">Orders</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </LoadingOverlay>
      </Container>

    </Fragment>
  );
};

export default Stock;