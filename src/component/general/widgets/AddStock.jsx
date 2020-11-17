import React from 'react';
  import Loader from "../../common/loader/loader";
import Header from "../../common/header/header";
import Sidebar from "../../common/sidebar/sidebar";
import Rightsidebar from "../../common/sidebar/rightsidebar";
import Footer from "../../common/footer/footer";
import ThemeCustomize from "../../common/theme-customizer/themeCustomize";
import { ToastContainer } from "react-toastify";
//  import bookmark from '../component/common/header/bookmark';
import {connect} from 'react-redux';
import {bindAll} from 'lodash';
import  {Fragment} from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

//var DatePicker = require("react-bootstrap-date-picker");

class AddStock extends React.Component {

  constructor() {
    super();

    var value=''
    this.state = {
      asin:'',
      title: '',
      img: '',
	 prod_code: '',
      uk_buybox_price: '',
      buying_price: '',
      uk_fba_fees: '',
      fba_ship_charges: '',
      uk_prime_price: '',
      fr_fba_fees: null,
      it_fba_fees: null,
      de_fba_fees: null,
      es_fba_fees: null,
      uk_ref_fees : '',
      fr_ref_fees : '',
      it_ref_fees : '',
      de_ref_fees : '',
      es_ref_fees : '',
      ref_rate : 0.15,
      fr_prime_price: '',
      it_prime_price: '',
      de_prime_price: '',
      es_prime_price: '',
      eur_gbp: 0.88,
      data_uri: null,
      processing: false,
      selectedOptionAmz:'No',
      value: value,
      selectedValue:'',
      order_status:'Order in progress',
      reject_status:'',
      uk_monthly_approx_sales:'',
      fr_monthly_approx_sales:'',
      it_monthly_approx_sales:'',
      de_monthly_approx_sales:'',
      es_monthly_approx_sales:'',
      uk_sales_rank:'',
      fr_sales_rank:'',
      it_sales_rank:'',
      de_sales_rank:'',
      es_sales_rank:'',
      uk_keepa_90avg: '',
      fr_keepa_90avg: '',
      it_keepa_90avg: '',
      de_keepa_90avg: '',
      es_keepa_90avg: '',
      selectedMarket:'',
      formattedValue: " ",
      uk_profit: 0,
      fr_profit: 0,
      it_profit: 0,
      de_profit: 0,
      es_profit: 0,
      uk_roi:0,
      fr_roi:0,
      it_roi:0,
      de_roi:0,
      es_roi:0,
      category : '',
      uk_minprice:0,
      fr_minprice:0,
      it_minprice:0,
      de_minprice:0,
      es_minprice:0,
      uk_gpp15price:0,
      fr_gpp15price:0,
      it_gpp15price:0,
      de_gpp15price:0,
      es_gpp15price:0,
      vat:'',
      submit_status:'',
      errors: {},
      wholesalers:[],
      uk_fba_seller_count: '',
      fr_fba_seller_count: '',
      it_fba_seller_count: '',
      de_fba_seller_count: '',
      es_fba_seller_count: '',
      uk_recom_qty: '',
      show_recom : '',
      top_roi_mkt :'',
      top_roi : '',
      top_roi_mkt_sales : '',
      top_sales_mkt : '',
      top_sales : '',
      top_sales_mkt_roi : '',
      uk_done : '',
      fr_done : '',
      it_done : '',
      de_done : '',
      es_done : ''


    }


      bindAll(this, 'handleOptionChange','handleSelectChange','calcProfit','calcProfitEU','addStockData','handleInput','updateOrderStatus','getRecommendations','getROIRecommendations','toggleRecomDivDisplay','getRecomOnROIChange','populateEuroFields','calcMinPrice');
  }

  componentWillMount(){
    var cur_url = 'https://api.exchangeratesapi.io/latest?symbols=GBP'
    fetch(cur_url)
    .then((response)=> {
      if (response.status >= 400) {
        // throw new Error("Bad response from server");
      }
    return response.json();
    })
      .then((data) => {
       this.setState({eur_gbp : data.rates.GBP},
       ()=>console.log(this.state.eur_gbp));
     });

      var url = '/getWholesalers'
      //var url = 'http://localhost:8081/getWholesalers'
      fetch(url)
      .then((response1)=> {
        if (response1.status >= 400) {
          // throw new Error("Bad response from server");
        }
      return response1.json();
      })
        .then((data1) => {
          this.setState({wholesalers : data1});
        });
}



    getRecommendations() {

      var asin = this.state.asin;
      var uk_sales = this.refs.uk_monthly_approx_sales.value;
      var uk_seller_count = this.state.uk_fba_seller_count;
      var uk_recom_qty = Math.ceil(uk_sales/(uk_seller_count+1));
      this.setState({
        uk_recom_qty : uk_recom_qty
      });

    this.getROIRecommendations();
    this.updateOrderStatus();
}

getROIRecommendations(){
  var uk_roi = 0;
  var fr_roi = 0;
  var it_roi = 0;
  var de_roi = 0;
  var es_roi = 0;
  if(this.state.uk_roi!=''){
    uk_roi = this.state.uk_roi;
    fr_roi = this.state.fr_roi;
    it_roi = this.state.it_roi;
    de_roi = this.state.de_roi;
    es_roi = this.state.es_roi;
  }
  var top_roi = Math.max(uk_roi,fr_roi,it_roi,de_roi,es_roi);
  var top_sales = Math.max(this.state.uk_monthly_approx_sales,this.state.fr_monthly_approx_sales,this.state.it_monthly_approx_sales,this.state.de_monthly_approx_sales,this.state.es_monthly_approx_sales);
  var top_roi_mkt = "";
  var top_sales_mkt = "";
  var top_roi_mkt_sales = "";
  var top_sales_mkt_roi = "";
  switch(true){

    case uk_roi== top_roi:
      top_roi_mkt = "UK";
      top_roi_mkt_sales = this.state.uk_monthly_approx_sales;
      break;

    case fr_roi==top_roi:
      top_roi_mkt = "FR";
      top_roi_mkt_sales = this.state.fr_monthly_approx_sales;
      break;

    case it_roi==top_roi:
      top_roi_mkt = "IT";
      top_roi_mkt_sales = this.state.it_monthly_approx_sales;
      break;

    case de_roi==top_roi:
      top_roi_mkt = "DE";
      top_roi_mkt_sales = this.state.de_monthly_approx_sales;
      break;

    case es_roi==top_roi:
      top_roi_mkt = "ES";
      top_roi_mkt_sales = this.state.es_monthly_approx_sales;
      break;
  }

  switch(true){
    case this.state.uk_monthly_approx_sales== top_sales:
      top_sales_mkt = "UK";
      top_sales_mkt_roi = uk_roi;
      break;

    case this.state.fr_monthly_approx_sales== top_sales:
      top_sales_mkt = "FR";
      top_sales_mkt_roi = fr_roi;
      break;

    case this.state.it_monthly_approx_sales== top_sales:
      top_sales_mkt = "IT";
      top_sales_mkt_roi = it_roi;
      break;

    case this.state.de_monthly_approx_sales== top_sales:
      top_sales_mkt = "DE";
      top_sales_mkt_roi = de_roi;
      break;

    case this.state.es_monthly_approx_sales== top_sales:
      top_sales_mkt = "ES";
      top_sales_mkt_roi = es_roi;
      break;
  }

  this.setState({
    top_roi : top_roi,
    top_sales : top_sales,
    top_roi_mkt : top_roi_mkt,
    top_sales_mkt : top_sales_mkt,
    top_roi_mkt_sales : top_roi_mkt_sales,
    top_sales_mkt_roi : top_sales_mkt_roi
  },this.toggleRecomDivDisplay)
}

toggleRecomDivDisplay(){
  this.refs.recomdiv.style.display="block";
}

handleInput(e) {
switch(e.target.name){

  case 'asin':
  this.setState({
    asin:e.target.value
  });
  var ref_rate = 0.15;
  if(e.target.value!=''){
  var url_uk = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin='+e.target.value+'&offers=20&fbafees=1&rating=1&stats=180&history=0'
  fetch(url_uk)
  .then((response)=> {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  return response.json();
  })
    .then((data) => {
      console.log(data);
      this.refs.prodImg.style.display = 'block';
      //console.log((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10]);
      var uk_prime_price = (((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10])/100).toFixed(2);
      if(data.products[0].binding =='Personal Care'){
        if(uk_prime_price<=10)
          ref_rate = 0.08;
        else {
          ref_rate = 0.15;
          this.setState({category:"Personal_Care2"})
        }
      }

      else if (['Toy', 'Watch', 'Video Game'].indexOf(data.products[0].binding) >= 0) {
          ref_rate = 0.15;
      }

      else if(data.products[0].binding =='Electronics'){
          ref_rate = 0.12;
      }

      //var uk_ref_fees = uk_prime_price*ref_rate;
      this.setState({
        title:data.products[0].title,
	      prod_code : "ean-"+data.products[0].ean+"-upc-"+data.products[0].upc+"-mpn-"+data.products[0].mpn,
        uk_buybox_price : ((data.products[0].stats.buyBoxPrice)/100).toFixed(2),
        uk_prime_price: uk_prime_price,
        uk_fba_fees: data.products[0].fbaFees===null?0:((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax)/100).toFixed(2),
        uk_sales_rank: data.products[0].stats.current[3],
        uk_keepa_90avg : ((data.products[0].stats.avg90[18])/100).toFixed(2),
        uk_fba_seller_count : data.products[0].stats.offerCountFBA,
        img: (data.products[0].imagesCSV.split(','))[0],
        //uk_ref_fees:uk_ref_fees.toFixed(2),
        ref_rate: ref_rate,
        uk_done : 'success'
      });
      this.populateEuroFields(ref_rate);
    });
  }

  break;

  case 'buying_price':
  this.setState({
    buying_price:e.target.value
  });
  break;
  case 'vat':
  var vat = e.target.value*this.refs.buying_price.value;
  console.log("calculated vat:"+vat);
  this.setState({
    vat: vat.toFixed(2)
  });
  break;
  case 'uk_prime_price':
  this.setState({
    uk_prime_price:e.target.value
  });
  break;
  case 'fba_fees':
  this.setState({
    fba_fees:e.target.value
  });
  break;
  case 'fba_ship_charges':
  this.setState({
    fba_ship_charges:e.target.value

  });
  break;

  case 'fr_fba_fees':
  this.setState({
    fr_fba_fees:e.target.value
  });
  break;

  case 'it_fba_fees':
  this.setState({
    it_fba_fees:e.target.value
  });
  break;

  case 'de_fba_fees':
  this.setState({
    de_fba_fees:e.target.value
  });
  break;

  case 'es_fba_fees':
  this.setState({
  es_fba_fees:e.target.value
  });
  break;


  case 'fr_prime_price':
  this.setState({
    fr_prime_price:e.target.value
  });
  break;

  case 'it_prime_price':
  this.setState({
    it_prime_price:e.target.value
  });
  break;

  case 'de_prime_price':
  this.setState({
    de_prime_price:e.target.value
  });
  break;

  case 'es_prime_price':
  this.setState({
    es_prime_price:e.target.value
  });
  break;

  case 'uk_monthly_approx_sales':
  if(this.state.uk_monthly_approx_sales!= ''){
  this.setState({
    uk_monthly_approx_sales : this.refs.uk_monthly_approx_sales.value,
  },this.getRecommendations)
  }
  break;
  case 'fr_monthly_approx_sales':
  if(this.state.fr_monthly_approx_sales!= ''){
  this.setState({
    fr_monthly_approx_sales : this.refs.fr_monthly_approx_sales.value,
  },this.getRecommendations)
  }
  break;
  case 'it_monthly_approx_sales':
  if(this.state.it_monthly_approx_sales!= ''){
  this.setState({
    it_monthly_approx_sales : this.refs.it_monthly_approx_sales.value,
  },this.getRecommendations)
  }
  break;
  case 'de_monthly_approx_sales':
  if(this.state.de_monthly_approx_sales!= ''){
  this.setState({
    de_monthly_approx_sales : this.refs.de_monthly_approx_sales.value,
  },this.getRecommendations)
  }
  break;
  case 'es_monthly_approx_sales':
  this.setState({
    uk_monthly_approx_sales : this.refs.uk_monthly_approx_sales.value,
    fr_monthly_approx_sales : this.refs.fr_monthly_approx_sales.value,
    it_monthly_approx_sales : this.refs.it_monthly_approx_sales.value,
    de_monthly_approx_sales : this.refs.de_monthly_approx_sales.value,
    es_monthly_approx_sales : this.refs.es_monthly_approx_sales.value,

  },this.getRecommendations)
  break;
  default:
    }
  if(this.refs.uk_prime_price.value!=''){
  this.calcProfit(e);
  this.calcProfitEU(e);
  }

}


populateEuroFields(ref_rate){
  var asin = this.state.asin;
  var url_fr = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=4&asin='+asin+'&offers=20&fbafees=1&rating=1&stats=180&history=0'
  fetch(url_fr)
  .then((response)=> {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  return response.json();
  })
    .then((data) => {
      console.log(data);
      var fr_prime_price = (((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10])/100).toFixed(2);

      this.setState({
        fr_buybox_price : ((data.products[0].stats.buyBoxPrice)/100).toFixed(2),
        fr_prime_price: fr_prime_price,
        fr_fba_fees: data.products[0].fbaFees===null?0:((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax)/100).toFixed(2),
        //fr_ref_fees:(fr_prime_price>0?fr_prime_price*ref_rate:0).toFixed(2),
        fr_sales_rank: data.products[0].stats.current[3],
        fr_keepa_90avg : ((data.products[0].stats.avg90[18])/100).toFixed(2),
        fr_fba_seller_count : data.products[0].stats.offerCountFBA,
        fr_done : 'success'
      });

    });


  var url_it = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=8&asin='+asin+'&offers=20&fbafees=1&rating=1&stats=180&history=0'
  fetch(url_it)
  .then((response)=> {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  return response.json();
  })
    .then((data) => {
        var it_prime_price = (((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10])/100).toFixed(2);
      this.setState({
        it_buybox_price : ((data.products[0].stats.buyBoxPrice)/100).toFixed(2),
        it_prime_price: it_prime_price,
        it_fba_fees: data.products[0].fbaFees===null?0:((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax)/100).toFixed(2),
        //it_ref_fees:(it_prime_price>0?it_prime_price*ref_rate:0).toFixed(2),
        it_sales_rank: data.products[0].stats.current[3],
        it_keepa_90avg : ((data.products[0].stats.avg90[18])/100).toFixed(2),
        it_fba_seller_count : data.products[0].stats.offerCountFBA,
        it_done : 'success'
      });

    });


  var url_de = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=3&asin='+asin+'&offers=20&fbafees=1&rating=1&stats=180&history=0'
  fetch(url_de)
  .then((response)=> {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  return response.json();
  })
    .then((data) => {
      console.log(data);
        var de_prime_price = (((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10])/100).toFixed(2);
      this.setState({
        de_buybox_price : ((data.products[0].stats.buyBoxPrice)/100).toFixed(2),
        de_prime_price: de_prime_price,
        de_fba_fees: data.products[0].fbaFees===null?0:((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax)/100).toFixed(2),
        de_ref_fees:(de_prime_price>0?de_prime_price*ref_rate:0).toFixed(2),
        de_sales_rank: data.products[0].stats.current[3],
        de_keepa_90avg : ((data.products[0].stats.avg90[18])/100).toFixed(2),
        de_fba_seller_count : data.products[0].stats.offerCountFBA,
        de_done : 'success'

    });

  });


  var url_es = 'https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=9&asin='+asin+'&offers=20&fbafees=1&rating=1&stats=180&history=0'
  fetch(url_es)
  .then((response)=> {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
  return response.json();
  })
    .then((data) => {
      var es_prime_price = (((data.products[0].stats.current[0]!=-1)?data.products[0].stats.current[0]:data.products[0].stats.current[10])/100).toFixed(2);
      this.setState({
        es_buybox_price : ((data.products[0].stats.buyBoxPrice)/100).toFixed(2),
        es_prime_price: es_prime_price,
        es_fba_fees: data.products[0].fbaFees===null?0:((data.products[0].fbaFees.storageFee + data.products[0].fbaFees.pickAndPackFee + data.products[0].fbaFees.storageFeeTax + data.products[0].fbaFees.pickAndPackFeeTax)/100).toFixed(2),
        es_ref_fees:(es_prime_price>0?es_prime_price*ref_rate:0).toFixed(2),
        es_sales_rank: data.products[0].stats.current[3],
        es_keepa_90avg : ((data.products[0].stats.avg90[18])/100).toFixed(2),
        es_fba_seller_count : data.products[0].stats.offerCountFBA,
        es_done : 'success'
      });
    });
}


calcProfit(e) {
var buy_pr= this.refs.buying_price.value;
var vat= (this.refs.vat.value * this.refs.buying_price.value).toFixed(2);
this.setState({
  vat:vat
});
console.log("calcprofit vat:"+vat);
var fba_fees=this.refs.uk_fba_fees.value;
var fba_ship=this.refs.fba_ship_charges.value;
var uk_prime=this.refs.uk_prime_price.value;
var uk_ref_fees = uk_prime * this.state.ref_rate;

if(buy_pr>=0 && fba_fees>=0 && fba_ship>=0 && uk_prime>=0){
var tot = Number(buy_pr) +Number(vat)+Number(fba_ship);
var pft = (Number(uk_prime) - tot - Number(fba_fees)-Number(uk_ref_fees)).toFixed(2);
//var minprice_gpp15 = 1.18*(tot+ Number(fba_fees)+Number(uk_ref_fees));
var roi= (pft/tot*100).toFixed(2);
var fba_fee_rate = fba_fees/uk_prime;
//new minprice calc
//minprice - minprice*fba_fee_rate - minprice*ref_rate = tot*1.15

var minprice = this.calcMinPrice(tot,fba_fee_rate);

var gpp15price = this.calcGPP15Price(tot,fba_fee_rate);

this.setState({
 uk_profit:pft,
 uk_roi:roi,
 uk_minprice:Number(minprice).toFixed(2),
 uk_gpp15price:Number(gpp15price).toFixed(2)
 });
 }

 }

calcMinPrice(tot,fba_fee_rate){
  var minprice = (tot*1.15)/(1-fba_fee_rate-this.state.ref_rate);

  if(this.state.category == "Personal_Care2"){
  //ref rate 0.08 for prime price<=10
  var minprice1 = (tot*1.15)/(1-fba_fee_rate-0.08);
  if(minprice1<=10)
  minprice = minprice1;
  }

  console.log(minprice);
  return minprice;
}

calcGPP15Price(tot,fba_fee_rate){
  var npp = tot/(0.85-fba_fee_rate-this.state.ref_rate);

  if(this.state.category == "Personal_Care2"){
  //ref rate 0.08 for prime price<=10
  var npp1 =  tot/(0.85-fba_fee_rate-0.08);
  if(npp1<=10)
  npp = npp1;
  }

  console.log(npp);
  return npp;
}

calcProfitEU(e) {
console.log(this.state.eur_gbp);
var buy_pr = this.refs.buying_price.value;
var fba_ship = this.refs.fba_ship_charges.value;
var vat= this.refs.vat.value * buy_pr;
var tot = Number(buy_pr) + Number(vat)+ Number(fba_ship);
var eur_gbp = this.state.eur_gbp;

var fr_prime_price = this.refs.fr_prime_price.value;
var fr_fba_fees = this.refs.fr_fba_fees.value;
var fr_ref_fees = fr_prime_price * this.state.ref_rate;

if(fr_prime_price>=0){
var pft = (Number(fr_prime_price*eur_gbp) - tot - Number(fr_fba_fees*eur_gbp)- Number(fr_ref_fees*eur_gbp)).toFixed(2);
var rtni= (pft/tot*100).toFixed(2);
var fr_fba_fee_rate = fr_fba_fees/fr_prime_price;

//var fr_minprice = ((tot*1.15)/((1-fr_fba_fee_rate)*eur_gbp)).toFixed(2);

var fr_minprice = this.calcMinPrice(tot,fr_fba_fee_rate);

var fr_gpp15price = this.calcGPP15Price(tot,fr_fba_fee_rate);


//converting to euro
fr_minprice = fr_minprice/eur_gbp;
fr_gpp15price = fr_gpp15price/eur_gbp;

this.setState({
 fr_profit:pft,
 fr_roi:rtni,
 fr_minprice: fr_minprice.toFixed(2),
 fr_gpp15price : fr_gpp15price.toFixed(2)
 });

}


var it_prime_price = this.refs.it_prime_price.value;
var it_fba_fees = this.refs.it_fba_fees.value;
var it_ref_fees = it_prime_price * this.state.ref_rate;

if(it_prime_price>=0){
var pft = (Number(it_prime_price*eur_gbp) - tot - Number(it_fba_fees*eur_gbp)-Number(it_ref_fees*eur_gbp)).toFixed(2);
var rtni= (pft/tot*100).toFixed(2);
var it_fba_fee_rate = it_fba_fees/it_prime_price;

//var it_minprice = ((tot*1.15)/((1-it_fba_fee_rate)*eur_gbp)).toFixed(2);

var it_minprice = this.calcMinPrice(tot,it_fba_fee_rate);

var it_gpp15price = this.calcGPP15Price(tot,it_fba_fee_rate);

//converting to euro
it_minprice = it_minprice/eur_gbp;
it_gpp15price = it_gpp15price/eur_gbp;


this.setState({
 it_profit:pft,
 it_roi:rtni,
 it_minprice: it_minprice.toFixed(2),
 it_gpp15price : it_gpp15price.toFixed(2)
 });

}

var de_prime_price = this.refs.de_prime_price.value;
var de_fba_fees = this.refs.de_fba_fees.value;
var de_ref_fees = de_prime_price * this.state.ref_rate;

if(de_prime_price>=0){
var pft = (Number(de_prime_price*eur_gbp) - tot - Number(de_fba_fees*eur_gbp)-Number(de_ref_fees*eur_gbp)).toFixed(2);
var rtni= (pft/tot*100).toFixed(2);
var de_fba_fee_rate = de_fba_fees/de_prime_price;
//var de_minprice = ((tot*1.15)/((1-de_fba_fee_rate)*eur_gbp)).toFixed(2);

var de_minprice = this.calcMinPrice(tot,de_fba_fee_rate);

var de_gpp15price = this.calcGPP15Price(tot,de_fba_fee_rate);

//converting to euro
de_minprice = de_minprice/eur_gbp;
de_gpp15price = de_gpp15price/eur_gbp;

this.setState({
 de_profit:pft,
 de_roi:rtni,
 de_minprice: de_minprice.toFixed(2),
 de_gpp15price : de_gpp15price.toFixed(2)
 });
}

var es_prime_price = this.refs.es_prime_price.value;
var es_fba_fees = this.refs.es_fba_fees.value;
var es_ref_fees = es_prime_price * this.state.ref_rate;

if(es_prime_price>=0){
var pft = (Number(es_prime_price*eur_gbp) - tot - Number(es_fba_fees*eur_gbp)-Number(es_ref_fees*eur_gbp)).toFixed(2);
var rtni= (pft/tot*100).toFixed(2);
var es_fba_fee_rate = es_fba_fees/es_prime_price;

//var es_minprice = ((tot*1.15)/((1-es_fba_fee_rate)*eur_gbp)).toFixed(2);

var es_minprice = this.calcMinPrice(tot,es_fba_fee_rate);

var es_gpp15price = this.calcGPP15Price(tot,es_fba_fee_rate);

//converting to euro
es_minprice = es_minprice/eur_gbp;
es_gpp15price = es_gpp15price/eur_gbp;

this.setState({
 es_profit:pft,
 es_roi:rtni,
 es_minprice: es_minprice.toFixed(2),
 es_gpp15price : es_gpp15price.toFixed(2)
},this.getRecomOnROIChange);

}

}

getRecomOnROIChange(){
  if(this.state.uk_monthly_approx_sales!='')
  this.getRecommendations();
}

updateOrderStatus() {
var status,reject_status;
if((this.state.uk_profit<0 && this.state.fr_profit<0 && this.state.it_profit<0 && this.state.de_profit<0 && this.state.es_profit<0) || (this.refs.uk_monthly_approx_sales.value<30 && this.refs.fr_monthly_approx_sales.value<30 && this.refs.it_monthly_approx_sales.value<30 && this.refs.de_monthly_approx_sales.value<30 && this.refs.es_monthly_approx_sales.value<30)) {
status = "Rejected"
reject_status = "disabled"
}
else {
status = "Order in progress"
reject_status = ""
}

this.setState({
   order_status:status,
   reject_status:reject_status
 });

}
addStockData(e) {
  e.preventDefault();
  console.log(this.props.uname);
  var doc = {};
  var emptyFlag =false;
  let errors = {};
  doc["img"]=this.state.img;
  if(this.refs.asin.value!="" && this.refs.asin.value.length>=10 )
   doc["asin"]=this.refs.asin.value;
   else {
   errors["asin"] = "Please enter a valid ASIN";
   emptyFlag = true;
   }
   if(this.state.title!="")
   doc["product_title"]=this.state.title;
   else {
    errors["product_title"] = "Product Title missing";
    emptyFlag = true;
   }

  if(this.refs.buying_price.value!="")
   doc["buying_price"]=this.refs.buying_price.value;
   else {
    errors["buying_price"] = "Buying Price missing";
    emptyFlag = true;
    this.refs.buying_price.style.backgroundColor="yellow";
   }


   if(this.refs.qty.value!="")
   doc["order_quantity"]=this.refs.qty.value;
   else if(!this.refs.qty.disabled){
    errors["qty"] = "Case Quantity required";
    emptyFlag = true;
    this.refs.qty.style.backgroundColor="yellow";
   }
   if(this.refs.prod_code.value!="")
   doc["prod_code"]=this.refs.prod_code.value;
   else if(!this.refs.prod_code.disabled){
    errors["prod_code"] = "Product code required";
    emptyFlag = true;
   }


    if(this.state.selectedValue!="")
    doc["wholesalers"]= this.state.selectedValue;
   else {
    errors["wholesalers"] = "Wholesalers required";
    emptyFlag = true;
   }


   if(this.refs.fba_ship_charges.value!="")
   doc["fba_ship_charges"]=this.refs.fba_ship_charges.value;
   else {
    errors["fba_ship_charges"] = "Fba Ship Charges required";
    emptyFlag = true;
    this.refs.fba_ship_charges.style.backgroundColor="yellow"
   }

   doc["vat"]=this.state.vat;
   doc["order_status"]= this.state.order_status;
   doc["ref_rate"] = this.state.ref_rate;
   doc["category"] = this.state.category;

   if(this.refs.uk_prime_price.value!="" && this.refs.uk_prime_price.value>0)
   doc["uk_prime_price"]=this.refs.uk_prime_price.value;
   else {
    errors["uk_prime_price"] = "UK Prime Price missing";
    emptyFlag = true;
    this.refs.uk_prime_price.style.backgroundColor="yellow";
   }

   if(this.state.uk_buybox_price!="")
   doc["uk_buybox_price"]=this.state.uk_buybox_price;


   if(this.refs.uk_fba_fees.value!="" && this.refs.uk_fba_fees.value>0)
   doc["uk_fba_fees"]= this.refs.uk_fba_fees.value;
   else {
    errors["uk_fba_fees"] = "UK FBA Fees missing";
    emptyFlag = true;
    this.refs.uk_fba_fees.style.backgroundColor="yellow"
   }


   if(this.refs.uk_ref_fees.value!="")
   doc["uk_ref_fees"]=this.refs.uk_ref_fees.value;


   if(this.state.uk_profit!="")
   doc["uk_profit"]=this.state.uk_profit;
   else {
    errors["uk_profit"] = "UK Profit missing";
    emptyFlag = true;
   }
   if(this.state.uk_roi!="")
   doc["uk_roi"]=this.state.uk_roi;
   else {
    errors["uk_roi"] = "UK ROI missing";
    emptyFlag = true;
   }

   if(this.state.uk_minprice!="")
   doc["uk_minprice"] = this.state.uk_minprice;
   else {
    errors["uk_minprice"] = "UK Minprice missing";
    emptyFlag = true;
   }

   if(this.state.uk_gpp15price!="")
   doc["uk_gpp15price"] = this.state.uk_gpp15price;

   if(this.state.uk_sales_rank!="")
   doc["uk_sales_rank"]= this.state.uk_sales_rank;
   else {
    errors["uk_sales_rank"] = "Sales Rank UK missing";
    emptyFlag = true;
   }
   if(this.refs.uk_monthly_approx_sales.value!="")
   doc["uk_monthly_approx_sales"]= this.refs.uk_monthly_approx_sales.value;
   else {
    errors["uk_monthly_approx_sales"] = "UK Monthly Approx. Sales missing";
    emptyFlag = true;
    this.refs.uk_monthly_approx_sales.style.backgroundColor="yellow";
   }
   if(this.state.uk_keepa_90avg!="")
   doc["uk_keepa_90avg"]= this.state.uk_keepa_90avg;
   else {
    errors["uk_keepa_90avg"] = "UK Keepa 90 days avg buy box price missing";
    emptyFlag = true;
   }



   if(this.refs.fr_prime_price.value!="" && this.refs.fr_prime_price.value>0)
   doc["fr_prime_price"]=this.refs.fr_prime_price.value;
   else {
    errors["fr_prime_price"] = "FR Prime price missing";
    emptyFlag = true;
    this.refs.fr_prime_price.style.backgroundColor="yellow";
   }

   if(this.state.fr_buybox_price!="")
   doc["fr_buybox_price"]=this.state.fr_buybox_price;


   if(this.refs.fr_fba_fees.value!="" && this.refs.fr_fba_fees.value>0)
   doc["fr_fba_fees"]= this.refs.fr_fba_fees.value;
   else {
    errors["fr_fba_fees"] = "FR FBA Fees missing";
    emptyFlag = true;
    this.refs.fr_fba_fees.style.backgroundColor="yellow";
   }


   if(this.refs.fr_ref_fees.value!="")
   doc["fr_ref_fees"]=this.refs.fr_ref_fees.value;

   if(this.state.fr_profit!="")
   doc["fr_profit"]=this.state.fr_profit;

   if(this.state.fr_roi!="")
   doc["fr_roi"]=this.state.fr_roi;

   if(this.state.fr_minprice!="")
   doc["fr_minprice"] = this.state.fr_minprice;

    if(this.state.fr_gpp15price!="")
   doc["fr_gpp15price"] = this.state.fr_gpp15price;


   if(this.state.fr_sales_rank!="")
   doc["fr_sales_rank"]=this.state.fr_sales_rank;
   else {
    errors["fr_sales_rank"] = "FR Sales Rank missing";
    emptyFlag = true;
   }
   if(this.refs.fr_monthly_approx_sales.value!="")
   doc["fr_monthly_approx_sales"]= this.refs.fr_monthly_approx_sales.value;
   else {
    errors["fr_monthly_approx_sales"] = "FR Monthly Approx. Sales missing";
    emptyFlag = true;
    this.refs.fr_monthly_approx_sales.style.backgroundColor="yellow";
   }

   if(this.state.fr_keepa_90avg!="")
   doc["fr_keepa_90avg"]= this.state.fr_keepa_90avg;
   else {
    errors["fr_keepa_90avg"] = "FR Keepa 90 days avg buy box price missing";
    emptyFlag = true;
   }

   if(this.refs.it_prime_price.value!="" && this.refs.it_prime_price.value>0)
   doc["it_prime_price"]=this.refs.it_prime_price.value;
   else {
    errors["it_prime_price"] = "IT Prime price missing";
    emptyFlag = true;
    this.refs.it_prime_price.style.backgroundColor="yellow";
   }

   if(this.state.it_buybox_price!="")
   doc["it_buybox_price"]=this.state.it_buybox_price;


   if(this.refs.it_fba_fees.value!="" && this.refs.it_fba_fees.value>0)
   doc["it_fba_fees"]= this.refs.it_fba_fees.value;
   else {
    errors["it_fba_fees"] = "IT FBA Fees missing";
    emptyFlag = true;
    this.refs.it_fba_fees.style.backgroundColor="yellow";
   }


   if(this.refs.it_ref_fees.value!="")
   doc["it_ref_fees"]=this.refs.it_ref_fees.value;

   if(this.state.it_profit!="")
   doc["it_profit"]=this.state.it_profit;

   if(this.state.it_roi!="")
   doc["it_roi"]=this.state.it_roi;


   if(this.state.it_minprice!="")
   doc["it_minprice"] = this.state.it_minprice;

    if(this.state.it_gpp15price!="")
   doc["it_gpp15price"] = this.state.it_gpp15price;


   if(this.state.it_sales_rank!="")
   doc["it_sales_rank"]=this.state.it_sales_rank;
   else {
    errors["it_sales_rank"] = "IT Sales Rank missing";
    emptyFlag = true;
   }
   if(this.refs.it_monthly_approx_sales.value!="")
   doc["it_monthly_approx_sales"]= this.refs.it_monthly_approx_sales.value;
   else {
    errors["it_monthly_approx_sales"] = "IT Monthly Approx. Sales missing";
    emptyFlag = true;
    this.refs.it_monthly_approx_sales.style.backgroundColor="yellow";

   }

   if(this.state.it_keepa_90avg!="")
   doc["it_keepa_90avg"]= this.state.it_keepa_90avg;
   else {
    errors["it_keepa_90avg"] = "IT Keepa 90 days avg buy box price missing";
    emptyFlag = true;
   }

   if(this.refs.de_prime_price.value!="" && this.refs.de_prime_price.value>0)
   doc["de_prime_price"]=this.refs.de_prime_price.value;
   else {
    errors["de_prime_price"] = "DE Prime price missing";
    emptyFlag = true;
    this.refs.de_prime_price.style.backgroundColor="yellow";

   }

   if(this.state.de_buybox_price!="")
   doc["de_buybox_price"]=this.state.de_buybox_price;


   if(this.refs.de_fba_fees.value!="" && this.refs.de_fba_fees.value>0)
   doc["de_fba_fees"]= this.refs.de_fba_fees.value;
   else {
    errors["de_fba_fees"] = "DE FBA Fees missing";
    emptyFlag = true;
    this.refs.de_fba_fees.style.backgroundColor="yellow";
   }

   if(this.refs.de_ref_fees.value!="")
   doc["de_ref_fees"]=this.refs.de_ref_fees.value

   if(this.state.de_profit!="")
   doc["de_profit"]=this.state.de_profit;

   if(this.state.de_roi!="")
   doc["de_roi"]=this.state.de_roi;


   if(this.state.de_minprice!="")
   doc["de_minprice"] = this.state.de_minprice;

    if(this.state.de_gpp15price!="")
   doc["de_gpp15price"] = this.state.de_gpp15price;

   if(this.state.de_sales_rank!="")
   doc["de_sales_rank"]=this.state.de_sales_rank;
   else {
    errors["de_sales_rank"] = "DE Sales Rank missing";
    emptyFlag = true;
   }
   if(this.refs.de_monthly_approx_sales.value!="")
   doc["de_monthly_approx_sales"]= this.refs.de_monthly_approx_sales.value;
   else {
    errors["de_monthly_approx_sales"] = "DE Monthly Approx. Sales missing";
    emptyFlag = true;
    this.refs.de_monthly_approx_sales.style.backgroundColor="yellow";
   }


   if(this.state.de_keepa_90avg!="")
   doc["de_keepa_90avg"]= this.state.de_keepa_90avg;
   else {
    errors["de_keepa_90avg"] = "DE Keepa 90 days avg buy box price missing";
    emptyFlag = true;
   }

   if(this.refs.es_prime_price.value!="" && this.refs.es_prime_price.value>0)
   doc["es_prime_price"]=this.refs.es_prime_price.value;
   else {
    errors["es_prime_price"] = "ES Prime price missing";
    emptyFlag = true;
    this.refs.es_prime_price.style.backgroundColor="yellow";
   }

   if(this.state.es_buybox_price!="")
   doc["es_buybox_price"]=this.state.es_buybox_price;


   if(this.refs.es_fba_fees.value!="" && this.refs.es_fba_fees.value>0)
   doc["es_fba_fees"]= this.refs.es_fba_fees.value;
   else {
    errors["es_fba_fees"] = "ES FBA Fees missing";
    emptyFlag = true;
    this.refs.es_fba_fees.style.backgroundColor="yellow";
   }

   if(this.refs.es_ref_fees.value!="")
   doc["es_ref_fees"]=this.refs.es_ref_fees.value;

   if(this.state.es_profit!="")
   doc["es_profit"]=this.state.es_profit;

   if(this.state.es_roi!="")
   doc["es_roi"]=this.state.es_roi;

   if(this.state.es_minprice!="")
   doc["es_minprice"] = this.state.es_minprice;

    if(this.state.es_gpp15price!="")
   doc["es_gpp15price"] = this.state.es_gpp15price;

   if(this.state.es_sales_rank!="")
   doc["es_sales_rank"]=this.state.es_sales_rank;
   else {
    errors["es_sales_rank"] = "ES Sales Rank missing";
    emptyFlag = true;
   }
   if(this.refs.es_monthly_approx_sales.value!="")
   doc["es_monthly_approx_sales"]= this.refs.es_monthly_approx_sales.value;
   else {
    errors["es_monthly_approx_sales"] = "ES Monthly Approx. Sales missing";
    emptyFlag = true;
    this.refs.es_monthly_approx_sales.style.backgroundColor="yellow";
   }


   if(this.state.es_keepa_90avg!="")
   doc["es_keepa_90avg"]= this.state.es_keepa_90avg;
   else {
    errors["es_keepa_90avg"] = "ES Keepa 90 days avg buy box price missing";
    emptyFlag = true;
   }


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

  doc["created_date"]= today;
  doc["last_updated_date"]= today;
  doc["user_name"]= this.props.uname;

  if(!this.refs.Amazon_approval_yes.disabled){

   if(this.state.selectedOptionAmz=="No" ){
    errors["amz_approval"] = "Verification pending";
    emptyFlag = true;
   }


  }

  console.log("Doc Object");
  console.log(doc);

  console.log(errors);
  // for(var i in errors)
  // alert(i + " is missing");

  this.setState({errors: errors});

 if(emptyFlag == false){
  this.setState({submit_status:'submitted'});
  var url = '/addStockData';
  //var url = 'http://localhost:8081/addStockData';
  fetch(url,
  {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(doc)

  })

   .then( alert("Details Added !!") )
  .catch(function(res){ console.log(res) })

}

}
handleOptionChange(e){
 if(e.target.value == "Amz_No")
   this.setState({
    selectedOptionAmz: "No"
 })
else if(e.target.value == "Amz_Yes")
this.setState({
 selectedOptionAmz: "Yes"
 })


}
handleSelectChange(e){
 this.setState({
   selectedValue:e.target.value
 })
}




 render() {
  console.log(this.state.wholesalers);
  var options = ["A","C","D","B"];
  const imgUrl = "https://images-na.ssl-images-amazon.com/images/I/"+this.state.img;

  var wholesalerOptions = this.state.wholesalers.map(function (option) {
    return React.createElement(
        'option',
        { value: option.name},
        option.name
    );
});
    return (
      
      <Fragment>
      <Loader />
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          <Header />
          <Sidebar />
          <Rightsidebar />
          <div className="page-body">
            <div>
            <div>
          <Breadcrumb parent="Dashboard" title="Default" />
          <div>
      <div className="container-fluid">
     <h4 style={{color:"#1C090B", paddingLeft:"1em",letterSpacing:"3px"}}>Amazon Product Identifier & Master Stock addition </h4><br />

          <form  className="form-inline" style={{float:"left", width:"95%",margin:"25px",marginTop:"0px",padding:"15px",boxShadow:"1px 2px 2px 3px silver",backgroundColor:"#FAFAFA",background: "rgba(255,255,255,0.8)"}}>
          <table className="table" style={{float:"left",width:"1000px",border:"1px 1px 1px solid silver"}}>
          <br/><br/>
          <tr><td style={{width:"200px"}}><label style={{ color:"#1D1D1D", display:"inline-block",width:"200px"}}>ASIN</label> </td><td style={{paddingBottom: "1em",width:"200px"}}>   <input type="text" className="form-control" maxLength ="100" ref="asin" name="asin" onBlur={this.handleInput} /></td> <td style={{paddingBottom: "1em"}}>         <label style={{color:"#1D1D1D", display:"inline-block",width:"400px"}}>{this.state.title}</label></td>

          </tr><tr></tr>
     <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"200px"}}>Buying Price</label> </td><td style={{paddingBottom: "1em"}}>          <input type="number" className="form-control" maxLength ="100" name= "buying_price" ref="buying_price" disabled={this.state.uk_done=='success' && this.state.fr_done =='success' && this.state.it_done =='success' && this.state.de_done =='success' && this.state.es_done =='success'? false:true} onBlur={this.handleInput}/></td><span style={{color: "red",paddingLeft: "1em",display:"inline-block",width:"250px",fontSize:"12px"}}>{this.state.errors["buying_price"]}</span></tr><tr></tr>

     <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"200px"}}>VAT</label> </td><td style={{paddingBottom: "1em"}}> <span>
              <select id="vat"
              className="form-control"
               defaultValue=" "
               style={{width: "170px"}}
               onChange={this.handleInput} ref="vat" name="vat">
              <option value="0.2">20%</option>
              <option value="0">No VAT</option>
             </select>
            </span> </td></tr><tr></tr>

            <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"200px"}}>Order Quantity</label> </td><td style={{paddingBottom: "1em"}}>          <input type="number" className="form-control" maxLength ="100" ref="qty" disabled={this.state.reject_status}/></td><span style={{color: "red",paddingLeft: "1em",display:"inline-block",width:"250px",fontSize:"12px"}}>{this.state.errors["qty"]}</span>
              </tr><tr></tr>

             <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"200px"}}>Product Code (UPC/EAN/Others)</label> </td><td style={{paddingBottom: "1em"}}>          <textarea ref="prod_code" disabled={this.state.reject_status} value={this.state.prod_code}/></td><span style={{color: "red",paddingLeft: "1em",display:"inline-block",width:"250px",fontSize:"12px"}}>{this.state.errors["prod_code"]}</span>
             </tr><tr></tr>

             <tr><td style={{paddingBottom: "1em"}}><label style={{ color:"#1D1D1D",display:"inline-block",width:"200px"}}>Wholesalers</label>  </td>
             <td style={{paddingBottom: "1em"}}> <span>


                      <select id="SelectWholeSalers"
                      className="form-control"
                       style={{width: "170px"}}
                       onChange={this.handleSelectChange} ref="Wholesalers">
                       <option value="Select">Select Wholesalers</option>
                       <option value="Test1">TestWholesaler1</option>
                       <option value="Test2">TestWholesaler2</option>
                      {wholesalerOptions}
                    </select>
                    </span> </td> <span style={{color: "red",paddingLeft: "1em",display:"inline-block",width:"250px",fontSize:"12px"}}>{this.state.errors["wholesalers"]}</span></tr>

              <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"120px"}}>Order Status</label> </td><td style={{paddingBottom: "1em"}}><input type="text" className="form-control" maxLength ="100" ref="order_status" value = {this.state.order_status}/></td></tr><tr></tr>


              <tr><td style={{paddingBottom: "1em"}}><label style={{color:"#1D1D1D", display:"inline-block",width:"200px"}}>Shipping Charges</label> </td><td style={{paddingBottom: "1em"}}>          <input type="number" className="form-control" maxLength ="100" name= "fba_ship_charges" ref="fba_ship_charges" onBlur={this.handleInput}/></td><span style={{color: "red",paddingLeft: "1em",display:"inline-block",width:"250px",fontSize:"12px"}}>{this.state.errors["fba_ship_charges"]}</span> </tr><tr></tr>

              <tr>
              <td>
              <label>Amazon Listing approval verified?</label>
              </td>
              <td>
              <input type="radio" style={{marginRight:"10px"}} value="Amz_Yes" ref="Amazon_approval_yes" checked={this.state.selectedOptionAmz === "Yes"} onChange={this.handleOptionChange} disabled={this.state.reject_status} />Yes
              <div style={{width:"10px",height:"10px"}}/>
              <input type="radio" style={{marginRight:"10px"}} value="Amz_No" ref="Amazon_approval_no" checked={this.state.selectedOptionAmz === "No"} onChange={this.handleOptionChange} disabled={this.state.reject_status} />No
              </td>
              <td>
              <span style={{color: "red",paddingLeft: "1em",display:"inline-block",fontSize:"12px",width:"250px"}}>{this.state.errors["amz_approval"]}</span>
              </td>
              </tr>

              </table>


    <table id="addstockMktTbl" className="table" className="col-sm-6" style={{backgroundColor:"#FAFAFA",borderLeft:"10px solid #FAFAFA",fontSize:"12px"}}>
    <br/>
    <tr style={{backgroundColor:"#14C2AD",color:"white"}}>
    <td style={{width:"500px"}}>Market Place</td>
    <td style={{textAlign:"center"}}>UK</td>
    <td style={{textAlign:"center"}}>FR</td>
    <td style={{textAlign:"center"}}>IT</td>
    <td style={{textAlign:"center"}}>DE</td>
    <td style={{textAlign:"center"}}>ES</td>
    </tr>
    <br/>
     <tr><td>Prime Price</td>
     <td><input type="number" name= "uk_prime_price" ref="uk_prime_price" defaultValue={this.state.uk_prime_price} onBlur={this.handleInput}/></td>
     <td><input type="number" name= "fr_prime_price" ref="fr_prime_price" defaultValue={this.state.fr_prime_price} onBlur={this.handleInput}/></td>
     <td><input type="number" name= "it_prime_price" ref="it_prime_price" defaultValue={this.state.it_prime_price} onBlur={this.handleInput}/></td>
     <td><input type="number" name= "de_prime_price" ref="de_prime_price" defaultValue={this.state.de_prime_price} onBlur={this.handleInput}/></td>
     <td><input type="number" name= "es_prime_price" ref="es_prime_price" defaultValue={this.state.es_prime_price} onBlur={this.handleInput}/></td>
    </tr>
    <br/>
    <tr><td>BuyBox Price</td>
    <td><input type="number" name= "uk_buybox_price" ref="uk_buybox_price" value={this.state.uk_buybox_price} onBlur={this.handleInput}/></td>
    <td><input type="number" name= "fr_buybox_price" ref="fr_buybox_price" value={this.state.fr_buybox_price} onBlur={this.handleInput}/></td>
    <td><input type="number" name= "it_buybox_price" ref="it_buybox_price" value={this.state.it_buybox_price} onBlur={this.handleInput}/></td>
    <td><input type="number" name= "de_buybox_price" ref="de_buybox_price" value={this.state.de_buybox_price} onBlur={this.handleInput}/></td>
    <td><input type="number" name= "es_buybox_price" ref="es_buybox_price" value={this.state.es_buybox_price} onBlur={this.handleInput}/></td>
   </tr>
   <br/>
   <tr><td>FBA Fees</td>
   <td><input type="number" name= "uk_fba_fees" ref="uk_fba_fees" defaultValue={this.state.uk_fba_fees} onBlur={this.handleInput}/></td>
   <td><input type="number" name= "fr_fba_fees" ref="fr_fba_fees" defaultValue={this.state.fr_fba_fees} onBlur={this.handleInput}/></td>
   <td><input type="number" name= "it_fba_fees" ref="it_fba_fees" defaultValue={this.state.it_fba_fees} onBlur={this.handleInput}/></td>
   <td><input type="number" name= "de_fba_fees" ref="de_fba_fees" defaultValue={this.state.de_fba_fees} onBlur={this.handleInput}/></td>
   <td><input type="number" name= "es_fba_fees" ref="es_fba_fees" defaultValue={this.state.es_fba_fees} onBlur={this.handleInput}/></td>
  </tr>
  <br/>
  <tr><td>Referral Fees</td>
  <td><input type="number" name= "uk_ref_fees" ref="uk_ref_fees" value={(this.state.uk_prime_price>0?this.state.uk_prime_price*this.state.ref_rate:0).toFixed(2)} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "fr_ref_fees" ref="fr_ref_fees" value={(this.state.fr_prime_price>0?this.state.fr_prime_price*this.state.ref_rate:0).toFixed(2)} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "it_ref_fees" ref="it_ref_fees" value={(this.state.it_prime_price>0?this.state.it_prime_price*this.state.ref_rate:0).toFixed(2)} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "de_ref_fees" ref="de_ref_fees" value={(this.state.de_prime_price>0?this.state.de_prime_price*this.state.ref_rate:0).toFixed(2)} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "es_ref_fees" ref="es_ref_fees" value={(this.state.es_prime_price>0?this.state.es_prime_price*this.state.ref_rate:0).toFixed(2)} onBlur={this.handleInput}/></td>
 </tr>
 <br/>
  <tr><td>Profit</td>
  <td><input type="number" name= "uk_profit" ref="uk_profit" value={this.state.uk_profit} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "fr_profit" ref="fr_profit" value={this.state.fr_profit} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "it_profit" ref="it_profit" value={this.state.it_profit} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "de_profit" ref="de_profit" value={this.state.de_profit} onBlur={this.handleInput}/></td>
  <td><input type="number" name= "es_profit" ref="es_profit" value={this.state.es_profit} onBlur={this.handleInput}/></td>
 </tr>
 <br/>
 <tr><td>ROI</td>
 <td><input type="number" name= "uk_roi" ref="uk_roi" value={this.state.uk_roi} onBlur={this.handleInput}/></td>
 <td><input type="number" name= "fr_roi" ref="fr_roi" value={this.state.fr_roi} onBlur={this.handleInput}/></td>
 <td><input type="number" name= "it_roi" ref="it_roi" value={this.state.it_roi} onBlur={this.handleInput}/></td>
 <td><input type="number" name= "de_roi" ref="de_roi" value={this.state.de_roi} onBlur={this.handleInput}/></td>
 <td><input type="number" name= "es_roi" ref="es_roi" value={this.state.es_roi} onBlur={this.handleInput}/></td>
</tr>
<br/>
<tr><td>Min Price(15% ROI)</td>
<td><input type="number" name= "uk_minprice" ref="uk_minprice" value={this.state.uk_minprice} onBlur={this.handleInput}/></td>
<td><input type="number" name= "fr_minprice" ref="fr_minprice" value={this.state.fr_minprice} onBlur={this.handleInput}/></td>
<td><input type="number" name= "it_minprice" ref="it_minprice" value={this.state.it_minprice} onBlur={this.handleInput}/></td>
<td><input type="number" name= "de_minprice" ref="de_minprice" value={this.state.de_minprice} onBlur={this.handleInput}/></td>
<td><input type="number" name= "es_minprice" ref="es_minprice" value={this.state.es_minprice} onBlur={this.handleInput}/></td>
</tr>
<br/>
<tr><td>GPP 15% Price</td>
<td><input type="number" name= "uk_gpp15price" ref="uk_gpp15price" value={this.state.uk_gpp15price} onBlur={this.handleInput}/></td>
<td><input type="number" name= "fr_gpp15price" ref="fr_gpp15price" value={this.state.fr_gpp15price} onBlur={this.handleInput}/></td>
<td><input type="number" name= "it_gpp15price" ref="it_gpp15price" value={this.state.it_gpp15price} onBlur={this.handleInput}/></td>
<td><input type="number" name= "de_gpp15price" ref="de_gpp15price" value={this.state.de_gpp15price} onBlur={this.handleInput}/></td>
<td><input type="number" name= "es_gpp15price" ref="es_gpp15price" value={this.state.es_gpp15price} onBlur={this.handleInput}/></td>
</tr>
<br/>

<tr><td>Sales Rank</td>
<td><input type="number" name= "uk_sales_rank" ref="uk_sales_rank" value={this.state.uk_sales_rank} onBlur={this.handleInput}/></td>
<td><input type="number" name= "fr_sales_rank" ref="fr_sales_rank" value={this.state.fr_sales_rank} onBlur={this.handleInput}/></td>
<td><input type="number" name= "it_sales_rank" ref="it_sales_rank" value={this.state.it_sales_rank} onBlur={this.handleInput}/></td>
<td><input type="number" name= "de_sales_rank" ref="de_sales_rank" value={this.state.de_sales_rank} onBlur={this.handleInput}/></td>
<td><input type="number" name= "es_sales_rank" ref="es_sales_rank" value={this.state.es_sales_rank} onBlur={this.handleInput}/></td>
</tr>
<br/>
<tr><td>Monthly approx. sales</td>
<td><input type="number" name= "uk_monthly_approx_sales" ref="uk_monthly_approx_sales" onBlur={this.handleInput}/></td>
<td><input type="number" name= "fr_monthly_approx_sales" ref="fr_monthly_approx_sales" onBlur={this.handleInput}/></td>
<td><input type="number" name= "it_monthly_approx_sales" ref="it_monthly_approx_sales" onBlur={this.handleInput}/></td>
<td><input type="number" name= "de_monthly_approx_sales" ref="de_monthly_approx_sales" onBlur={this.handleInput}/></td>
<td><input type="number" name= "es_monthly_approx_sales" ref="es_monthly_approx_sales" onBlur={this.handleInput}/></td>
</tr>
<br/>
<tr><td>Keepa 90days Avg</td>
<td><input type="number" name= "uk_keepa_90avg" ref="uk_keepa_90avg" value={this.state.uk_keepa_90avg}/></td>
<td><input type="number" name= "fr_keepa_90avg" ref="fr_keepa_90avg" value={this.state.fr_keepa_90avg}/></td>
<td><input type="number" name= "it_keepa_90avg" ref="it_keepa_90avg" value={this.state.it_keepa_90avg}/></td>
<td><input type="number" name= "de_keepa_90avg" ref="de_keepa_90avg" value={this.state.de_keepa_90avg}/></td>
<td><input type="number" name= "es_keepa_90avg" ref="es_keepa_90avg" value={this.state.es_keepa_90avg}/></td>
</tr>
<br/>
<tr><td>Prime Seller Count</td>
<td><input type="number" name= "uk_fba_seller_count" ref="uk_fba_seller_count" value={this.state.uk_fba_seller_count}/></td>
<td><input type="number" name= "fr_fba_seller_count" ref="fr_fba_seller_count" value={this.state.fr_fba_seller_count}/></td>
<td><input type="number" name= "it_fba_seller_count" ref="it_fba_seller_count" value={this.state.it_fba_seller_count}/></td>
<td><input type="number" name= "de_fba_seller_count" ref="de_fba_seller_count" value={this.state.de_fba_seller_count}/></td>
<td><input type="number" name= "es_fba_seller_count" ref="es_fba_seller_count" value={this.state.es_fba_seller_count}/></td>
</tr>
<br/>
</table>

<div ref="recomdiv" className ="col-sm-5" style={{marginLeft:"20px",padding:"15px",lineHeight:"15px",boxShadow:"1px 2px 2px 3px silver",backgroundColor:"white",display:"none"}}>
<p style={{color:"#0A3971",letterSpacing:"3px",fontSize:"15px"}}>Recommendation & Inference</p>

<table id="recomTbl" className="table" style={{borderCollapse: "collapse",fontSize:"13px"}}>
<br/>
<tr>
<td style={{width:"500px"}}>Recommended quantity for a Month<br/>(Based on current no# of prime sellers)</td>
<td style={{width:"50px"}}/>
<td>{this.state.uk_recom_qty}</td>
</tr>
<br/>
<tr>
<td>Max ROI, Market, Sales</td>
<td style={{width:"50px"}}/>
<td>{Math.round(Number(this.state.top_roi))}{"%, "}{this.state.top_roi_mkt}{", "}{this.state.top_roi_mkt_sales}</td>
</tr>
<br/>
<tr>
<td>Max Sales, Market, ROI</td>
<td style={{width:"50px"}}/>
<td>{this.state.top_sales}{", "}{this.state.top_sales_mkt}{", "}{Math.round(Number(this.state.top_sales_mkt_roi))}{"%"}</td>
</tr>
</table>

</div>

<div style={{marginLeft:"auto",marginRight:"auto"}}>
  <button onClick = {this.addStockData} style={{marginLeft: "auto",marginRight:"auto",display:"block",letterSpacing:"2px",fontSize:"18px",backgroundColor:"#F37063",height:"40px",border:"none"}} className="btn btn-primary" disabled={this.state.submit_status}>Add Stock Data</button>

  <img ref="prodImg" style={{marginLeft:"auto",marginRight:"auto",marginTop:"50px",display:"none",height:"300px",boxShadow:"5px 5px 5px 5px silver",border:"none"}} src={imgUrl}/>

</div>
</form>
</div>
</div>
</div>
</div>
</div>
         

        </div>
        <Footer />
      </div>
    
      <ThemeCustomize />
      <ToastContainer />
    </Fragment>
)
}
}

// function mapStateToProps(state){

// // return{
// //   role:state.loginInfo.role,
// //   uname:state.loginInfo.uname
// // }
// };
export default AddStock;
//export default connect(state) (AddStock);
