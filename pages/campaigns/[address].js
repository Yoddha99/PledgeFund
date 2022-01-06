import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { withRouter } from 'next/router';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import Router from 'next/router';

class CampaignShow extends React.Component {

  static async getInitialProps(context) {
    const campaign = Campaign(context.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: context.query.address,
      minimumContribution: summary['0'],
      balance: summary['1'],
      requestsCount: summary['2'],
      approversCount: summary['3'],
      manager: summary['4']
    };
  }

  renderCards() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    } = this.props;

    return (
      <>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Address of Manager</Card.Header>
            <Card.Body>
              <Card.Title> {manager} </Card.Title>
              <Card.Text>
                The manager created this campaign & can create requests to withdraw money.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Minimum Contribution (wei)</Card.Header>
            <Card.Body>
              <Card.Title> {minimumContribution} </Card.Title>
              <Card.Text>
                You must contribute atleast this much wei to become an approver.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Number of Requests</Card.Header>
            <Card.Body>
              <Card.Title> {requestsCount} </Card.Title>
              <Card.Text>
                A request tries to withdraw money from the contract. Requests
                must be approved by the approvers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Number of Approvers</Card.Header>
            <Card.Body>
              <Card.Title> {approversCount} </Card.Title>
              <Card.Text>
                Number of people who have already donated to this campaign.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '100%' }}>
            <Card.Header>Balance</Card.Header>
            <Card.Body>
              <Card.Title> {web3.utils.fromWei(balance, 'ether')} </Card.Title>
              <Card.Text>
                The balance is how much money this campaign has left to spend.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </>

    );

  }

  render() {
    return (
      <Layout>
        <Row className='layout-margin'>
          <Col>
            <h3>Campaign Details</h3>
          </Col>
        </Row>
        <Row className="layout-margin">
          <Col sm={6}>
            <Row xs={1} md={2} className="g-4 mb-3">
              {this.renderCards()}
            </Row>
            
            <Button variant="dark" size="md" onClick={() => { Router.push(`/campaigns/${this.props.address}/requests`) }}>
                View Requests
            </Button>
          </Col>
          <Col sm={1}></Col>
          <Col sm={5}>
            <ContributeForm address={this.props.address} />
          </Col>
        </Row>
      </Layout>
    )
  }
}

export default withRouter(CampaignShow);