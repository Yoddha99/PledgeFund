import React from 'react';
import web3 from '../ethereum/web3';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Router from 'next/router';
import Campaign from '../ethereum/campaign';

class RequestRow extends React.Component {

  state = {
    isLoading: false
  }

  onApprove = async (e) => {

    this.setState({
      isLoading: true
    });

    toast.info("It may take up to 15 seconds to process once the transaction is sent!"), {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    };

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0]
      });

      toast.success("Approved the request successfully!"), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      Router.push(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      console.log(err);
      toast.error(`Could not approve request\n${err.message}`), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };
    } finally {
      this.setState({
        isLoading: false
      });
    }
  };

  onFinalize = async (e) => {

    this.setState({
      isLoading: true
    });

    toast.info("It may take up to 15 seconds to process once the transaction is sent!"), {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
    };

    const campaign = Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0]
      });

      toast.success("Finalized the request successfully!"), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };

      Router.push(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      console.log(err);
      toast.error(`Could not finalize request\n${err.message}`), {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      };
    } finally {
      this.setState({
        isLoading: false
      });
    }
  };

  render() {

    const { id, request, address } = this.props;
    const readyToFinalize = ((request.approvalCount > (this.props.approversCount / 2)) &&
      (Number(this.props.balance) > Number(web3.utils.fromWei(request.value, 'ether'))));

    return (
      <tr
        style=
        {request.complete ? { opacity: '0.5', cursor: 'not-allowed' }
          : (readyToFinalize ? { 'backgroundColor': '#e0ffe9' } : {})}
      >
        <td>{id}</td>
        <td>{request.description}</td>
        <td>{this.props.balance}</td>
        <td>{web3.utils.fromWei(request.value, 'ether')}</td>
        <td>{request.recipient}</td>
        <td>{request.approvalCount}/{this.props.approversCount}</td>
        <td>
          <div className="d-grid gap-2">
            <Button variant="primary" size="md"
              disabled={request.complete || this.state.isLoading}
              onClick={this.onApprove}
            >
              Approve
            </Button>
          </div>
        </td>
        <td>
          <div className="d-grid gap-2">
            <Button variant="success" size="md"
              disabled={request.complete || !readyToFinalize || this.state.isLoading}
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          </div>
        </td>
      </tr>
    );
  }
}

export default RequestRow;