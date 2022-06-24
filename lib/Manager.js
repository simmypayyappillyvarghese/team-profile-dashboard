
const Employee=require('./Employee');

class Manager extends Employee{

    constructor(name,id,email,officeNumber){
        super(name,id,email);
        this.officeNumber=officeNumber;
    }

    // This will return the class/constructor Name of the instance
    getRole(){

        return this.constructor.name;
    }

    getOfficeNumber(){

        return this.officeNumber;
    }
}


module.exports=Manager;