const userValidations = {};


userValidations.validateUser = (name,salary)=>{
    if(name !== "" && salary !== null){
        if(!isNaN(salary)){
            return "success";
        }else{
            return "nan";
        }
    }else{
        return "campos.vacios";
    }
}

module.exports = userValidations;