import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';

const Layout = (props) => {
  return (
    <Container fluid>
      <Row className='layout-margin'>
        <Col>
          <Header />
        </Col>
      </Row>
      {props.children}
    </Container>
  );
}

export default Layout;