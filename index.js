

//To fix the ERR_REQUIRE_ESM used dynamic import and added "type": "module" to package.json
// import inquirer from "inquirer";
const inquirer=require('inquirer');

let empoyeeInfoArray=[];

//Inquirer modules for Manager related queries and the questions array

const managerPrompt = inquirer.createPromptModule();
let managerQuestions = [
  {
    type: "input",
    message: "Enter the team manager's name :",
    name: "managerName",
    validate:(input)=>{
      return input.length!==0?true:"Name field cannot be blank";
   }

  },
  {
    type: "input",
    message: "Enter the manager's employee ID(six digits):",
    name: "managerId",
    validate:(input)=>{
      return (input.length!==6 || !input.match(/^[0-9]{6}/)) ?"Enter the six digit Employee Id and should be numeric":true;
   }

  },
  {
    type: "input",
    message: "Enter the manager's email address:",
    name: "managerEmail",
    validate:(input)=>{
      return !input.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/) ?"Enter a valid email address ":true;
    }
  },
  {

   //Regex:^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/
   /*
   This will accept phone numbers with or without () around the 3 digit area code seperated by .,space,-
   and the Next 3 characters  Telephone prefix followed by  seperated by .,space,-(\2 in regex) and
   the last 4 digit line number
   */

    type: "input",
    message: "Enter the  office phone number:",
    name: "managerPhoneNumber",
    validate:(input)=>{
      return !input.match(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})$/)?"Enter a valid phone number":true;
      
    }
  },
];

//Inquirer modules for Engineer related queries and the questions array

const engineerPrompt = inquirer.createPromptModule();
let engineerQuestions = [
   {
      type: "input",
      message: "Enter the Engineer's name",
      name: "engineerName",
      validate:(input)=>{
         return input.length!==0?true:"Name field cannot be blank";
      }

    },
  {
    type: "input",
    message: "Enter the Engineer's Employee Id",
    name: "engineerId",
    validate:(input)=>{
      return (input.length!==6 || !input.match(/^[0-9]{6}/)) ?"Enter the six digit Employee Id and should be numeric":true;
   }

  },
  {
    type: "input",
    message: "Enter the Engineer's email address",
    name: "engineerEmail",
    validate:(input)=>{
      return !input.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/) ?"Enter a valid email address ":true;
    }

  },
  {
    type: "input",
    message: "Enter the Engineer's Github UserName",
    name: "githubUser",
    validate:(input)=>{
      return input.length!==0?true:"Github Username cannot be blank";
   }
    
  },
];


//Inquirer modules for intern related queries and the questions array

const internPrompt = inquirer.createPromptModule();
let internQuestions = [
  {
    type: "input",
    message: "Enter the Intern's name",
    name: "internName",
    validate:(input)=>{
      return input.length!==0?true:"Name field cannot be blank";
   }

  },
  {
    type: "input",
    message: "Enter the Intern's Employee ID",
    name: "internId",
    validate:(input)=>{
      return (input.length!==6 || !input.match(/^[0-9]{6}/)) ?"Enter the six digit Employee Id and should be numeric":true;
   }

  },
  {
    type: "input",
    message: "Enter the Intern's email address",
    name: "internEmail",
    validate:(input)=>{
      return !input.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)?"Enter a valid email address ":true;
    }

  },
  {
    type: "input",
    message: "Enter the Intern's School/University Name",
    name: "schoolName",
    validate:(input)=>{
      return input.length!==0?true:"School/University Name cannot be blank";
   }

  },
];



//Inquirer modules for menu with the questions array

const menuPrompt = inquirer.createPromptModule();
let menu = [
  {
    type: "list",
    message: "Add an engineer or an intern to the profile or Finish creating profile? ",
    choices: ["Add an Engineer", "Add an Intern", "Finsish The App"],
    name: "employeeChoiceList",
  },
];

/*
Function to display the manager related queries
If the feedback is reeceived call the display menu function to display the menu
*/

function displaymanagerQueries(){

   managerPrompt(managerQuestions)
   .then((answers)=>{
      empoyeeInfoArray.push(answers)
      console.log("Manager Query Answers",answers);
      displayMenu();

   })
}

/*
Function to Display the menu for user to add an engineer,inern or finish app
If User select the Engineer,engineer queries function is called
If User select the Intern,intern queries function is called
If User select Finish the App,exit the function
*/

function displayMenu() {

  menuPrompt(menu)

    .then((ans) => {
      console.log("Menu Answer ",ans);

      if(ans.employeeChoiceList=='Add an Engineer'){
         displayEngineerQueries();
      }

      else if(ans.employeeChoiceList=='Add an Intern'){
         displayInternQueries();
      }

      else {
         
         console.log(empoyeeInfoArray);
         return};

    })
    .catch((error) => console.log(`An error occured within displayMenu ${error}`));
}


/*
Function to display the Engineer related Queries
If the prompt receives the feedback,call the display menu method
*/

function displayEngineerQueries() {

  engineerPrompt(engineerQuestions)
    .then((answers) => {

      empoyeeInfoArray.push(answers)
      console.log("Engineer Query Answers: "+answers);
      displayMenu();
    })
    .catch((e) => console.log(`An error occured within display Engineer Queries method : ${e}`));

}


/*
Function to display the Intern related Queries
If the promise gets feedback then call the menu prompt function to display the menu
*/
function displayInternQueries() {

  internPrompt(internQuestions)
    .then((answers) => {
      empoyeeInfoArray.push(answers);
      console.log("Intern Query Answers: "+answers);
      displayMenu();
    })
    .catch((e) => console.log(e=>console.log(`An error occured within display Intern Queries ${e}`)));

}

/*
This will be starting point of the application
Function will start the Application with a start Message
Function will execute the manager Queries function.

*/

function startApp(){

   console.log(`\n\t\t ***** Hi User,This is an application to generate a team profile.
                Please answers the queries related to your team  to create the profile. *****
                `);

   displaymanagerQueries();

   
}


startApp();



/*
 
GIVEN a command-line application that accepts user input
WHEN I am prompted for my team members and their information
THEN an HTML file is generated that displays a nicely formatted team roster based on user input
WHEN I click on an email address in the HTML
THEN my default email program opens and populates the TO field of the email with the address
WHEN I click on the GitHub username
THEN that GitHub profile opens in a new tab
WHEN I start the application
THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
WHEN I enter the team manager’s name, employee ID, email address, and office number
THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
WHEN I select the engineer option
THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
WHEN I select the intern option
THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
WHEN I decide to finish building my team
THEN I exit the application, and the HTML is generated
 
 
 */

//Get the Input from the User
//Create Object USing the libraries
//Modify the user input
//Write the input to an index file

//Using node index
// ->>Executing the CLI application
//  This will prompt user with questions
//  This will get the questions and answers
