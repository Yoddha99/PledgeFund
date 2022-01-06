import React from 'react';
import factory from "../ethereum/factory";
import { Row, Col, CardGroup, Card, Button } from 'react-bootstrap';
import Router from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import 'font-awesome/css/font-awesome.min.css';


class CampaignIndex extends React.Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const cards = this.props.campaigns.map((address) => {
      return (
        <Row style={{ width: '-webkit-fill-available', marginBottom: '10px' }} key={address}>
          <Col lg={12} md={12} sm={12}>
            <Card>
              <Card.Body>
                <Card.Text>
                  {address}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  <span className="campaign-link">
                    <Link href={`/campaigns/${address}`}>View Campaign</Link>
                  </span>
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      );
    });

    return (<CardGroup>{cards}</CardGroup>);
  }

  render() {

    return (
      <Layout>
        <Row className="layout-margin">
          <Col >
            <h3>Open Campaigns</h3>
          </Col>
        </Row>
        <Row className='layout-margin'
          style={
            {
              marginTop: '20px !important'
            }
          }
        >
          <Col sm={9} style={{ textAlign: 'center' }}>
            {/* cards containing open campaigns */}
            {this.props.campaigns.length ? this.renderCampaigns() :
              (
                <Row style={{ width: '-webkit-fill-available', marginBottom: '10px' }}>
                  <Col lg={12} md={12} sm={12}>
                    <Card>
                      <Card.Body>
                        <Card.Text>
                          Wow, Such Empty!<br />
                          Sorry, No Open Campaigns To Show
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">
                          Please come back later :)
                        </small>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              )
            }


          </Col>
          <Col sm={3} style={{ textAlign: 'center' }}>
            <div className="d-grid gap-2">
              <Button variant="primary" className="mx-auto" size="lg" onClick={() => { Router.push('/campaigns/new') }}>
                <Row>
                  <Col sm={12} md={3} lg={2} className="my-auto">
                    <i className="fa fa-plus-circle"></i>
                  </Col>
                  <Col sm={12} md={9} lg={10} className="my-auto">
                    Create Campaign
                  </Col>
                </Row>
              </Button>
            </div>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default CampaignIndex;
