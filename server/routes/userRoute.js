const router = require("express").Router();
const {User} = require("../models")
// const db = require("../db/db");
const authenticate = require("../common/authenticate");
router.get("/", authenticate.auth, async (req, res) => {
  const user = await User.findOne({
    where : {emp_id : req.body.empId}
  })
  .catch(err => { 
    console.log(err)
    res.send({
      err
    })
  })

  if(user != null ){
    res.send(user)
  }else{
    res.send({
      msg:"No user found"
    })
  }
  


});

module.exports = router;
