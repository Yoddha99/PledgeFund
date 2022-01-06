import React from 'react';
import { Row, Col, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Router from 'next/router';
import Head from 'next/head';
import { toast } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';


class CampaignNew extends React.Component {

  state = {
    minimumContribution: '',
    errorMessage: '',
    isLoading: false,
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: '',
      isLoading: true
    });

    try {
      const accounts = await web3.eth.getAccounts();

      toast.info("It may take up to 15 seconds to process once the transaction is sent!"), {
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      await factory.methods.createCampaign(this.state.minimumContribution).send({
        from: accounts[0]
      });

      toast.success("Campaign Created Successfully!"), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      Router.push('/');
    } catch (err) {

      this.setState({ errorMessage: err.message });

      toast.error(err.message), {
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };
    } finally {
      this.setState({ isLoading: false });
    }

  };

  render() {

    return (
      <>
      <Head>
        <title>New Campain - PledgeFund</title>
      </Head>
        <Layout>
          <Row className="layout-margin">
            <Col >
              <span style={{ fontSize: '20px' }}>Create a new campaign!</span>
            </Col>
          </Row>
          <Row className="layout-margin">
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-3" controlId="minContrib">
                  <Form.Label>Minimum Contribution<span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control required
                      type="text"
                      value={this.state.minimumContribution}
                      onChange={e => { this.setState({ minimumContribution: e.target.value }) }}
                      aria-label="Minimum Contribution in wei"
                    />
                    <InputGroup.Text>wei</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {this.state.errorMessage ?
                  (<Alert key={this.state.errorMessage} variant='danger'>
                    {this.state.errorMessage}
                  </Alert>)
                  : ''
                }
                <Button variant="primary" type="submit" disabled={this.state.isLoading}>
                  {this.state.isLoading ?
                    (<><Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> Loading...</>)
                    : "Create"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Layout>
      </>
    );
  }
}

export default CampaignNew;
