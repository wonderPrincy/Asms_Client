import React, { Fragment } from 'react';
import Breadcrumb from '../../../common/breadcrumb/breadcrumb'
import {Container,Row,Col,Card,CardHeader,CardBody,Form,FormGroup} from 'reactstrap'
import TimePickerTwo from './timepicker-two';
import TimePickerOne from './timepicker-one';
import TimePickerThree from './timepicker-three';
import TimePickerFour from './timepicker-four';
const Timepicker = (props)  => {
    return (
        <Fragment>
        <Breadcrumb parent="Forms / Form Widgets"  title="Time Picker"/>
        <Container fluid={true}>
        <Row>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Default:</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerTwo />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Time Picker with Dark Theme</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerOne />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Set Classic Theme</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form">
                  <FormGroup className="mb-0">
                    <TimePickerFour />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Set Multiple Timepicker</h5>
              </CardHeader>
              <CardBody>
                <div className="clearfix">
                  <Form className="theme-form">
                    <FormGroup className="mb-0">
                      <TimePickerThree />
                    </FormGroup>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>   
      </Fragment>
    );
}

export default Timepicker;