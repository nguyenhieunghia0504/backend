const db = require('../db')

module.exports.test = (req,res)=>{
    const sql = "SELECT * FROM test"
    db.query(sql,(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            console.log(result)
            return res.json(result)
        }
    })
}