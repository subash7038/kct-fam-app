const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { PRINCIPAL } = require("../common/constants");

router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests r \
      join users u on r.emp_id = u.emp_id \
     where  approval_status=?",
    [ PRINCIPAL + 1],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result.map(item => {
            return {...item,password:undefined}
          })],
        });
      } else {
        res.send({
          msg: "No events found",
        });
      }
    }
  );
});

module.exports = router;