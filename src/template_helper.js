
let documentString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile Dashboard</title>

        <!--BOOTSTRAP LINK-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="./assets/css/style.css"></link>
    </head>
    <body>
        <header><h1>My  Team</h1></header>
        <main class="container" id="card-container">
            <section class="row py-5 d-flex justify-content-center align-items-center flex-wrap" id="card-row">
            
            </section>
            <section class="row py-5 justify-content-center align-items-center flex-wrap" id="card-row">
                    
            </section>
        </main>
        <script src="./assets/js/script.js"></script>
    </body>
    </html> `;


//TO DO

function createCards(employeeObject){

    //Fetch Employee object and based on type get its unique properties

    //create the card string

    //return the card string

    let cardString =
`
<div class="card col-12 col-md-4">
<div class="card-header">
    <h4>Name</h4>
    <i>Icon</i><h4>Title</h4>
</div>
<div class="card-body">
    <ul class="list-group">
        <li class="list-group-item">ID</li>
        <li class="list-group-item">Email</li>
        <li class="list-group-item">Office/Github/School</li>
    </ul>
</div>
</div>
`;

}