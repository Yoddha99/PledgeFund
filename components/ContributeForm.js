import React from 'react';
import { Form, Button, Spinner, InputGroup, Alert } from 'react-bootstrap';
import Router from 'next/router';
import web3 from '../ethereum/web3';
import { toast } from 'react-toastify';
import Campaign from '../ethereum/campaign';

class ContributeForm extends React.Component {

  state = {
    contribution: '',
    isLoading: false,
    errorMessage: ''
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

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.contribution, 'ether')
      });

      toast.success("Contributed to the campaign successfully!"), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };
      this.setState({
        contribution: ''
      });
      Router.push(`/campaigns/${this.props.address}`);
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
      <div className="contribute-form">
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="contribution">
            <Form.Label>Amount to Contribute<span style={{ color: 'red' }}>*</span></Form.Label>
            <InputGroup className="mb-3">
              <Form.Control required
                type="text"
                value={this.state.contribution}
                onChange={e => { this.setState({ contribution: e.target.value }) }}
                aria-label="Amount to contribute in ether"
              />
              <InputGroup.Text>ether</InputGroup.Text>
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
              : "Contribute!"}
          </Button>
        </Form>
      </div>
    );
  }
}

export default ContributeForm;