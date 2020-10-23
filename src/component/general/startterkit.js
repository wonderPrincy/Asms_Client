import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const Startterkit = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Starter-kit" title="" />
      <Container fluid={true}>
        <Row className="starter-main">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Kick start your project development !</h5>
                <div className="card-header-right">
                  <ul className="list-unstyled card-option">
                    <li>
                      <i className="icofont icofont-double-left"></i>
                    </li>
                    <li>
                      <i className="view-html fa fa-code"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-maximize full-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-minus minimize-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-refresh reload-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-error close-card"></i>
                    </li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  Getting start with your project custom requirements using a
                  ready template which is quite difficult and time taking
                  process, Poco Admin provides useful features to kick start
                  your project development with no efforts !
                </p>
                <ul>
                  <li>
                    <p>
                      Poco Admin provides you getting start pages with different
                      layouts, use the layout as per your custom requirements
                      and just change the branding, menu & content.
                    </p>
                  </li>
                  <li>
                    <p>
                      Every components in Poco Admin are decoupled, it means use
                      only components you actually need! Remove unnecessary and
                      extra code easily just by excluding the path to specific
                      SCSS, JS file.
                    </p>
                  </li>
                  <li>
                    <p>
                      It use PUG as template engine to generate pages and whole
                      template quickly using node js. Save your time for doing
                      the common changes for each page (i.e menu, branding and
                      footer) by generating template with pug.
                    </p>
                  </li>
                </ul>
                <div className="code-box-copy">
                  <button
                    className="code-box-copy__btn btn-clipboard"
                    data-clipboard-target="#example-head"
                    title="Copy"
                  >
                    <i className="icofont icofont-copy-alt"></i>
                  </button>
                  <pre>
                    <code className="language-html" id="example-head">
                      &lt;!-- Cod Box Copy begin --&gt; &lt;p&gt;Getting start
                      with your project custom requirements using a ready
                      template which is quite difficult and time taking process,
                      Poco Admin provides useful features to kick start your
                      project development with no efforts !&lt;/p&gt; &lt;ul&gt;
                      &lt;li&gt;&lt;p&gt;Poco Admin provides you getting start
                      pages with different layouts, use the layout as per your
                      custom requirements and just change the branding, menu &
                      content.&lt;/p&gt;&lt;/li&gt; &lt;li&gt;&lt;p&gt;Every
                      components in Poco Admin are decoupled, it means use only
                      components you actually need! Remove unnecessary and extra
                      code easily just by excluding the path to specific SCSS,
                      JS file.&lt;/p&gt;&lt;/li&gt; &lt;li&gt;&lt;p&gt;It use
                      PUG as template engine to generate pages and whole
                      template quickly using node js. Save your time for doing
                      the common changes for each page (i.e menu, branding and
                      footer) by generating template with
                      pug.&lt;/p&gt;&lt;/li&gt; &lt;/ul&gt; &lt;!-- Cod Box Copy
                      end --&gt;
                    </code>
                  </pre>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>What is starter kit ?</h5>
                <div className="card-header-right">
                  <ul className="list-unstyled card-option">
                    <li>
                      <i className="icofont icofont-double-left"></i>
                    </li>
                    <li>
                      <i className="view-html fa fa-code"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-maximize full-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-minus minimize-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-refresh reload-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-error close-card"></i>
                    </li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  Starter kit is a set of pages with different layouts, useful
                  for your next project to start development process from
                  scratch with no time.
                </p>
                <ul>
                  <li>
                    <p>Each layout includes basic components only.</p>
                  </li>
                  <li>
                    <p>
                      Select your choice of layout from starter kit, customize
                      it with optional changes like colors and branding, add
                      required dependency only.
                    </p>
                  </li>
                  <li>
                    <p>
                      Using template engine to generate whole template quickly
                      with your selected layout and other custom changes.{" "}
                    </p>
                  </li>
                </ul>
                <div className="code-box-copy">
                  <button
                    className="code-box-copy__btn btn-clipboard"
                    data-clipboard-target="#example-head1"
                    title="Copy"
                  >
                    <i className="icofont icofont-copy-alt"></i>
                  </button>
                  <pre>
                    <code className="language-html" id="example-head1">
                      &lt;!-- Cod Box Copy begin --&gt; &lt;p&gt;Starter kit is
                      a set of pages with different layouts, useful for your
                      next project to start development process from scratch
                      with no time. &lt;/p&gt; &lt;ul&gt;
                      &lt;li&gt;&lt;p&gt;Each layout includes basic components
                      only.&lt;/p&gt;&lt;/li&gt; &lt;li&gt;&lt;p&gt;Select your
                      choice of layout from starter kit, customize it with
                      optional changes like colors and branding, add required
                      dependency only.&lt;/p&gt;&lt;/li&gt;
                      &lt;li&gt;&lt;p&gt;Using template engine to generate whole
                      template quickly with your selected layout and other
                      custom changes.&lt;/p&gt;&lt;/li&gt; &lt;/ul&gt; &lt;!--
                      Cod Box Copy end --&gt;
                    </code>
                  </pre>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>How to use starter kit ?</h5>
                <div className="card-header-right">
                  <ul className="list-unstyled card-option">
                    <li>
                      <i className="icofont icofont-double-left"></i>
                    </li>
                    <li>
                      <i className="view-html fa fa-code"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-maximize full-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-minus minimize-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-refresh reload-card"></i>
                    </li>
                    <li>
                      <i className="icofont icofont-error close-card"></i>
                    </li>
                  </ul>
                </div>
              </CardHeader>
              <CardBody>
                <p>
                  <span className="f-w-600">HTML</span>
                </p>
                <p>
                  If you know just HTML, select your choice of layout from
                  starter kit folder, customize it with optional changes like
                  colors and branding, add required dependency only.
                </p>
                <p>
                  <span className="f-w-600">PUG</span>
                </p>
                <p>
                  To use PUG it required node.js and basic knowledge of using
                  it. Using PUG as template engine to generate whole template
                  quickly with your selected layout and other custom changes. To
                  getting start with PUG usage & template generating process
                  please refer template documentation.
                </p>
                <div className="alert alert-primary inverse" role="alert">
                  <i className="icon-info-alt"></i>
                  <h5>Tips!</h5>
                  <p>
                    Hideable navbar option is available for fixed navbar with
                    static navigation only. Works in top and bottom positions,
                    single and multiple navbars.
                  </p>
                </div>
                <div className="code-box-copy">
                  <button
                    className="code-box-copy__btn btn-clipboard"
                    data-clipboard-target="#example-head2"
                    title="Copy"
                  >
                    <i className="icofont icofont-copy-alt"></i>
                  </button>
                  <pre>
                    <code className="language-html" id="example-head2">
                      &lt;!-- Cod Box Copy begin --&gt; &lt;p&gt;&lt;span
                      className="f-w-600"&gt;HTML&lt;/span&gt;&lt;/p&gt;
                      &lt;p&gt;If you know just HTML, select your choice of
                      layout from starter kit folder, customize it with optional
                      changes like colors and branding, add required dependency
                      only.&lt;/p&gt; &lt;p&gt;&lt;span
                      className="f-w-600"&gt;PUG&lt;/span&gt;&lt;/p&gt;
                      &lt;p&gt;To use PUG it required node.js and basic
                      knowledge of using it. Using PUG as template engine to
                      generate whole template quickly with your selected layout
                      and other custom changes. To getting start with PUG usage
                      & template generating process please refer template
                      documentation.&lt;/p&gt; &lt;div className="alert
                      alert-primary inverse" role="alert"&gt; &lt;i
                      className="icon-info-alt"&gt;&lt;/i&gt;
                      &lt;h5&gt;Tips!&lt;/h5&gt; &lt;p&gt;Hideable navbar option
                      is available for fixed navbar with static navigation only.
                      Works in top and bottom positions, single and multiple
                      navbars.&lt;/p&gt; &lt;/div&gt; &lt;!-- Cod Box Copy end
                      --&gt;
                    </code>
                  </pre>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Simple Card</h5>
              </CardHeader>
              <CardBody>
                <h6>HTML Ipsum Presents</h6>
                <p>
                  <strong>Pellentesque habitant morbi tristique</strong>{" "}
                  senectus et netus et malesuada fames ac turpis egestas.
                  Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor
                  sit amet, ante. Donec eu libero sit amet quam egestas semper.{" "}
                  <em>Aenean ultricies mi vitae est.</em> Mauris placerat
                  eleifend leo. Quisque sit amet est et sapien ullamcorper
                  pharetra. Vestibulum erat wisi, condimentum sed,{" "}
                  <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                  fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                  orci, sagittis tempus lacus enim ac dui.{" "}
                  <a href="#javascript">Donec non enim</a> in turpis pulvinar
                  facilisis. Ut felis.
                </p>
                <h6>Header Level 2</h6>
                <ol>
                  <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  </li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                </ol>
                <blockquote>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                    eget ligula molestie gravida. Curabitur massa. Donec
                    eleifend, libero at sagittis mollis, tellus est malesuada
                    tellus, at luctus turpis elit sit amet quam. Vivamus pretium
                    ornare est.
                  </p>
                </blockquote>
                <h4>
                  Header Level<span className="digits"> 3</span>
                </h4>
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  </li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                </ul>
                <dl>
                  <dt>Definition list</dt>
                  <dd>
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </dd>
                  <dt>Lorem ipsum dolor sit amet</dt>
                  <dd>
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                  </dd>
                </dl>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <h5>With Header</h5>
              </CardHeader>
              <CardBody>
                <h5>Content title</h5>
                <p>
                  Add a heading to card with <code>.card-header</code> class
                </p>
                <p>
                  You may also include any &lt;h1&gt;-&lt;h6&gt; with a{" "}
                  <code>.card-header </code> & <code>.card-title</code> class to
                  add heading.
                </p>
                <p>
                  Jelly beans sugar plum cheesecake cookie oat cake soufflé.
                  Tart lollipop carrot cake sugar plum. Marshmallow wafer
                  tiramisu jelly beans.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader className="border-bottom-0">
                <h5>With Header & No Border</h5>
              </CardHeader>
              <CardBody>
                <h5>Content title</h5>
                <p>
                  Add a heading to card with <code>.card-header </code> class &
                  without header border<code>.border-bottom-0</code> class.
                </p>
                <p>
                  You may also include any &lt;h1&gt;-&lt;h6&gt; with a{" "}
                  <code>.card-header </code> & <code>.card-title</code> class to
                  add heading.
                </p>
                <p>
                  Gingerbread brownie sweet roll cheesecake chocolate cake jelly
                  beans marzipan gummies dessert. Jelly beans sugar plum
                  cheesecake cookie oat cake soufflé.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Startterkit;
