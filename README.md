# My Wallet Project

## About

My Wallet Project is a web application that enables users to control their personal finances. It has a front-end, back-end and database deployed in the cloud. The project was separated into two different repositories, one for the front-end and one for the back-end, using Git for versioning. The back-end was architected in controllers, routers and middlewares, while the front-end was built using ReactJS. User registration was implemented, capable of creating an account by validating fields and passwords. The application also allows users to log in, view their transactions and add new ones.

<p align="center">
  <img width="790" alt="My Wallet Project" src="https://user-images.githubusercontent.com/95102911/236885662-c365187c-1202-4f10-aaf1-40912291500b.png">
</p>

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

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" width="52" alt="react logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" width="52" alt="js logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" width="52" alt="html5 logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" width="52" alt="css3 logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" width="52" alt="figma logo"   />        
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" width="52" alt="github logo" /> </div>
  
<hr/>

## How to run

To download and configure the project, follow these steps:

1. Clone the front-end repository: git clone https://github.com/username/my-wallet-front.git
2. Clone the back-end repository: git clone https://github.com/username/my-wallet-back.git
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
