var db = require('../db');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

module.exports.register = (req,res)=>{
    try {
        const id = uuid.v1();
        const {email,password,username,name,address,phone} = req.body;
      
        const sql = 'SELECT * FROM user WHERE UserName = ? ';
        db.query(sql,[email],async(err,rows,fields)=>{
            //Check email exist ?
            if(rows.length > 0 ){
                return res.status(201).json({
                    msg: "The Username already in use",
                });
            }
            //create password with code bcrypt
            const hashPass = await bcrypt.hash(password, 12);
            const sqlRegister = 'INSERT INTO `user`(`ID`,`UserName`,`Password`) VALUES(?,?,?)';
            db.query(sqlRegister,[id,username,hashPass],(err,rows,fields)=>{
                if (err) {
                    return res.json({msg:err});
                }
                else{
                    const sql_customer = 'INSERT INTO `custommer`(`idUser`,`Name`,`Email`,`Phone`,`Address`) VALUES(?,?,?,?,?)'
                    db.query(sql_customer,[id,name,email,phone,address],(err,result)=>{
                        if(err){
                            return res.json({msg:err});
                        }else{
                            return res.status(201).json({
                                success: "The user has been successfully inserted.",
                            });
                        }
                    })
                }
            })
        })
    }catch (error) {
        return res.status(500).json({ msg: err.message });
    } 
}

module.exports.login = (req,res)=>{
    try {
        const {username,password} = req.body;
        const sql = 'SELECT * FROM user WHERE UserName = ? ';
    
        db.query(sql,[username],async(err,rows,fields)=>{
            if (err) {
                return res.json({msg:err});
            }
            //Check account exist
            if(rows.length ===0 ){
                return res.status(422).json({
                    msg: "Invalid account",
                });
            }else{
                //Confirm password
                const passMatch = await bcrypt.compare(password,rows[0].Password);
                console.log(passMatch)
                if(!passMatch){
                    return res.status(422).json({
                        msg: "Incorrect password",
                    });
                }else{
                    getInforUser(rows[0].ID,res)
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
}

const getInforUser = (id,res)=>{
    console.log(id)
    const sql = "SELECT user.*,custommer.* FROM user LEFT JOIN custommer ON user.ID=custommer.idUser WHERE user.ID = ?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json(result)
        }
    })
}