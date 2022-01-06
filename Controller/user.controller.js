var db = require('../db');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

module.exports.register = (req,res)=>{
    try {
        const id = uuid.v1();
        const {email,password,username,name,address,phone} = req.body;
      
        const sql = 'SELECT * FROM user WHERE email = ? ';
        db.query(sql,[email],async(err,rows,fields)=>{
            //Check email exist ?
            if(rows.length > 0 ){
                return res.status(201).json({
                    msg: "The E-mail already in use",
                });
            }
            //create password with code bcrypt
            const hashPass = await bcrypt.hash(password, 12);
            const sqlRegister = 'INSERT INTO `user`(`id`,`username`,`password`) VALUES(?,?,?)';
            db.query(sqlRegister,[id,username,email,hashPass,name,ruler],(err,rows,fields)=>{
                if (err) {
                    return res.json({msg:err});
                }
                else{
                    const sql_customer = 'INSERT INTO `customer`(`name`,`email`,`phone`,`address`) VALUES(?,?,?,?)'
                    db.query(sql_customer,[name,email,phone,address],(err,result)=>{
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
        const sql = 'SELECT * FROM user WHERE Username = ? ';
    
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
                const passMatch = await bcrypt.compare(password,rows[0].password);
                if(!passMatch){
                    return res.status(422).json({
                        msg: "Incorrect password",
                    });
                }else{
                    getInforUser(rows[0].id)
                }
            }
        })
    } catch (error) {
        return res.status(500).json({ msg: err.message });
    }
}

const getInforUser = (id)=>{
    const sql = "SELECT user.*,customer.* FROM user INNER JOIN customer ON user.ID=customer.IdUser WHERE ID = ?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.json({msg:err})
        }else{
            return res.json(result)
        }
    })
}