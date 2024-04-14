const User = require("../MongoDB/UserSchema.js");

const getDonars = async (req,res)=>{
    const {bloodGroup,country,organ} = req.query;
    if(bloodGroup || country || organ){
        const response = await User.find({bloodGroup,country,organ});
        res.send(response);
    }else{
        const response = await User.find();
        res.send(response);
    }
}

const getDonarDetails = async (req,res)=>{
    const {id} = req.query;
    const response = await User.findById(id);
    res.send(response);
};

const filterDonars = async (req,res)=>{
        const {bloodGroup,city,organs} = req.query;
        let query = {};
        console.log(req.query);
        if(bloodGroup){
            query.bloodGroup  = bloodGroup;
        }
        if(city){
            query.city = city;
        }
        if(organs){
            query.organs = organs
        }
            console.log(query)
            const response = await User.find(query);
            res.send(response);
    }



module.exports = {getDonars,getDonarDetails,filterDonars};