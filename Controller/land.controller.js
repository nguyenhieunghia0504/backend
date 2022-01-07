var db = require('../db')
const EmailPlugin = require('./sendEmail.controller');

module.exports.getFullLand = (req,res)=>{
    const sql = "SELECT land.*,category.Type FROM `land` INNER JOIN `category` ON land.IdCategory=category.ID";
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
    const sql = 'SELECT land.*,category.Type FROM `land` INNER JOIN `category` ON land.IdCategory=category.ID WHERE land.ID = ?'
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
    console.log(idCustommer,idLand,Time,Email)
    const sql = 'INSERT INTO shedule (`idCustommer`,`idLand`,`Time`) VALUES(?,?,?)'
    db.query(sql,[idCustommer,idLand,Time],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            //Send for customer
            EmailPlugin.SendEmail(Email,"Đặt lịch thành công",
            `Bạn đã đặt lịch hẹn thành công vào ${new Date(Time).toLocaleString()}`
            )
            EmailPlugin.SendEmail(process.env.EMAIL,"Nhận được lịch hẹn tư vấn",
            `Khách đặt lịch tư vấn vào lúc ${new Date(Time).toLocaleString()}`
            )
            return res.json({msg:"Success"})
        }
    })
}

module.exports.getScheduleByIdUser = (req,res)=>{
    const {idUser} = req.body;
    const sql = 'SELECT shedule.*,land.SubTitle FROM shedule INNER JOIN land ON shedule.idLand=land.ID WHERE shedule.idCustommer = ?';
    db.query(sql,[idUser],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json(result)
        }
    })
}