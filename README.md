# My Wallet 

## About

My Wallet Project is a web application that enables users to control their personal finances. It has a front-end, back-end and database deployed in the cloud. The project was separated into two different repositories, one for the front-end and one for the back-end, using Git for versioning. The back-end was architected in controllers, routers and middlewares, while the front-end was built using ReactJS. User registration was implemented, capable of creating an account by validating fields and passwords. The application also allows users to log in, view their transactions and add new ones.

<p align="center">
  <img width="790" alt="My Wallet Project" src="https://user-images.githubusercontent.com/95102911/236885662-c365187c-1202-4f10-aaf1-40912291500b.png">
</p>

<hr/>

🔸 Demo: https://mywallet-ashy.vercel.app/

<hr/>

## Features

- Separate the project into two different repositories, one for the front-end and another for the back-end, and use Git for versioning. - Each implemented feature should have a corresponding commit.
- Implement the front-end using HTML, CSS, JS and React, always running on port 8000.
- Architect the back-end in controllers, routers and middlewares, using dotenv to manage environment variables. The server should run on port 5000.
- Register users in the database through a POST request, validating all fields, and returning the corresponding error message in case of failure.
- Users can log in, view their transactions and add new ones.

<hr/>

## Motivation
The My Wallet Project was developed to provide an easy-to-use web application that helps people manage their finances. The inspiration came from the need to have a single tool that could provide a comprehensive view of one's financial situation, including a summary of expenses, income and investments.

<hr/>

## Technologies

<p align='rigth'>
<img style='margin: 2px;' src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB'/>
<img style='margin: 2px;' src='https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white'>
<img style='margin: 2px; width:70px' src='https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white/'>
</p>

<hr/>

## Routes

#### <span style='font-weight:bold;'>POST</span> /signUp

A route that creates a new user account. If there's a participant with this e-mail already registered, it returns a 409 status code error. If its sucessfull it returns a 201 status code. The request body should contain:

```
{
  {
  "name": "johnDoe",
  "email": "john@doe.com",
  "password": "123456"
}
}
```

#### <span style='font-weight:bold;'>POST</span> /signIn

A route that will allow the user to sign in. If there's no user with the given e-mail registered it'll return a 404 status code error, if the password doesn't match with the ones given on signUp, it'll return a 401 status code error. It'll give a token as a response.

All routes after signIn will need an authentication token:
```
headers: { Authorization: `Bearer ${token}` }
```

#### <span style='font-weight:bold;'>POST</span> /transactions

Creates a new income or expense transaction. All fields are required and cannot be empty. The request should include a token as a header. If any of the fields are missing or empty, the API returns a 422 status code error and an error message indicating that all fields are required and cannot be empty. It returns a 401 status code if the token doesn't exist or if there's no account with this token. The request body should contain the following:

```
The request body should be:
    {
        {
        "description": "salario",
        "amount": 1500
        }
    }
Note that if the amount is a whole number that ends with two zeros (e.g., 1200), do not include a decimal point. Otherwise, if it is a floating-point number or has one zero at the end (e.g., 275.5), include the decimal point.
```

#### <span style='font-weight:bold;'>GET</span> /transactions

Retrieves a list of the user's income and expense transactions. If there are no transactions, it returns an empty array. The response body looks like this:

```
The date format is: (DD/MM)
[
    {
        "_id": "644438f94af2cf105bd042b5",
        "userId": "64443438f3722b44d6394f74",
        "description": "salário",
        "type": "entrada",
        "amount": 1500.89,
        "date": "10/06"
    },
    {
        "_id": "644439144af2cf105bd042b6",
        "userId": "64443438f3722b44d6394f74",
        "description": "conta de luz",
        "type": "saída",
        "amount": 150.1,
        "date": "12/06"
    }
]
```

<hr/>

## How to run

To download and configure the project, follow these steps:

1. Clone the front-end repository: git clone https://github.com/natividadesusana/my-wallet.git
2. Clone the back-end repository: git clone https://github.com/natividadesusana/my-wallet-API.git
3. Install the dependencies for both repositories using npm install
4. Create a .env file in the root of the back-end directory, containing the following variables:
    `
      MONGO_URI=<your-mongodb-uri>
      PORT=5000
    `
5. Start the back-end server by running npm start in the back-end directory.
6. Start the front-end server by running npm start in the front-end directory.
7. Access the application in your browser at http://localhost:8000

Note: This project requires MongoDB to be installed and running. If you don't have it installed, please follow the instructions in their website (https://www.mongodb.com/try/download/community).

<hr/>

## 🚀 Links

- [Figma](https://www.figma.com/file/p37uJdpZWRLED7YEwDFfUd/MyWallet?node-id=0-1).<br/>
- [Deploy](https://mywallet-ashy.vercel.app/).<br/>

<hr/>

## Tutorials for deploying:
            
 - [Tutorial: Deploying React projects at Vercel](https://www.notion.so/Tutorial-Deploy-de-projetos-React-na-Vercel-62fa866558034c73b31f89a0e4a3c697)
            
 - [Tutorial: Deploying back-end applications in Render (MongoDB)](https://www.notion.so/Tutorial-Deploy-de-aplica-es-back-end-no-Render-MongoDB-d062570799fa49fc82060865a7b73f8c)
