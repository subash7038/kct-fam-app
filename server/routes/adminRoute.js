const router = require("express").Router();
const bcrypt = require("bcrypt");
const authenticate = require("../common/authenticate");
const {User,Department} = require("../models")
router.post(
  "/department/add",
  authenticate.auth,
  authenticate.adminAuth,
  (req, res) => {

    Department.create({
      department:req.body.department,
      department_name:req.body.departmentName,
      allocated_budget:req.body.allocatedBudget,
      used_budget:req.body.budgetUsed
    })
    .then(() => {
      res.send({msg:"department added"})

    })
    .catch(err => {
      console.log(err)
      res.status(500).send({err})
    })

  }
);

router.post(
  "/users/add",
  // authenticate.auth,
  // authenticate.adminAuth,
  (req, res) => {
    bcrypt.hash(req.body.password, 10, (bcryptErr, hashedPassword) => {
      if (bcryptErr) {
        console.log(bcryptErr);
        res.status(500).send({
          msg: "Error in bcrypt",
          err: bcryptErr,
        });
      } else {

        User.create({
          emp_id:req.body.empId,
          name:req.body.name,
          email:req.body.email,
          department:req.body.department,
          designation:req.body.designation,
          password : hashedPassword
        })
        .then(() => {
          res.send({
            msg:"User added"
          })

        })
        .catch(err => {
          if(err && err.name && err.name === "SequelizeUniqueConstraintError"){
            res.status(500).send({
              msg:"No such department found"
            })
          }
          else {
            res.status(500).send({
              msg:"Error occured! Can't create user",
              err
            })
          }
           
        })
      }
    });
  }
);

router.get("/test", authenticate.auth, authenticate.adminAuth, (req, res) => {
  res.send({
    msg: "authenticated",
  });
});

module.exports = router;
