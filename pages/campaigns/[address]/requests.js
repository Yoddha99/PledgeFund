import React from 'react';
import Layout from '../../../components/Layout';
import { withRouter } from 'next/router';
import { Row, Col, Button, Table } from 'react-bootstrap';
import Router from 'next/router';
import Campaign from '../../../ethereum/campaign';
import Head from 'next/head';
import web3 from '../../../ethereum/web3';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends React.Component {

  static async getInitialProps(context) {
    const address = context.query.address;

    const campaign = Campaign(context.query.address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const campaignBalance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call();
      })
    );

    return { address, requests, requestCount, approversCount, campaignBalance };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          balance={this.props.campaignBalance}
          approversCount={this.props.approversCount}
          address={this.props.address}
        />
      )
    });
  }

  render() {


    return (
      <>
        <Head>
          <title>Campaign Requests - {this.props.address}</title>
        </Head>
        <Layout>
          <Row className='layout-margin'>
            <Col sm={10}>
              <h3>Requests</h3>
            </Col>
            <Col sm={2}>
              <div className="d-grid gap-2">
                <Button variant="dark" size="md" onClick={() => { Router.push(`/campaigns/${this.props.address}/requests/new`) }}>
                  Add Request
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="layout-margin">
            <Col>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Description</th>
                    <td>Balance (Ether)</td>
                    <th>Amount (Ether)</th>
                    <th>Recipient</th>
                    <th>Approval Count</th>
                    <th>Approve</th>
                    <th>Finalize</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRows()}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Layout>
      </>
    );
  }
}

export default withRouter(RequestIndex);