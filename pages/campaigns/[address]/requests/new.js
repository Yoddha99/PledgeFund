import { withRouter } from 'next/router';
import React from 'react';
import { Col, Row, Form, Button, Spinner, InputGroup, Alert } from 'react-bootstrap';
import Layout from '../../../../components/Layout';
import web3 from '../../../../ethereum/web3';
import Campaign from '../../../../ethereum/campaign';
import Head from 'next/head';
import Router from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';

class RequestNew extends React.Component {

  static async getInitialProps(context) {
    const address = context.query.address;
    return { address };
  }

  state = {
    errorMessage: '',
    isLoading: '',
    amount: '',
    description: '',
    recipient: ''
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: '',
      isLoading: true
    });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      toast.info("It may take up to 15 seconds to process once the transaction is sent!"), {
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      await campaign.methods.createRequest(this.state.description,
        web3.utils.toWei(this.state.amount, 'ether'),
        this.state.recipient)
        .send({
          from: accounts[0],
        });

      toast.success("New request created successfully!"), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      Router.push(`/campaigns/${this.props.address}/requests`);
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
  }

  render() {
    return (
      <>
        <Head>
          <title>New Request - {this.props.address}</title>
        </Head>
        <Layout>
          <Row className='layout-margin'>
            <Col>
              <Link href={`/campaigns/${this.props.address}/requests`}>
                <span style={{ textDecoration: 'none', color: '#1054e6', cursor: 'pointer' }}>
                  Back
                </span>
              </Link>
            </Col>
          </Row>
          <Row className='layout-margin'>
            <Col>
              <h3>Create a request</h3>
            </Col>
          </Row>
          <Row className='layout-margin'>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description<span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control required
                      type="text"
                      value={this.state.description}
                      onChange={e => { this.setState({ description: e.target.value }) }}
                      aria-label="Describe the purpose of this request"
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount to be requested in Ether<span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control required
                      type="text"
                      value={this.state.amount}
                      onChange={e => { this.setState({ amount: e.target.value }) }}
                      aria-label="Please enter the amount to be requested"
                    />
                    <InputGroup.Text>ether</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="recipient">
                  <Form.Label>Address of the recipient<span style={{ color: 'red' }}>*</span></Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control required
                      type="text"
                      value={this.state.recipient}
                      onChange={e => { this.setState({ recipient: e.target.value }) }}
                      aria-label="Please enter the address of the recipient"
                    />
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
                    : "Create!"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Layout>
      </>
    );
  }
}

export default withRouter(RequestNew);