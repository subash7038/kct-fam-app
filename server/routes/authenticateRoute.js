const router = require("express").Router();
const {User} = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {

  const user = await User.findOne({
    where : {email : req.body.email},
  })
  .catch((err) => {
    res.status(500).send({err})
  })
  if(user != null && user.password){
    bcrypt.compare(
      req.body.password,
      user.password,
      (errorBcrypt,isPasswordMatching) => {
        if(errorBcrypt) res.status(500).send({errorBcrypt})
        else {
          if(!isPasswordMatching){
            res.status(401).send({
              msg: "Wrong password",
            });
            
          }else{

            const userObj = {
              name : user.name,
              email:user.email,
              emp_id:user.emp_id,
              department:user.department,
              designation:user.designation,
            }          
            res.send({
              accessToken : jwt.sign(userObj,process.env.ACCESS_TOKEN_SECRET,{
                //expiresIn:"24h"
              })
            })

          }
        }

      }
    )
  }
  else{
    res.status(204).json({msg:"No user"})
  }
});

module.exports = router;
