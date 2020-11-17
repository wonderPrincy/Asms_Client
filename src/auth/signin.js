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

const Signin = (props) => {
  //login parameters
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  //sign up parameters
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(localStorage.getItem("profileURL" || man));
  const [name, setName] = useState(
    localStorage.getItem("Name") || "Elana Saint"
  );
  const [isuser, setisuser] = useState(localStorage.getItem("isUser") || true);
  const [role, setRole] = useState("");

  useEffect(() => {
    localStorage.setItem("profileURL", value);
    localStorage.setItem("Name", name);
    localStorage.setItem("isUser", isuser);
    localStorage.setItem("email", email);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
  }, [value, name, isuser, email, id, role]);

  // verify user here
  if (props.match.path == "/stockmanage") {
    try {
      var doc = {};
      doc["Email"] = props.match.params.id;
      // var url = '/verifyUser';
      var url = 'http://localhost:5000/verifyUser';
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
            setValue(man);
            setName(user.Name);
            setEmail(user.Email);
            setId(user._id);
            setRole(user.Role);
            setisuser("true");
            app.auth().signInWithEmailAndPassword(user.Email, user.Password);
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }
          else {
            setTimeout(() => {
              toast.error(
                data.Error
              );
            }, 200);
          }
        });
    }
    catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  }
  //end here verification of user
  // toggle between sign up and login
  const handleClick = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  }
  // end here
  /// login start here
  const loginAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await app.auth().signInWithEmailAndPassword(email, password);
      var doc = {};
      doc["Email"] = email;
      doc["Password"] = password;
      // var url = '/loggedInUser';
      var url = 'http://localhost:5000/loggedInUser';
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
          setLoading(false);
          return response.json();
        })
        .then((data) => {
          if (data.Error == null) {
            var user = data[0];
            console.log(user);
            setValue(man);
            setName(user.Name);
            setEmail(user.Email);
            setId(user._id);
            setRole(user.Role);
            setisuser("true");
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }
          else {
            setTimeout(() => { toast.error(data.Error); }, 200);
          }
        });
    }
    catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  // logged in end here
  // signup  start here -- in this just saved data in database and create user with firebase, sent email to user to verify account
  const signupnAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (firstname === '' && lastname === '' && email === '' && password === '') {
        toast.error(
          "All fields are required"
        );
      }
      var doc = {};
      doc["Name"] = firstname + " " + lastname;
      doc["Email"] = email;
      doc["Password"] = password;
      doc["Verified"] = false;
      doc["Role"] = "Admin";
      doc["ReferenceId"] = null;
      doc["SocialAccount"] = false;
      // var url = '/addUser';
      var url = 'http://localhost:5000/addUser';
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
          setLoading(false);
          return response.json();
        })
        .then((data) => {
          if (data.Error == null) {
            app.auth().createUserWithEmailAndPassword(email, password);
            setTimeout(() => { toast.success("Sent you an verfication email"); }, 200);
          }
          else {
            setTimeout(() => { toast.error(data.Error); }, 200);
          }
        })
        // .catch(function (res) { 
        //   setTimeout(() => {
        //     toast.error(
        //     res
        //     );
        //   }, 200);
        // })
    }
    catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
        console.log(error);
      }, 200);
    }
  };
  //end here sign  up authentication

  // social authentication start here for signup and login
  const googleSignUpAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(googleProvider)
        .then(function (result) {
          var doc = {};
          doc["Name"] = result.user.displayName;
          doc["Email"] = result.user.email;
          doc["Password"] = null;
          doc["Verified"] = true;
          doc["Role"] = "Admin";
          doc["ReferenceId"] = null;
          doc["SocialAccount"] = true;
          // var url = '/addUser';
          var url = 'http://localhost:5000/addUser';
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
              setLoading(false);
              return response.json();
            }).then((data) => {
              if (data.Error == null) {
                setValue(result.user.photoURL);
                setName(result.user.displayName);
                setEmail(result.user.email);
                setRole("Admin");
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            })
            .catch(function (res) { console.log(res) })
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          error
        );
      }, 200);
    }
  };
  const googleAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(googleProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setEmail(result.user.email);
          setisuser("true");
          var doc = {};
          doc["Email"] = email;
          doc["SocialAccount"] = true;
          // var url = '/socialloggedInUser';
          var url = 'http://localhost:5000/socialloggedInUser';
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
                setValue(man);
                setName(user.Name);
                setEmail(user.Email);
                setId(user._id);
                setRole(user.Role);
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            });
          // setTimeout(() => {
          //   props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          // }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  const facebookAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setEmail(result.user.email);
          setisuser("true");
          var doc = {};
          doc["Email"] = email;
          doc["SocialAccount"] = true;
          // var url = '/socialloggedInUser';
          var url = 'http://localhost:5000/socialloggedInUser';
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
                setValue(man);
                setName(user.Name);
                setEmail(user.Email);
                setId(user._id);
                setRole(user.Role);
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            });
          // setTimeout(() => {
          //   props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          // }, 200);

        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const facebookSignUpAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(facebookProvider)
        .then(function (result) {
          var doc = {};
          doc["Name"] = result.user.displayName;
          doc["Email"] = result.user.email;
          doc["Password"] = null;
          doc["Verified"] = true;
          doc["Role"] = "Admin";
          doc["ReferenceId"] = null;
          doc["SocialAccount"] = true;
          // var url = '/addUser';
          var url = 'http://localhost:5000/addUser';
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
            }).then((data) => {
              if (data.Error == null) {
                setValue(result.user.photoURL);
                setName(result.user.displayName);
                setEmail(result.user.email);
                setRole("Admin");
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            })
            .catch(function (res) { console.log(res) })
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const twitterAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName(result.user.displayName);
          setEmail(result.user.email);
          setisuser("true");
          var doc = {};
          doc["Email"] = email;
          doc["SocialAccount"] = true;
          // var url = '/socialloggedInUser';
          var url = 'http://localhost:5000/socialloggedInUser';
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
                setValue(man);
                setName(user.Name);
                setEmail(user.Email);
                setId(user._id);
                setRole(user.Role);
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            });
          // setTimeout(() => {
          //   props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          // }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const twitterSignUpAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(twitterProvider)
        .then(function (result) {
          var doc = {};
          doc["Name"] = result.user.displayName;
          doc["Email"] = result.user.email;
          doc["Password"] = null;
          doc["Verified"] = true;
          doc["Role"] = "Admin";
          doc["ReferenceId"] = null;
          doc["SocialAccount"] = true;
          // var url = '/addUser';
          var url = 'http://localhost:5000/addUser';
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
            }).then((data) => {
              if (data.Error == null) {
                setValue(result.user.photoURL);
                setName(result.user.displayName);
                setEmail(result.user.email);
                setRole("Admin");
                setisuser("true");
                props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
              }
              else {
                setTimeout(() => { toast.error(data.Error); }, 200);
              }
            })
            .catch(function (res) { console.log(res) })
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };
  const githubAuth = async () => {
    try {
      app
        .auth()
        .signInWithPopup(githubProvider)
        .then(function (result) {
          setValue(result.user.photoURL);
          setName("Hardik Parmar");
          setisuser("true");
          setTimeout(() => {
            props.history.push(`${process.env.PUBLIC_URL}/dashboard/default`);
          }, 200);
        });
    } catch (error) {
      setTimeout(() => {
        toast.error(
          "Oppss.. The password is invalid or the user does not have a password."
        );
      }, 200);
    }
  };

  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/*  <!-- login page start--> */}
        <div className="authentication-main m-0 only-login">
          <Row>
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody className="h-100-d-center">
                    <div className="cont text-center b-light">
                      <div>
                        <Form className="theme-form">
                          <h4>LOGIN</h4>
                          <h6>Enter your Username and Password</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Your Username
                            </Label>
                            <Input
                              className="btn-pill form-control"
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Email address"
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">Password</Label>
                            <Input
                              className="btn-pill form-control"
                              type="password"
                              name="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Password"
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">Remember me</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            {loading ? (
                              <Button
                                color="primary btn-block"
                                disabled={loading}
                              >
                                LOADING...
                              </Button>
                            ) : (
                                <Button
                                  color="primary btn-block"
                                  onClick={(event) => loginAuth(event)}
                                >
                                  LOGIN
                                </Button>
                              )}
                            {/* <Button color="primary btn-block"> LOGIN</Button> */}
                          </FormGroup>
                          <div className="login-divider"></div>
                          <div className="social mt-3">
                            <Row form className="btn-showcase">
                              <Col md="4" sm="6">
                                <Button
                                  color="social-btn btn-fb"
                                  onClick={facebookAuth}
                                >
                                  Facebook
                                </Button>
                              </Col>
                              <Col md="4" sm="6">
                                <Button
                                  color="social-btn btn-twitter"
                                  onClick={twitterAuth}
                                >
                                  Twitter
                                </Button>
                              </Col>
                              <Col md="4" sm="6">
                                <Button
                                  color="social-btn btn-google"
                                  onClick={googleAuth}
                                >
                                  Google +{" "}
                                </Button>
                              </Col>
                              {/* <Col md="3" sm="6">
                                <Button
                                  color="social-btn btn-github"
                                  onClick={githubAuth}
                                  style={{
                                    backgroundColor: "#8d6e63",
                                    color: "#fff",
                                  }}
                                >
                                  Github
                                </Button>
                              </Col> */}
                            </Row>
                          </div>
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h2>New User?</h2>
                            <p>
                              Sign up and discover great amount of new
                              opportunities!
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>
                              If you already has an account, just sign in. We've
                              missed you!
                            </p>
                          </div>
                          <div className="img__btn" onClick={handleClick}>
                            <span className="m--up">
                              {/* <a href={`${process.env.PUBLIC_URL}/pages/register`} class="active" style={{color:"white"}} target="_blank">Sign up</a> */}
                              {/* <NavLink to={{ pathname: '/pages/register', component: {Register} }} style={{color:"white"}} >Sign up</NavLink> */}
                              {/* <Link to={`${process.env.PUBLIC_URL}/pages/register`}  style={{color:"white"}}>Sign up</Link> */}
                            Sign up
                            </span>
                            <span className="m--in">Sign in</span>
                          </div>
                        </div>
                        <div>
                          <Form className="theme-form">
                            <h4 className="text-center">NEW USER</h4>
                            <h6 className="text-center">
                              Enter your Username and Password For Signup
                            </h6>
                            <Row form>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill form-control"
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill form-control"
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Input
                                className="btn-pill form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <Input
                                className="btn-pill form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                              />
                            </FormGroup>
                            <Row form>
                              <Col sm="4">
                                {loading ? (
                                  <Button
                                    color="primary btn-block"
                                    disabled={loading}
                                  >
                                    LOADING...
                                  </Button>
                                ) : (
                                    <Button
                                      color="primary btn-block"
                                      onClick={(event) => signupnAuth(event)}
                                    >
                                      Sign Up
                                    </Button>
                                  )}
                              </Col>
                              <Col sm="8">
                                <div className="text-left mt-2 m-l-20">
                                  Are you already user?
                                  <a
                                    className="btn-link text-capitalize"
                                    href={`${process.env.PUBLIC_URL}/login/:id`}
                                  >
                                    Login
                                  </a>
                                </div>
                              </Col>
                            </Row>
                            <div className="form-divider"></div>
                            <div className="social mt-3">
                              <div className="form-row btn-showcase">
                                <Col sm="4">
                                  <Button color="social-btn btn-fb" onClick={facebookSignUpAuth}>
                                    Facebook
                                  </Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-twitter" onClick={twitterSignUpAuth}>
                                    Twitter
                                  </Button>
                                </Col>
                                <Col sm="4">
                                  <Button color="social-btn btn-google"
                                    onClick={googleSignUpAuth}>
                                    Google +
                                  </Button>
                                </Col>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <ToastContainer />
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Signin;
