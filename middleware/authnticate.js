const { verifyToken } = require('../utils/comman');
const { model } = require('mongoose');
const auth = require('basic-auth');
async function authToken(req, res, next) {
   console.log(req.headers.accesstoken);
   let obj = {
      token: req.headers.accesstoken
   }
   let vrifyData = await verifyToken(obj);
   if (vrifyData) {
      req.user = vrifyData
   }
   else {
      return res
         .status(400)
         .json({ message: "Token is invalid or expire please check" });
   }
   next()
}

const basicAuthentication = function (req, res, next
) {
   console.log("basicAuthentication");
   if (req.method == "OPTIONS") {
      res.sendStatus(200);
   } else {
      var credentials = auth(req);
      if (
         !credentials ||
         credentials.name !== process.env.BASIC_USERNAME ||
         credentials.pass !== process.env.BASIC_PASSWORD
      ) {
         res.statusCode = 401;
         res.send({ message: "Access denied" });
      } else {
         next();
      }
   }
};

module.exports = {
   authToken,
   basicAuthentication
}