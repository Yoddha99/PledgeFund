import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Head from 'next/head';
import Header from './Header';

const Layout = (props) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/static/images/donation.png" sizes="32x32" />
      </Head>
      <Container fluid>
        <Row className='layout-margin'>
          <Col>
            <Header />
          </Col>
        </Row>
        {props.children}
      </Container>
    </>
  );
}

export default Layout;