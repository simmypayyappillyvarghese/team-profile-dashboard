
const inquirer=require('inquirer');
const Manager=require('./lib/Manager');
const Engineer=require('./lib/Engineer');
const Intern=require('./lib/Intern');
const templateHelper=require('./src/template_helper')

//Array to store the answers specific to each prompts
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
      empoyeeInfoArray.push(answers);
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

      if(ans.employeeChoiceList=='Add an Engineer'){
         displayEngineerQueries();
      }

      else if(ans.employeeChoiceList=='Add an Intern'){
         displayInternQueries();
      }

      else {
         
        //Create Manager,Engineer and Intern Object,once user finish adding the info.
         createInstances(empoyeeInfoArray);
         return;
        
        
        };

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
      displayMenu();
    })
    .catch(e => console.log(`An error occured within display Intern Queries ${e}`));

}


//Creates insances of manager,engineer and inter using the answers object from teh prompt

function createInstances(empoyeeInfoArray){

  let objectArray=empoyeeInfoArray.map((employee)=>{

    if(employee.engineerName){
      let name=employee.engineerName;
      let id=employee.engineerId;
      let email=employee.engineerEmail;
      let github=employee.githubUser;
          
       return new Engineer(name,id,email,github);
    }
    else if(employee.managerName){

      let name=employee.managerName;
      let id=employee.managerId;
      let email=employee.managerEmail;
      let phoneNo=employee.managerPhoneNumber;
          
       return new Manager(name,id,email,phoneNo);

    }
     else{
      let name=employee.internName;
      let id=employee.internId;
      let email=employee.internEmail;
      let school=employee.schoolName;
          
       return new Intern(name,id,email,school);

    }

  });

  templateHelper.createCards(objectArray);
  
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

