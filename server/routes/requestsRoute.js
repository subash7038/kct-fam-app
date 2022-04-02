const router = require("express").Router();
// const db = require("../db/db");
const authenticate = require("../common/authenticate");
const {Request} = require("../models")
const {
  findUserVal,
  requestSentMail,
  notifyMail,
  findDesignation,
  rejectMail,
  approveMail,
} = require("../common/functions");
const {
  NORMAL_USER,
  BUDGET_COORDINATOR,
  HOD,
  HR,
  ARCHIVE,
  PRINCIPAL,
  REJECTED,
  APPROVED,
} = require("../common/constants");

router.post("/", authenticate.auth, (req, res) => {

  const handleSuccessRequest = () => {
      res.send({
        msg:"request sent successfully"
      })
      requestSentMail(req.user, {
        ...req.body.data,
        eventType: req.body.eventType,
      });
      notifyMail(req.user, findDesignation(nextUserLevel), {
        ...req.body.data,
        eventType: req.body.eventType,
      });
  }
  let userLevel = findUserVal(req.user);
  let nextUserLevel = 0;
  if (userLevel === BUDGET_COORDINATOR) {
    nextUserLevel = HR;
    Request.create({
      emp_id:req.user.emp_id,
      user_level:userLevel,
      event_type:req.body.eventType,
      event_info:JSON.stringify(req.body.data),
      approval_status:HR,
      budget_ref_no:req.body.budgetRefNo
    }).then(() => {
      handleSuccessRequest();
    })
    .catch(err => {
      res.status(500).send({
        err,
      });

    })
  
  } else if (userLevel === ARCHIVE) {

    nextUserLevel = BUDGET_COORDINATOR;
    Request.create({
      emp_id:req.user.emp_id,
      user_level:userLevel,
      event_type:req.body.eventType,
      event_info:JSON.stringify(req.body.data),
      approval_status:BUDGET_COORDINATOR,
      aad_no:req.body.aadNo
    }).then(() => {
      handleSuccessRequest();
    })
    .catch(err => {
      res.status(500).send({
        err,
      });

    })    
  } else {
    nextUserLevel = BUDGET_COORDINATOR;
    Request.create({
      emp_id:req.user.emp_id,
      user_level:userLevel,
      event_type:req.body.eventType,
      event_info:JSON.stringify(req.body.data),
      approval_status:BUDGET_COORDINATOR,
    }).then(() => {
      handleSuccessRequest();
    })
    .catch(err => {
      res.status(500).send({
        err,
      });
    })    
  }
});

// router.get("/", authenticate.auth, (req, res) => {
//   const userLevel = findUserVal(req.user);
//   const callBack = (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send({
//         error,
//       });
//     } else if (result && result.length) {
//       res.send({
//         requests: [...result],
//       });
//     } else {
//       res.send({
//         msg: "No requests found",
//       });
//     }
//   };
//   if (userLevel === HOD) {
//     db.query(
//       "SELECT * FROM requests \
//            join users u1 on requests.emp_id=u1.emp_id \
//            join departments d on d.department=u1.department where approval_status=? and u1.department=?",
//       [userLevel, req.user.department],
//       callBack
//     );
//   } else {
//     db.query(
//       "SELECT * FROM requests \
//       join users u1 on requests.emp_id=u1.emp_id \
//       join departments d on d.department=u1.department where approval_status=? ",
//       userLevel,
//       callBack
//     );
//   }
// });

// router.put("/reject", authenticate.auth, (req, res) => {
//   const userLevel = findUserVal(req.user);
//   db.query(
//     "UPDATE requests SET approval_status=?,rejected_by=?,rejection_reason=? WHERE approval_status=? AND request_id=?",
//     [
//       -1,
//       req.user.emp_id,
//       req.body.rejectionReason,
//       userLevel,
//       req.body.requestId,
//     ],
//     (error, result) => {
//       if (error) {
//         console.log(error);
//         res.status(500).send({
//           error,
//         });
//       } else if (result && result.affectedRows) {
//         res.send({
//           msg: "Request declined successfully",
//         });
//         rejectMail(req.body.requestId, req.user, req.body.rejectionReason);
//       } else if (result && !result.affectedRows && !result.fieldCount) {
//         res.send({
//           msg: "Row not found",
//         });
//       } else {
//         res.status(500).send({
//           result,
//         });
//       }
//     }
//   );
// });

// router.put("/approve", authenticate.auth, (req, res) => {
//   const userLevel = findUserVal(req.user);
//   const requestedUserLevel = req.body.userLevel;
//   let nextLevel = 0;
//   let values = [];
//   let query =
//     "UPDATE requests SET approval_status=? WHERE approval_status=? AND request_id=?";
//     if (userLevel === BUDGET_COORDINATOR) {
//     if (requestedUserLevel === NORMAL_USER) nextLevel = HOD;
//     else if (requestedUserLevel === HOD) nextLevel = HR;
//     else if (requestedUserLevel === HR) nextLevel = ARCHIVE;
//     else if (requestedUserLevel === ARCHIVE) nextLevel = PRINCIPAL;
//     else if (requestedUserLevel === PRINCIPAL) nextLevel = APPROVED;
//   } else {
//     nextLevel = userLevel + 1;
//   }
//   values = [nextLevel, userLevel, req.body.requestId];
//   db.query(query, values, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send({
//         error,
//       });
//     } else if (result && result.affectedRows) {
//       res.send({
//         msg: "Request approved",
//       });
//       approveMail(req.body.requestId, req.user);
//     } else {
//       console.log(query);
//       console.log(values);
//       res.status(500).send({
//         result,
//       });
//     }
//   });
// });

module.exports = router;
