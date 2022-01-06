# PledgeFund

**PledgeFund** is a crowsourced fundraising platform that ensures transparency & fairness in fundraising campaigns.


## Idea & Motivation
Recently, I stumbled upon this [article](https://www.phillyvoice.com/viral-crowdfunding-campaign-fraud-steal-peoples-money/) that highlights how simple it is to create a bogus fundraising campaign since there is no accountability involved whatsoever and trust is literally the only criterion that attracts contributors to donate to a campaign. This trust can be readily gained with the help of some excellent marketing and advertising. 
So, here's my attempt at solving this problem, albeit not entirely, but it does enforce some level of accountability on otherwise susceptible existing crowdfunding platforms.

![Existing Crowdsourcing Platforms](https://raw.githubusercontent.com/Yoddha99/PledgeFund/master/diagrams/1.png)
<small>Exisiting Crowdsourcing Platforms</small>

![Ideal Scenario](https://raw.githubusercontent.com/Yoddha99/PledgeFund/master/diagrams/2.png)
<small>Ideal Scenario</small>

![Possible Negative Scenario](https://raw.githubusercontent.com/Yoddha99/PledgeFund/master/diagrams/3.png)
<small>Possible Negative Scenario</small>

![PledgeFund](https://raw.githubusercontent.com/Yoddha99/PledgeFund/master/diagrams/4.png)
<small>PledgeFund</small>

## Working
There are two different kinds of roles that will access PledgeFund - 
1) Campaign Creator - One who needs to raise money for a campaign
2) Campaign Contributor - One who wants to donate to the campaign

### Flow:
- Campaign Creator aka Manager creates a campaign stating the minimum contribution required to enter the campaign.
- Contributor explores the contract, decides to donate to the campaign and sends any amount greater than or equal to the minimum contribution amount as set by the manager. 
- Whenever manager wants to withdraw some money to maybe purchase some supplies, they create a request for the same stating the reason, the address of the seller and amount required. 
- Campaign contributors can then vote on whether to release the funds or deny the transaction on their own discretion.
- If majority of contributors vote in favour of releasing the funds, the funds are then automatically transferred to the seller's address.

# How to install & run:

> **Note: Metamask wallet necessary for running this app**
Create an account on metamask & keep the 12 word mnemonic handy for later. Also generate an api key from infura.io for deploying to rinkeby test network.
- Download the [repo](https://github.com/Yoddha99/PledgeFund/archive/refs/heads/master.zip) & extract the folder.
- cd into PledgeFund folder & run 
	- `npm install`
- cd into ethereum folder 
- Replace the existing 12 word mnemonic & Infura API key with your own 12 word mnemonic issued by metamask wallet & API key generated for rinkeby network from infura.io
- Run the following commands:
	- `node compile.js`
	- `node deploy.js` 
	- `npm run dev`
