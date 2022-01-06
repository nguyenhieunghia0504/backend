var db = require('../db')

module.exports.getFullLand = (req,res)=>{
    const sql = "SELECT * FROM land";
    db.query(sql,(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json(result)
        }
    })
}

module.exports.getLandDetails = (req,res)=>{
    const {ID} = req.body;
    const sql = 'SELECT * FROM land WHERE ID = ?'
    db.query(sql,[ID],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json(result)
        }
    })
}