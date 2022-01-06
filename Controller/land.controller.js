var db = require('../db')
const Email = require('./sendEmail.controller');

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

module.exports.addSchedule = (req,res)=>{
    const {idCustommer,idLand,Time,Email} = req.body;
    const sql = 'INSERT INTO schedule (`idCustomer`,`idLand`,`Time`) VALUES(?,?,?)'
    db.query(sql,[idCustommer,idLand,Time],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            //Send for customer
            Email.SendEmail(Email,"Đặt lịch thành công",
            `Bạn đã đặt lịch hẹn thành công vào ${new Date(Time).toLocaleString()}`
            )
            Email.SendEmail(process.env.EMAIL,"Nhận được lịch hẹn tư vấn",
            `Khách đặt lịch tư vấn vào lúc ${new Date(Time).toLocaleString()}`
            )
            return res.json({msg:"Success"})
        }
    })
}