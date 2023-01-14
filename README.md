Wallet and Purchase System.
This is a backend service for a wallet and purchase system. The service is built using Node.js and MongoDB.
I will ensure that all ids are system generated,
floating point operations use 4 decimal places for precision,
and that the API follows the exact URL structure and request, 
response param naming convention. 
Additionally, I will publish the code on Github as a private repository, 


1. Wallet Setup
URL  /wallet
Method Post
Body
{
  balance: number,
  name: string
}
Response
{
  walletId: number / string,
  balance: number,
  transactionId: number / string,
  name: string,
  date: jsDate
}
Notes
Requested balance can be decimal up to 4 precision points. E.g. 10.4512

2. Wallet Details
URL
/wallet/{walletId}
Method
GET
Body
None
Response
{
  walletId: number / string,
  balance: number,
  name: string,
  createdAt: jsDate
}
3. Add Credit to the Wallet
URL
/wallet/{walletId}/transaction
Method
POST
Body
{
  amount: number,
  description: string
}
Response
{
  balance: number,
  transactionId: number / string,
  description: string,
  type: credit,
  createdAt: jsDate
}
Notes
Requested amount can be decimal up to 4 precision points. E.g. 10.4512
4. Product Listing
URL
/products
Method
GET
Body
None
Response
[
  {
    productId: number / string,
    amount: number,
    description: string
  },
  ...
]
Notes
This is a list of hard-coded products on the database
5. Purchase a Product
URL
Copy code
/wallet/{walletId}/purchase
Method
Copy code
POST
Body
Copy code
{
  productId: number / string
}
Response
{
  balance: number,
  transactionId: number / string,
  description?: string,
  type: debit,
  productId: number / string,
  createdAt: jsDate
}
Notes
Once a purchase is completed, the system will add a transaction against that purchase and respond with the transaction details and updated wallet information
6. List Transactions
URL
/wallet/{walletId}/transaction
Method
GET
Body
None
Response
[
  {
    balance: number,
    transactionId: number / string,
    description: string,
    productId: number / string,
    type: credit / debit,
    createdAt: jsDate
  },
  ...
]
Notes
This API supports pagination with skip and limit query parameters
All ids



deploy the code on an online hosting service, EC2 link is http://ec2-65-0-135-214.ap-south-1.compute.amazonaws.com:8080
and prepare a short screen recording to explain the task and code implementation.
I will also make sure to add the specified collaborator to the Github repository.
