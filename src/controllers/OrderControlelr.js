const { success, error } = require("../network/response");

const get = async (req,res) => {
    try{
        
        success(res, "", 200, data);
    }catch(err){
        console.error("[error]", err)
        error(res, "", 500, err);
    }
}

const store = async (req, res) => {
    try{
        
        
        success(res, "Has been saved successfully", 201, data);
    }catch(err){
        console.error("[error]", err)
        error(res, "", 500, err);
    }
}



module.exports = {
    get,
    store
}