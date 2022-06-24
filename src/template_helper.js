const fs=require('fs');

/*
Function will create and return the content for index.html file
Manager String,Engineer String and Intern Sring will be appended 
to different row to show the role hierarchy
 */

function createDoc(managerString,engineerString,internString){
 let documentString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Dashboard</title>

        <!--BOOTSTRAP LINK-->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./assets/css/style.css"></link>
    </head>
    <body>
        <header class="header"><h1>My Team</h1></header>
        <main class="container" id="card-container">
            <section class="row py-3 d-flex justify-content-center align-items-center flex-wrap" id="manager-row">
            ${managerString}
            </section>
            <section class="row py-2 justify-content-center align-items-center flex-wrap" id="engineer-row">
            ${engineerString} 
            </section>
            <section class="row py-2 justify-content-center align-items-center flex-wrap" id="intern-row">
            ${internString} 
            </section>
        </main>
        <script src="./assets/js/script.js"></script>
    </body>
    </html> `;


    return documentString;
}


/* 

Function creates HTML strings by looping over the manager,engineer and intern objects .
Function is invoked from the index file once all the instances are created using the user input 

*/

function createCards(employeeObject){


let managerString="";
let engineerString="";
let internString="";
  
employeeObject.forEach((employee)=>{

    let role=employee.getRole();

    if(role==='Manager'){

          const{name,id,email,officeNumber}= employee;
         
         managerString +=
                    `
                    <div class="card col-12 col-md-4 px-2">
                    <div class="card-header">
                        <h4>${name}</h4>
                        <i class="fa fa-laptop"></i><h4>${role}</h4>
                    </div>
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">${id}</li>
                            <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                            <li class="list-group-item">${officeNumber}</li>
                        </ul>
                    </div>
                    </div>
                    `;
    }
    else if (role==='Engineer'){
        const{name,id,email,github}= employee;
         
        engineerString +=
                   `
                   <div class="card col-12 col-md-4 px-2">
                   <div class="card-header">
                       <h4>${name}</h4>
                       <i class="fa fa-gears"></i><h4>${role}</h4>
                   </div>
                   <div class="card-body">
                       <ul class="list-group">
                           <li class="list-group-item">${id}</li>
                           <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                           <li class="list-group-item"><a href="https://github.com/${github}" target="_blank">${github}</a></li>
                       </ul>
                   </div>
                   </div>
                   `;

    }
    else if(role==='Intern'){

        const{name,id,email,school}= employee;
         
        internString +=
                   `
                   <div class="card col-12 col-md-4 px-2">
                   <div class="card-header">
                       <h4>${name}</h4>
                       <i class="fa fa-graduation-cap"></i><h4>${role}</h4>
                   </div>
                   <div class="card-body">
                       <ul class="list-group">
                           <li class="list-group-item">${id}</li>
                           <li class="list-group-item"><a href="mailto:${email}">${email}</a></li>
                           <li class="list-group-item">${school}</li>
                       </ul>
                   </div>
                   </div>
                   `;
    
    }
    else{

        throw new Error("Failed to Create Cards");
        
    }



 
})

/*
This will write the document string returned by createDoc to the index.html file
*/

fs.writeFile('./dist/index.html',`${createDoc(managerString,engineerString,internString)}`,((err,data)=>{
    if(err){
        console.error(err)
    }
    else{
        console.log(data)
    }
}));


}

module.exports= {createCards};