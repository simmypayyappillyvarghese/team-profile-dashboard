const Employee = require("./Employee");

class Engineer extends Employee{

    constructor(name,id,email,github){
        super(name,id,email);
        this.github=github;
    }

    getGithub(){}

    // Overridden to return 'Engineer'
    getRole(){}
}

