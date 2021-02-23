import React, { Fragment, useState, useEffect } from "react";
import ReadMoreReact from 'read-more-react';
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
import NavItem from "reactstrap/lib/NavItem";
const SellerProducts = (props) => {
  // eslint-disable-next-line

  const [selectedSeller, setselectedSeller] = useState(null);
  const [amazonSellerResponseUK, set_amazonSellerResponseUK] = useState(null);
  const [isLoading, set_IsLoading] = useState(false);
  const sellerAsinlist = [];
  const sellerProductlist = [];
  const [products, set_products] = useState([]);
  const [asins, set_asins] = useState([null]);
  const [html, set_html] = useState(null);
  const sellerProductDeatils = {
    "Name": null,
    "Image": null,
    "PrimePrice": null,
    "BuyBoxPrice": null,
  }
  useEffect(() => {
    //onloadmethod()
  }, []);
  useEffect(() => {
    // onloadmethod()
    console.log(products);
    // if (asins != null)
    //   GetAsinsData(obj);
  }, [sellerAsinlist, asins, products]);
  const handleInput = (e) => {
    set_IsLoading(true);
    set_products([]);
    var url_uk = 'https://api.keepa.com/seller?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&seller=' + e.target.value + '&storefront=1&update=48';
    console.log(url_uk);
    fetch(url_uk)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((data) => {
        var sellersData = data.sellers;
        const obj = Object.keys(sellersData).reduce((tmp, x) => {
          tmp[x] = sellersData[x] || 'Error';
          console.log(tmp[x].asinList);
          return tmp[x].asinList;
        }, {});
        if (obj != null)
          GetAsinsData(obj);
        else
          set_IsLoading(false);
      });
  }
  const GetAsinsData = (asins) => {
    console.log(asins);

    let requests = asins.map(asin => {
      //create a promise for each API call
      new Promise((resolve, reject) => {
        fetch('https://api.keepa.com/product?key=hkn5eb01r375qna8uo7kuctociral8m10bltq01kl8ofgnk31kcacfrf8n52r4e9&domain=2&asin=' + asin + '&offers=20&fbafees=1&rating=1&stats=180&history=0')
          .then(res => res.json())
          .then((data) => {
            //console.log(data);
            var title = data.products[0].title;
            var ean = data.products[0].eanList != null ? data.products[0].eanList[0] : "";
            var upc = data.products[0].upcList != null ? data.products[0].upcList[0] : "";
            var brand = data.products[0].brand;
            var Manfacturer = data.products[0].manufacturer;
            var productGroup = data.products[0].productGroup;
            var availability = data.products[0].availabilityAmazon;
            var rank = data.products[0].stats.current[3];
            var sellerCount = data.products[0].stats.offerCountFBA;
            var description=data.products[0].description;
            var image = "https://images-na.ssl-images-amazon.com/images/I/" + (data.products[0].imagesCSV.split(','))[0];
            var primePrice = (((data.products[0].stats.current[0] != -1) ? data.products[0].stats.current[0] : data.products[0].stats.current[10]) / 100).toFixed(2);
            var buyBoxPrice = ((data.products[0].stats.buyBoxPrice) / 100).toFixed(2);
            var newvalue={ asin, title,description, ean, upc, brand, Manfacturer, productGroup, availability, rank, sellerCount, image, primePrice, buyBoxPrice };
            console.log(newvalue);
            sellerProductlist.push({ asin, title, ean, upc, brand, Manfacturer, productGroup, availability, rank, sellerCount, image, primePrice, buyBoxPrice });
           // set_products(sellerProductlist);
            set_products(oldArray => [...oldArray, newvalue]);
          //  sellerProductlist.push(sellerProductlist[sellerProductlist.length - 1] + 1)
           // setArray(tmpArray)
          })
      });
      console.log(products);
    })
    set_IsLoading(false);

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
            <div className="container">
              <div className="row">
                <div className="col col-6">
                  <input type="text" className="btn-pill form-control" name="asin"
                    placeholder="Search here ..." onBlur={(e) => handleInput(e)}
                    onChange={(e) => setselectedSeller(e.target.value)} />
                </div>
              </div>
            </div>
            {/* <div>{JSON.stringify(products, null, 2)}</div> */}
            <div className="product_grid">
              <ul className="product_list list">
                {
                  products.map((item, index) => (
                    <li className="product_item" key={index}>
                      <div className="product_image">
                        <a href="#"><img src={item.image} alt="" /></a>
                        <div className="product_buttons">
                          <button className="product_heart"><i className="fa fa-heart"></i></button>
                          <button className="product_compare"><i className="fa fa-random"></i></button>
                          <button className="add_to_cart"><i className="fa fa-shopping-cart"></i></button>
                          <div className="quick_view">
                            <a href="#"><h6>Quick View</h6></a>
                          </div>
                        </div>
                      </div>
                      <div className="product_values">
                        <div className="product_title">
                          <h5>{item.title}</h5>
                        </div>
                        <div className="product_price">
                          <a href="#"> <span className="price_new">{item.buyBoxPrice}</span></a>
                          <span className="product_rating">{item.brand}</span>
                          <span className="product_rating">{item.manufacturer}</span>
                        </div>
                        <div className="product_desc">
                          {/* <p className="truncate">{item.description}</p> */}
                          <ReadMoreReact text={item.description}
         />
                        </div>
                        <div className="product_buttons">
                          <a href="#">Buy Now</a>
                        </div>
                      </div>
                    </li>
                  ))
                  //   // : <span> No product exist</span>
                }
              </ul>
            </div>
          </Row>

        </LoadingOverlay>
      </Container>

    </Fragment>
  );
};

export default SellerProducts;