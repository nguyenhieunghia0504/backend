const db = require('../db')
const Email = require('./sendEmail.controller');

module.exports.test = (req,res)=>{
    Email.SendEmail("nhnghia.18it3@vku.udn.vn","Xin chào","Đây là email tự động")
    // const sql = "SELECT * FROM test"
    // db.query(sql,(err,result)=>{
    //     if(err){
    //         return res.json({msg:err})
    //     }else{
    //         console.log(result)
    //         Email.SendEmail("nhnghia.18it3@vku.udn.vn","Xin chào","Đây là email tự động")
    //         return res.json(result)
    //     }
    // })
}