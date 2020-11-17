import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Register from "../pages/authentication/register";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import man from "../assets/images/dashboard/user.png";
import app, {
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
} from "../data/base";

const StockManage = (props) => {
  const txtasin = React.createRef('');
  const txtbuying_price = React.createRef('');
  const txtvat = React.createRef('');
  const qty = React.createRef('');
  const prodImg=React.createRef('');
  const [asin, setAsin] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const [prod_code, setProd_Code] = useState("");
  const [uk_buybox_price, set_uk_buybox_price] = useState("");
  const [fr_buybox_price, set_fr_buybox_price] = useState("");
  const [de_buybox_price, set_de_buybox_price] = useState("");
  const [es_buybox_price, set_es_buybox_price] = useState("");
  const [it_buybox_price, set_it_buybox_price] = useState("");
  const [buying_price, set_buying_price] = useState("");
  const [uk_fba_fees, set_uk_fba_fees] = useState("");
  const [fba_ship_charges, set_fba_ship_charges] = useState("");
  const [uk_prime_price, set_uk_prime_price] = useState("");
  const [fr_fba_fees, set_fr_fba_fees] = useState(null);
  const [it_fba_fees, set_it_fba_fees] = useState(null);
  const [de_fba_fees, set_de_fba_fees] = useState(null);
  const [es_fba_fees, set_es_fba_fees] = useState(null);
  const [uk_ref_fees, set_uk_ref_fees] = useState("");
  const [fr_ref_fees, set_fr_ref_fees] = useState("");
  const [it_ref_fees, set_it_ref_fees] = useState("");
  const [de_ref_fees, set_de_ref_fees] = useState("");
  const [es_ref_fees, set_es_ref_fees] = useState("");
  const [ref_rate, set_ref_rate] = useState(0.15);
  const [fr_prime_price, set_fr_prime_price] = useState("");
  const [it_prime_price, set_it_prime_price] = useState("");
  const [de_prime_price, set_de_prime_price] = useState("");
  const [es_prime_price, set_es_prime_price] = useState("");
  const [eur_gbp, seteur_gbp] = useState(0.88);
  const [data_uri, set_data_uri] = useState(null);
  const [processing, set_processing] = useState(false);
  const [selectedOptionAmz, set_selectedOptionAmz] = useState("No");
  const [selectedValue, set_selectedValue] = useState("");
  const [order_status, set_order_status] = useState("Order in progress");
  const [reject_status, set_reject_status] = useState("");
  const [uk_monthly_approx_sales, set_uk_monthly_approx_sales] = useState("");
  const [fr_monthly_approx_sales, set_fr_monthly_approx_sales] = useState("");
  const [it_monthly_approx_sales, set_it_monthly_approx_sales] = useState("");
  const [de_monthly_approx_sales, set_de_monthly_approx_sales] = useState("");
  const [es_monthly_approx_sales, set_es_monthly_approx_sales] = useState("");
  const [uk_sales_rank, set_uk_sales_rank] = useState("");
  const [fr_sales_rank, set_fr_sales_rank] = useState("");
  const [it_sales_rank, set_it_sales_rank] = useState("");
  const [de_sales_rank, set_de_sales_rank] = useState("");
  const [es_sales_rank, set_es_sales_rank] = useState("");
  const [uk_keepa_90avg, set_uk_keepa_90avg] = useState("");
  const [fr_keepa_90avg, set_fr_keepa_90avg] = useState("");
  const [it_keepa_90avg, set_it_keepa_90avg] = useState("");
  const [de_keepa_90avg, set_de_keepa_90avg] = useState("");
  const [es_keepa_90avg, set_es_keepa_90avg] = useState("");
  const [selectedMarket, set_selectedMarket] = useState("");
  const [formattedValue, set_formattedValue] = useState("");
  const [uk_profit, set_uk_profit] = useState(0);
  const [fr_profit, set_fr_profit] = useState(0);
  const [it_profit, set_it_profit] = useState(0);
  const [de_profit, set_de_profit] = useState(0);
  const [es_profit, set_es_profit] = useState(0);
  const [uk_roi, set_uk_roi] = useState(0);
  const [fr_roi, set_fr_roi] = useState(0);
  const [it_roi, set_it_roi] = useState(0);
  const [de_roi, set_de_roi] = useState(0);
  const [es_roi, set_es_roi] = useState(0);
  const [category, set_category] = useState("");
  const [uk_minprice, set_uk_minprice] = useState(0);
  const [fr_minprice, set_fr_minprice] = useState(0);
  const [it_minprice, set_it_minprice] = useState(0);
  const [de_minprice, set_de_minprice] = useState(0);
  const [es_minprice, set_es_minprice] = useState(0);
  const [uk_gpp15price, set_uk_gpp15price] = useState(0);
  const [fr_gpp15price, set_fr_gpp15price] = useState(0);
  const [it_gpp15price, set_it_gpp15price] = useState(0);
  const [de_gpp15price, set_de_gpp15price] = useState(0);
  const [es_gpp15price, set_es_gpp15price] = useState(0);
  const [vat, set_vat] = useState("");
  const [submit_status, set_submit_status] = useState("");
  const [errors, set_errors] = useState({});
  const [wholesalers, set_wholesalers] = useState([]);
  const [uk_fba_seller_count, set_uk_fba_seller_count] = useState("");
  const [fr_fba_seller_count, set_fr_fba_seller_count] = useState("");
  const [it_fba_seller_count, set_it_fba_seller_count] = useState("");
  const [de_fba_seller_count, set_de_fba_seller_count] = useState("");
  const [es_fba_seller_count, set_es_fba_seller_count] = useState("");
  const [uk_recom_qty, set_uk_recom_qty] = useState("");
  const [show_recom, set_show_recom] = useState("");
  const [top_roi_mkt, set_top_roi_mkt] = useState("");
  const [top_roi, set_top_roi] = useState("");
  const [top_roi_mkt_sales, set_top_roi_mkt_sales] = useState("");
  const [top_sales_mkt, set_top_sales_mkt] = useState("");
  const [top_sales, set_top_sales] = useState("");
  const [top_sales_mkt_roi, set_top_sales_mkt_roi] = useState("");
  const [uk_done, set_uk_done] = useState("");
  const [fr_done, set_fr_done] = useState("");
  const [it_done, set_it_done] = useState("");
  const [de_done, set_de_done] = useState("");
  const [es_done, set_es_done] = useState("");
  const[fba_fees,set_fba_fees]=useState(0);

  useEffect(() => {
    onloadmethod()
  }, [wholesalers, eur_gbp]);

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
      var url = 'https://www.amazstock.com/getwholesalers'
      fetch(url)
        .then((response1) => {
          if (response1.status >= 400) {
            // throw new Error("Bad response from server");
          }
          return response1.json();
        })
        .then((data1) => {
          set_wholesalers(data1);
          console.log(wholesalers);
          // this.setState({wholesalers : data1});
        });
      //end here

    }
    catch (error) {
    }
  }
  const getRecommendations = () => {

    var asin = this.state.asin;
    var uk_sales = this.refs.uk_monthly_approx_sales.value;
    var uk_seller_count = this.state.uk_fba_seller_count;
    var uk_recom_qty = Math.ceil(uk_sales / (uk_seller_count + 1));
    set_uk_recom_qty(uk_recom_qty);
    // this.setState({
    //   uk_recom_qty : uk_recom_qty
    // });

    getROIRecommendations();
    this.updateOrderStatus();
  }

  const getROIRecommendations = () => {
    var uk_roi = 0;
    var fr_roi = 0;
    var it_roi = 0;
    var de_roi = 0;
    var es_roi = 0;
    if (this.state.uk_roi != '') {
      uk_roi = this.state.uk_roi;
      fr_roi = this.state.fr_roi;
      it_roi = this.state.it_roi;
      de_roi = this.state.de_roi;
      es_roi = this.state.es_roi;
    }
    var top_roi = Math.max(uk_roi, fr_roi, it_roi, de_roi, es_roi);
    var top_sales = Math.max(this.state.uk_monthly_approx_sales, this.state.fr_monthly_approx_sales, this.state.it_monthly_approx_sales, this.state.de_monthly_approx_sales, this.state.es_monthly_approx_sales);
    var top_roi_mkt = "";
    var top_sales_mkt = "";
    var top_roi_mkt_sales = "";
    var top_sales_mkt_roi = "";
    switch (true) {

      case uk_roi == top_roi:
        top_roi_mkt = "UK";
        top_roi_mkt_sales = this.state.uk_monthly_approx_sales;
        break;

      case fr_roi == top_roi:
        top_roi_mkt = "FR";
        top_roi_mkt_sales = this.state.fr_monthly_approx_sales;
        break;

      case it_roi == top_roi:
        top_roi_mkt = "IT";
        top_roi_mkt_sales = this.state.it_monthly_approx_sales;
        break;

      case de_roi == top_roi:
        top_roi_mkt = "DE";
        top_roi_mkt_sales = this.state.de_monthly_approx_sales;
        break;

      case es_roi == top_roi:
        top_roi_mkt = "ES";
        top_roi_mkt_sales = this.state.es_monthly_approx_sales;
        break;
    }

    switch (true) {
      case this.state.uk_monthly_approx_sales == top_sales:
        top_sales_mkt = "UK";
        top_sales_mkt_roi = uk_roi;
        break;

      case this.state.fr_monthly_approx_sales == top_sales:
        top_sales_mkt = "FR";
        top_sales_mkt_roi = fr_roi;
        break;

      case this.state.it_monthly_approx_sales == top_sales:
        top_sales_mkt = "IT";
        top_sales_mkt_roi = it_roi;
        break;

      case this.state.de_monthly_approx_sales == top_sales:
        top_sales_mkt = "DE";
        top_sales_mkt_roi = de_roi;
        break;

      case this.state.es_monthly_approx_sales == top_sales:
        top_sales_mkt = "ES";
        top_sales_mkt_roi = es_roi;
        break;
    }
    set_top_roi(top_roi);
    set_top_sales(top_sales);
    set_top_roi_mkt(top_roi_mkt);
    set_top_sales_mkt(top_sales_mkt);
    set_top_roi_mkt_sales(top_roi_mkt_sales);
    set_top_sales_mkt_roi(top_sales_mkt_roi);
    // this.setState({
    //   top_roi : top_roi,
    //   top_sales : top_sales,
    //   top_roi_mkt : top_roi_mkt,
    //   top_sales_mkt : top_sales_mkt,
    //   top_roi_mkt_sales : top_roi_mkt_sales,
    //   top_sales_mkt_roi : top_sales_mkt_roi
    // },this.toggleRecomDivDisplay)

  }

  const populateEuroFields = (ref_rate) => {
    var asin = this.state.asin;
    var url_fr = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=4&asin=' + asin + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
    fetch(url_fr)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var fr_prime_price = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
        set_fr_buybox_price(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));
        set_fr_prime_price(fr_prime_price);
        set_fr_fba_fees(data.products[0].fbaFees === null ? 0 : ((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax) / 100).toFixed(2));
        set_fr_sales_rank(data.products[0].stats.current[3]);
        set_fr_keepa_90avg(((data.products[0].stats.avg90[18]) / 100).toFixed(2));
        set_fr_fba_seller_count(data.products[0].stats.offerCountFBA);
        set_fr_done('success');
      });
    var url_it = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=8&asin=' + asin + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
    fetch(url_it)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        var it_prime_price = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
        set_it_buybox_price(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));
        set_it_prime_price(it_prime_price);
        set_it_fba_fees(data.products[0].fbaFees === null ? 0 : ((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax) / 100).toFixed(2));
        set_it_sales_rank(data.products[0].stats.current[3]);
        set_it_keepa_90avg(((data.products[0].stats.avg90[18]) / 100).toFixed(2));
        set_it_fba_seller_count(data.products[0].stats.offerCountFBA);
        set_it_done('success');
      });
    var url_de = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=3&asin=' + asin + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
    fetch(url_de)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var de_prime_price = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
        set_de_buybox_price(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));
        set_de_prime_price(de_prime_price);
        set_de_fba_fees(data.products[0].fbaFees === null ? 0 : ((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax) / 100).toFixed(2));
        set_de_sales_rank(data.products[0].stats.current[3]);
        set_de_keepa_90avg(((data.products[0].stats.avg90[18]) / 100).toFixed(2));
        set_de_fba_seller_count(data.products[0].stats.offerCountFBA);
        set_de_done('success');
      });


    var url_es = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=9&asin=' + asin + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
    fetch(url_es)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        var es_prime_price = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
        set_es_buybox_price(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));
        set_es_prime_price(es_prime_price);
        set_es_fba_fees(data.products[0].fbaFees === null ? 0 : ((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax) / 100).toFixed(2));
        set_es_sales_rank(data.products[0].stats.current[3]);
        set_es_keepa_90avg(((data.products[0].stats.avg90[18]) / 100).toFixed(2));
        set_es_fba_seller_count(data.products[0].stats.offerCountFBA);
        set_es_done('success');
      });
  }
  const calcProfit = (e) => {
    var buy_pr = this.refs.buying_price.value;
    var vat = (this.refs.vat.value * this.refs.buying_price.value).toFixed(2);
    set_vat(vat);
    console.log("calcprofit vat:" + vat);
    var fba_fees = this.refs.uk_fba_fees.value;
    var fba_ship = this.refs.fba_ship_charges.value;
    var uk_prime = this.refs.uk_prime_price.value;
    var uk_ref_fees = uk_prime * this.state.ref_rate;
    if (buy_pr >= 0 && fba_fees >= 0 && fba_ship >= 0 && uk_prime >= 0) {
      var tot = Number(buy_pr) + Number(vat) + Number(fba_ship);
      var pft = (Number(uk_prime) - tot - Number(fba_fees) - Number(uk_ref_fees)).toFixed(2);
      //var minprice_gpp15 = 1.18*(tot+ Number(fba_fees)+Number(uk_ref_fees));
      var roi = (pft / tot * 100).toFixed(2);
      var fba_fee_rate = fba_fees / uk_prime;
      var minprice = calcMinPrice(tot, fba_fee_rate);
      var gpp15price = calcGPP15Price(tot, fba_fee_rate);
      set_uk_profit(pft);
      set_uk_roi(roi);
      set_uk_minprice(Number(minprice).toFixed(2));
      set_uk_gpp15price(Number(gpp15price).toFixed(2));
    }

  }

  const calcMinPrice = (tot, fba_fee_rate) => {
    var minprice = (tot * 1.15) / (1 - fba_fee_rate - this.state.ref_rate);

    if (this.state.category == "Personal_Care2") {
      //ref rate 0.08 for prime price<=10
      var minprice1 = (tot * 1.15) / (1 - fba_fee_rate - 0.08);
      if (minprice1 <= 10)
        minprice = minprice1;
    }

    console.log(minprice);
    return minprice;
  }

  const calcGPP15Price = (tot, fba_fee_rate) => {
    var npp = tot / (0.85 - fba_fee_rate - this.state.ref_rate);
    if (this.state.category == "Personal_Care2") {
      //ref rate 0.08 for prime price<=10
      var npp1 = tot / (0.85 - fba_fee_rate - 0.08);
      if (npp1 <= 10)
        npp = npp1;
    }

    console.log(npp);
    return npp;
  }
  const calcProfitEU = (e) => {
    console.log(eur_gbp);
    var buy_pr = this.refs.buying_price.value;
    var fba_ship = this.refs.fba_ship_charges.value;
    var vat = this.refs.vat.value * buy_pr;
    var tot = Number(buy_pr) + Number(vat) + Number(fba_ship);
    var eur_gbp = eur_gbp;

    var fr_prime_price = this.refs.fr_prime_price.value;
    var fr_fba_fees = this.refs.fr_fba_fees.value;
    var fr_ref_fees = fr_prime_price * this.refs.ref_rate;

    if (fr_prime_price >= 0) {
      var pft = (Number(fr_prime_price * eur_gbp) - tot - Number(fr_fba_fees * eur_gbp) - Number(fr_ref_fees * eur_gbp)).toFixed(2);
      var rtni = (pft / tot * 100).toFixed(2);
      var fr_fba_fee_rate = fr_fba_fees / fr_prime_price;

      var fr_minprice = this.calcMinPrice(tot, fr_fba_fee_rate);

      var fr_gpp15price = this.calcGPP15Price(tot, fr_fba_fee_rate);


      //converting to euro
      fr_minprice = fr_minprice / eur_gbp;
      fr_gpp15price = fr_gpp15price / eur_gbp;

      set_fr_profit(pft);
      set_fr_roi(rtni);
      set_fr_minprice(fr_minprice.toFixed(2));
      set_fr_gpp15price(fr_gpp15price.toFixed(2));

    }


    var it_prime_price = this.refs.it_prime_price.value;
    var it_fba_fees = this.refs.it_fba_fees.value;
    var it_ref_fees = it_prime_price * this.state.ref_rate;

    if (it_prime_price >= 0) {
      var pft = (Number(it_prime_price * eur_gbp) - tot - Number(it_fba_fees * eur_gbp) - Number(it_ref_fees * eur_gbp)).toFixed(2);
      var rtni = (pft / tot * 100).toFixed(2);
      var it_fba_fee_rate = it_fba_fees / it_prime_price;

      //var it_minprice = ((tot*1.15)/((1-it_fba_fee_rate)*eur_gbp)).toFixed(2);

      var it_minprice = this.calcMinPrice(tot, it_fba_fee_rate);

      var it_gpp15price = this.calcGPP15Price(tot, it_fba_fee_rate);

      //converting to euro
      it_minprice = it_minprice / eur_gbp;
      it_gpp15price = it_gpp15price / eur_gbp;

      set_it_profit(pft);
      set_it_roi(rtni);
      set_it_minprice(it_minprice.toFixed(2));
      set_it_gpp15price(it_gpp15price.toFixed(2));
    }

    var de_prime_price = this.refs.de_prime_price.value;
    var de_fba_fees = this.refs.de_fba_fees.value;
    var de_ref_fees = de_prime_price * this.state.ref_rate;

    if (de_prime_price >= 0) {
      var pft = (Number(de_prime_price * eur_gbp) - tot - Number(de_fba_fees * eur_gbp) - Number(de_ref_fees * eur_gbp)).toFixed(2);
      var rtni = (pft / tot * 100).toFixed(2);
      var de_fba_fee_rate = de_fba_fees / de_prime_price;
      //var de_minprice = ((tot*1.15)/((1-de_fba_fee_rate)*eur_gbp)).toFixed(2);

      var de_minprice = this.calcMinPrice(tot, de_fba_fee_rate);

      var de_gpp15price = this.calcGPP15Price(tot, de_fba_fee_rate);

      //converting to euro
      de_minprice = de_minprice / eur_gbp;
      de_gpp15price = de_gpp15price / eur_gbp;
      set_de_profit(pft);
      set_de_roi(rtni);
      set_de_minprice(de_minprice.toFixed(2));
      set_de_gpp15price(de_gpp15price.toFixed(2));
    }

    var es_prime_price = this.refs.es_prime_price.value;
    var es_fba_fees = this.refs.es_fba_fees.value;
    var es_ref_fees = es_prime_price * this.state.ref_rate;

    if (es_prime_price >= 0) {
      var pft = (Number(es_prime_price * eur_gbp) - tot - Number(es_fba_fees * eur_gbp) - Number(es_ref_fees * eur_gbp)).toFixed(2);
      var rtni = (pft / tot * 100).toFixed(2);
      var es_fba_fee_rate = es_fba_fees / es_prime_price;

      //var es_minprice = ((tot*1.15)/((1-es_fba_fee_rate)*eur_gbp)).toFixed(2);

      var es_minprice = this.calcMinPrice(tot, es_fba_fee_rate);

      var es_gpp15price = this.calcGPP15Price(tot, es_fba_fee_rate);

      //converting to euro
      es_minprice = es_minprice / eur_gbp;
      es_gpp15price = es_gpp15price / eur_gbp;

      set_es_profit(pft);
      set_es_roi(rtni);
      set_es_minprice(es_minprice.toFixed(2));
      set_es_gpp15price(es_gpp15price.toFixed(2));
      getRecomOnROIChange();

    }
  }
  const getRecomOnROIChange = () => {
    if (uk_monthly_approx_sales != "") {
      getRecommendations();
    }
  }
  const handleInput = (e) => {
    // alert(e.target.value);
    switch (e.target.name) {
      case 'asin':
        var ref_rate = 0.15;
        if (asin != '') {
          var url_uk = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + e.target.value + '&offers=20&fbafees=1&rating=1&stats=180&history=0'
          fetch(url_uk)
            .then((response) => {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              prodImg.style.display = 'block';
              //console.log((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10]);
              var uk_prime_price = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
              if (data.products[0].binding == 'Personal Care') {
                if (uk_prime_price <= 10)
                  ref_rate = 0.08;
                else {
                  ref_rate = 0.15;
                  set_category("Personal_Care2");
                  //this.setState({ category: "Personal_Care2" })
                }
              }

              else if (['Toy', 'Watch', 'Video Game'].indexOf(data.products[0].binding) >= 0) {
                ref_rate = 0.15;
              }

              else if (data.products[0].binding == 'Electronics') {
                ref_rate = 0.12;
              }
              setTitle(data.products[0].title);
              setProd_Code("ean-" + data.products[0].ean + "-upc-" + data.products[0].upc + "-mpn-" + data.products[0].mpn);
              set_uk_buybox_price(((data.products[0].stats.buyBoxPrice) / 100).toFixed(2));
              set_uk_prime_price(uk_prime_price);
              set_uk_fba_fees(data.products[0].fbaFees === null ? 0 : ((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax) / 100).toFixed(2));
              set_uk_sales_rank(data.products[0].stats.current[3]);
              set_uk_keepa_90avg(((data.products[0].stats.avg90[18]) / 100).toFixed(2));
              set_uk_fba_seller_count(data.products[0].stats.offerCountFBA);;
              setImg("https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0]);
              set_uk_done('success');
              populateEuroFields(ref_rate);

            });
        }

        break;

      case 'buying_price':
        set_buying_price(e.target.value);
        break;
      case 'vat':
        var vat = e.target.value * buying_price;
        set_vat(vat.toFixed(2));
        console.log("calculated vat:" + vat);
        break;
      case 'uk_prime_price':
        set_uk_prime_price(e.target.value);
        break;
      case 'fba_fees':
        set_fba_fees(e.target.value);
        break;
      case 'fba_ship_charges':
        set_fba_ship_charges(e.target.value);
        break;
      case 'fr_fba_fees':
        set_fr_fba_fees(e.target.value);
        break;
      case 'it_fba_fees':
        set_it_fba_fees(e.target.value);
        break;
      case 'de_fba_fees':
        set_de_fba_fees(e.target.value);
        break;
      case 'es_fba_fees':
        set_es_fba_fees(e.target.value);
        break;
      case 'fr_prime_price':
        set_fr_prime_price(e.target.value);
        break;
      case 'it_prime_price':
        set_it_prime_price(e.target.value);
        break;
      case 'de_prime_price':
        set_de_prime_price(e.target.value);
        break;
      case 'es_prime_price':
        set_es_prime_price(e.target.value);
        break;
      case 'es_monthly_approx_sales':
        getRecommendations();
        break;
      default:
    }
    if(uk_prime_price!=''){
    calcProfit(e);
    calcProfitEU(e);
    }

  }
 const handleOptionChange=(e)=>{
    if(e.target.value == "Amz_No")
    set_selectedOptionAmz("No");
    //   this.setState({
    //    selectedOptionAmz: "No"
    // })
   else if(e.target.value == "Amz_Yes")
   set_selectedOptionAmz("Yes");
  }
  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/*  <!-- login page start--> */}



        <table className="table" style={{ float: "left", width: "1000px", border: "1px 1px 1px solid silver" }}>
          <br /><br />
          <tr><td style={{ width: "200px" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>ASIN</label> </td>
            <td style={{ paddingBottom: "1em", width: "200px" }}>
              <input type="text" className="form-control" maxLength="100"  name="asin"
                value={asin} onChange={(e) => setAsin(e.target.value)} onBlur={(e) => handleInput(e)} />
            </td>
            <td style={{ paddingBottom: "1em" }}>         <label style={{ color: "#1D1D1D", display: "inline-block", width: "400px" }}>{title}</label></td>

          </tr><tr></tr>
          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>Buying Price</label> </td><td style={{ paddingBottom: "1em" }}>
            <input type="number" className="form-control" maxLength="100" name="buying_price" ref={txtbuying_price}
              value={buying_price} onChange={(e) => set_buying_price(e.target.value)}
              disabled={uk_done == 'success' && fr_done == 'success' && it_done == 'success' && de_done == 'success' && es_done == 'success' ? false : true} onBlur={(e) => handleInput(e)} />
          </td><span style={{ color: "red", paddingLeft: "1em", display: "inline-block", width: "250px", fontSize: "12px" }}>{errors["buying_price"]}</span></tr><tr></tr>

          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>VAT</label> </td><td style={{ paddingBottom: "1em" }}> <span>
            <select id="vat"
              className="form-control"
              defaultValue=" "
              style={{ width: "170px" }}
              onChange={(e) => handleInput(e)} ref={txtvat} name="vat">
              <option value="0.2">20%</option>
              <option value="0">No VAT</option>
            </select>
          </span> </td></tr><tr></tr>

          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>Order Quantity</label> </td><td style={{ paddingBottom: "1em" }}>
            <input type="number" className="form-control" maxLength="100" ref={qty} disabled={reject_status} />
          </td>
            <span style={{ color: "red", paddingLeft: "1em", display: "inline-block", width: "250px", fontSize: "12px" }}>
              {errors["qty"]}</span>
          </tr><tr></tr>

          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>Product Code (UPC/EAN/Others)</label> </td><td style={{ paddingBottom: "1em" }}>
            <textarea ref="prod_code" disabled={reject_status} value={prod_code} onChange={(e) => setProd_Code(e.target.value)} /></td><span style={{ color: "red", paddingLeft: "1em", display: "inline-block", width: "250px", fontSize: "12px" }}>{errors["prod_code"]}</span>
          </tr><tr></tr>

          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>Wholesalers</label>  </td>
            <td style={{ paddingBottom: "1em" }}> <span>


              <select id="SelectWholeSalers"
                className="form-control"
                style={{ width: "170px" }}
                onChange={e => set_selectedValue(e.target.value)}>
                <option value="Select">Select Wholesalers</option>
                <option value="Test1">TestWholesaler1</option>
                <option value="Test2">TestWholesaler2</option>
                {wholesalers.map(item => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </span> </td> <span style={{ color: "red", paddingLeft: "1em", display: "inline-block", width: "250px", fontSize: "12px" }}>{errors["wholesalers"]}</span></tr>

          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "120px" }}>Order Status</label> </td><td style={{ paddingBottom: "1em" }}><input type="text" className="form-control" maxLength="100" ref="order_status" value={order_status} onChange={(e) => set_order_status(e.target.value)} /></td></tr><tr></tr>


          <tr><td style={{ paddingBottom: "1em" }}><label style={{ color: "#1D1D1D", display: "inline-block", width: "200px" }}>Shipping Charges</label> </td>
            <td style={{ paddingBottom: "1em" }}>
              <input type="number" className="form-control" maxLength="100" name="fba_ship_charges"
                ref={fba_ship_charges} onChange={(e) => set_fba_ship_charges(e.target.value)} onBlur={(e) => handleInput(e)} /></td><span style={{ color: "red", paddingLeft: "1em", display: "inline-block", width: "250px", fontSize: "12px" }}>{errors["fba_ship_charges"]}</span> </tr><tr></tr>

          <tr>
            <td>
              <label>Amazon Listing approval verified?</label>
            </td>
            <td>
              <input type="radio" style={{ marginRight: "10px" }} value="Amz_Yes" ref="Amazon_approval_yes" checked={set_selectedOptionAmz("Yes")}  onChange={(e) => handleOptionChange(e)} disabled={reject_status} />Yes
              <div style={{ width: "10px", height: "10px" }} />
              <input type="radio" style={{ marginRight: "10px" }} value="Amz_No" ref="Amazon_approval_no" checked={set_selectedOptionAmz("No")} onChange={(e) => handleOptionChange(e)} disabled={reject_status} />No
              </td>
            <td>
              <span style={{ color: "red", paddingLeft: "1em", display: "inline-block", fontSize: "12px", width: "250px" }}>{errors["amz_approval"]}</span>
            </td>
          </tr>

        </table>


        <table id="addstockMktTbl" className="table" className="col-sm-6" style={{ backgroundColor: "#FAFAFA", borderLeft: "10px solid #FAFAFA", fontSize: "12px" }}>
          <br />
          <tr style={{ backgroundColor: "#14C2AD", color: "white" }}>
            <td style={{ width: "500px" }}>Market Place</td>
            <td style={{ textAlign: "center" }}>UK</td>
            <td style={{ textAlign: "center" }}>FR</td>
            <td style={{ textAlign: "center" }}>IT</td>
            <td style={{ textAlign: "center" }}>DE</td>
            <td style={{ textAlign: "center" }}>ES</td>
          </tr>
          <br />
          <tr><td>Prime Price</td>
            <td><input type="number" name="uk_prime_price" ref={uk_prime_price} defaultValue={uk_prime_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_prime_price" ref={fr_prime_price} defaultValue={fr_prime_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_prime_price" ref={it_prime_price} defaultValue={it_prime_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_prime_price" ref={de_prime_price} defaultValue={de_prime_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_prime_price" ref={es_prime_price} defaultValue={es_prime_price} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>BuyBox Price</td>
            <td><input type="number" name="uk_buybox_price" ref={uk_buybox_price} value={uk_buybox_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_buybox_price" ref={fr_buybox_price} value={fr_buybox_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_buybox_price" ref={it_buybox_price} value={it_buybox_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_buybox_price" ref={de_buybox_price} value={de_buybox_price} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_buybox_price" ref={es_buybox_price} value={es_buybox_price} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>FBA Fees</td>
            <td><input type="number" name="uk_fba_fees" ref={uk_fba_fees} defaultValue={uk_fba_fees} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_fba_fees" ref={fr_fba_fees} defaultValue={fr_fba_fees} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_fba_fees" ref={it_fba_fees} defaultValue={it_fba_fees} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_fba_fees" ref={de_fba_fees} defaultValue={de_fba_fees} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_fba_fees" ref={es_fba_fees} defaultValue={es_fba_fees} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>Referral Fees</td>
            <td><input type="number" name="uk_ref_fees" ref={uk_ref_fees} value={(uk_prime_price > 0 ? uk_prime_price * ref_rate : 0).toFixed(2)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_ref_fees" ref={fr_ref_fees} value={(fr_prime_price > 0 ? fr_prime_price * ref_rate : 0).toFixed(2)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_ref_fees" ref={it_ref_fees} value={(it_prime_price > 0 ? it_prime_price * ref_rate : 0).toFixed(2)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_ref_fees" ref={de_ref_fees} value={(de_prime_price > 0 ? de_prime_price * ref_rate : 0).toFixed(2)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_ref_fees" ref={es_ref_fees} value={(es_prime_price > 0 ? es_prime_price * ref_rate : 0).toFixed(2)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>Profit</td>
            <td><input type="number" name="uk_profit" ref={uk_profit} value={uk_profit} onChange={(e) => set_uk_profit(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_profit" ref={fr_profit} value={fr_profit} onChange={(e) => set_fr_profit(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_profit" ref={it_profit} value={it_profit} onChange={(e) => set_it_profit(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_profit" ref={de_profit} value={de_profit} onChange={(e) => set_de_profit(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_profit" ref={es_profit} value={es_profit} onChange={(e) => set_es_profit(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>ROI</td>
            <td><input type="number" name="uk_roi" ref={uk_roi} value={uk_roi} onChange={(e) => set_uk_roi(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_roi" ref={fr_roi} value={fr_roi} onChange={(e) => set_fr_roi(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_roi" ref={it_roi} value={it_roi} onChange={(e) => set_it_roi(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_roi" ref={de_roi} value={de_roi} onChange={(e) => set_de_roi(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_roi" ref={es_roi} value={es_roi} onChange={(e) => set_es_roi(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>Min Price(15% ROI)</td>
            <td><input type="number" name="uk_minprice" ref={uk_minprice} value={uk_minprice} onChange={(e) => set_uk_minprice(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_minprice" ref={fr_minprice} value={fr_minprice} onChange={(e) => set_fr_minprice(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_minprice" ref={it_minprice} value={it_minprice} onChange={(e) => set_it_minprice(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_minprice" ref={de_minprice} value={de_minprice} onChange={(e) => set_de_minprice(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_minprice" ref={es_minprice} value={es_minprice} onChange={(e) => set_es_minprice(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>GPP 15% Price</td>
            <td><input type="number" name="uk_gpp15price" ref={uk_gpp15price} value={uk_gpp15price} onChange={(e) => set_uk_gpp15price(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_gpp15price" ref={fr_gpp15price} value={fr_gpp15price} onChange={(e) => set_fr_gpp15price(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_gpp15price" ref={it_gpp15price} value={it_gpp15price} onChange={(e) => set_it_gpp15price(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_gpp15price" ref={de_gpp15price} value={de_gpp15price} onChange={(e) => set_de_gpp15price(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_gpp15price" ref={es_gpp15price} value={es_gpp15price} onChange={(e) => set_es_gpp15price(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />

          <tr><td>Sales Rank</td>
            <td><input type="number" name="uk_sales_rank" ref={uk_sales_rank} value={uk_sales_rank} onChange={(e) => set_uk_sales_rank(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_sales_rank" ref={fr_sales_rank} value={fr_sales_rank} onChange={(e) => set_fr_sales_rank(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_sales_rank" ref={it_sales_rank} value={it_sales_rank} onChange={(e) => set_it_sales_rank(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_sales_rank" ref={de_sales_rank} value={de_sales_rank} onChange={(e) => set_de_sales_rank(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_sales_rank" ref={es_sales_rank} value={es_sales_rank} onChange={(e) => set_es_sales_rank(e.target.value)} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>Monthly approx. sales</td>
            <td><input type="number" name="uk_monthly_approx_sales" ref={uk_monthly_approx_sales} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="fr_monthly_approx_sales" ref={fr_monthly_approx_sales} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="it_monthly_approx_sales" ref={it_monthly_approx_sales} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="de_monthly_approx_sales" ref={de_monthly_approx_sales} onBlur={(e) => handleInput(e)} /></td>
            <td><input type="number" name="es_monthly_approx_sales" ref={es_monthly_approx_sales} onBlur={(e) => handleInput(e)} /></td>
          </tr>
          <br />
          <tr><td>Keepa 90days Avg</td>
            <td><input type="number" name="uk_keepa_90avg" ref={uk_keepa_90avg} value={uk_keepa_90avg} /></td>
            <td><input type="number" name="fr_keepa_90avg" ref={fr_keepa_90avg} value={fr_keepa_90avg} /></td>
            <td><input type="number" name="it_keepa_90avg" ref={it_keepa_90avg} value={it_keepa_90avg} /></td>
            <td><input type="number" name="de_keepa_90avg" ref={de_keepa_90avg} value={de_keepa_90avg} /></td>
            <td><input type="number" name="es_keepa_90avg" ref={es_keepa_90avg} value={es_keepa_90avg} /></td>
          </tr>
          <br />
          <tr><td>Prime Seller Count</td>
            <td><input type="number" name="uk_fba_seller_count" ref={uk_fba_seller_count} value={uk_fba_seller_count} /></td>
            <td><input type="number" name="fr_fba_seller_count" ref={fr_fba_seller_count} value={fr_fba_seller_count} /></td>
            <td><input type="number" name="it_fba_seller_count" ref={it_fba_seller_count} value={it_fba_seller_count} /></td>
            <td><input type="number" name="de_fba_seller_count" ref={de_fba_seller_count} value={de_fba_seller_count} /></td>
            <td><input type="number" name="es_fba_seller_count" ref={es_fba_seller_count} value={es_fba_seller_count} /></td>
          </tr>
          <br />
        </table>

        <div ref="recomdiv" className="col-sm-5" style={{ marginLeft: "20px", padding: "15px", lineHeight: "15px", boxShadow: "1px 2px 2px 3px silver", backgroundColor: "white", display: "none" }}>
          <p style={{ color: "#0A3971", letterSpacing: "3px", fontSize: "15px" }}>Recommendation & Inference</p>

          <table id="recomTbl" className="table" style={{ borderCollapse: "collapse", fontSize: "13px" }}>
            <br />
            <tr>
              <td style={{ width: "500px" }}>Recommended quantity for a Month<br />(Based on current no# of prime sellers)</td>
              <td style={{ width: "50px" }} />
              <td>{uk_recom_qty}</td>
            </tr>
            <br />
            <tr>
              <td>Max ROI, Market, Sales</td>
              <td style={{ width: "50px" }} />
              <td>{Math.round(Number(top_roi))}{"%, "}{top_roi_mkt}{", "}{top_roi_mkt_sales}</td>
            </tr>
            <br />
            <tr>
              <td>Max Sales, Market, ROI</td>
              <td style={{ width: "50px" }} />
              <td>{top_sales}{", "}{top_sales_mkt}{", "}{Math.round(Number(top_sales_mkt_roi))}{"%"}</td>
            </tr>
          </table>

        </div>

        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <button  style={{ marginLeft: "auto", marginRight: "auto", display: "block", letterSpacing: "2px", fontSize: "18px", backgroundColor: "#F37063", height: "40px", border: "none" }} className="btn btn-primary" >Add Stock Data</button>

          <img ref={prodImg} style={{ marginLeft: "auto", marginRight: "auto", marginTop: "50px", display: "none", height: "300px", boxShadow: "5px 5px 5px 5px silver", border: "none" }} src={img} />

        </div>





      </Container>
    </div>
  );
};

export default StockManage;
