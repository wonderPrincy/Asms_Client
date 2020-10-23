import React, { Fragment, useState, useEffect, useRef } from "react";
import Breadcrumb from "../.././common/breadcrumb/breadcrumb";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button, Media } from "reactstrap";
import Tabs from "./tabsets";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getSingleItem } from "../../../redux/product/action";
const Productpage = (props) => {
  const history = useHistory();
  const [state, setState] = useState({ nav1: null, nav2: null });
  // eslint-disable-next-line
  const [quantity, Setquantity] = useState(1);

  const slider1 = useRef();
  const slider2 = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleItem());
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [dispatch]);
  const { nav1, nav2 } = state;
  const singleItem = useSelector((content) => content.data.singleItem);
  const symbol = useSelector((content) => content.data.symbol);
  const addcart = (product, qty) => {
    history.push(`${process.env.PUBLIC_URL}/ecommerce-app/cart`);
    dispatch(addToCart(product, qty));
  };
  const buyProduct = (product, qty) => {
    history.push(`${process.env.PUBLIC_URL}/ecommerce-app/checkout`);
    dispatch(addToCart(product, qty));
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Product Page" />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <Row className="product-page-main">
                <Col xl="4">
                  <Slider
                    asNavFor={nav2}
                    arrows={false}
                    ref={(slider) => (slider1.current = slider)}
                    className="product-slider"
                  >
                    {singleItem.variants ? (
                      singleItem.variants.map((item, i) => {
                        return (
                          <div className="item" key={i}>
                            <Media
                              src={item.images}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <Media
                        src={singleItem.img}
                        alt=""
                        className="img-fluid"
                      />
                    )}
                  </Slider>

                  <Slider
                    asNavFor={nav1}
                    ref={(slider) => (slider2.current = slider)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    infinite={true}
                    className="small-slick"
                  >
                    {singleItem.variants
                      ? singleItem.variants.map((item, i) => {
                          return (
                            <div className="item" key={i}>
                              <Media
                                src={item.images}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                          );
                        })
                      : ""}
                  </Slider>
                </Col>
                <Col xl="8">
                  <div className="product-page-details">
                    <h5>Fusion white & blue printed regular fit asymmetric</h5>
                  </div>
                  <hr />
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters,It is a long
                    established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout. The
                    point of using Lorem Ipsum is that it has a more-or-less
                    normal distribution of letters
                  </p>
                  <div className="product-price digits">
                    <del>
                      {symbol}
                      {singleItem.discountPrice}
                    </del>
                    {symbol}
                    {singleItem.price}
                  </div>
                  <hr />
                  <div>
                    <Table className="product-page-width" borderless>
                      <tbody>
                        <tr>
                          <td>Brand :</td>
                          <td>{singleItem.tags}</td>
                        </tr>
                        <tr>
                          <td>Availability :</td>
                          <td className="in-stock">{singleItem.stock}</td>
                          <td
                            className="out-of-stock"
                            style={{ display: "none" }}
                          >
                            Out Of stock
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <hr />
                  <ul className="product-color m-t-15">
                    <li className="bg-primary"></li>
                    <li className="bg-secondary"></li>
                    <li className="bg-success"></li>
                    <li className="bg-info"></li>
                    <li className="bg-warning"></li>
                  </ul>
                  <div className="m-t-15">
                    <Button
                      color="primary-gradien"
                      className="m-r-10"
                      onClick={() => addcart(singleItem, quantity)}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      color="success-gradien"
                      className="m-r-10"
                      onClick={() => buyProduct(singleItem, quantity)}
                    >
                      Buy Now
                    </Button>
                    <Link
                      to={`${process.env.PUBLIC_URL}/ecommerce-app/product`}
                      className="secondary-gradien"
                    >
                      <Button color="secondary-gradien">
                        continue shopping{" "}
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Productpage;
