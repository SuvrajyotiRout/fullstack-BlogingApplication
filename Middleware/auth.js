const { varifiytoken } = require("../JWT/jwt");

function checkthetoken(cookieName) {
  return (req, res, next) => {
    const usertoken = req.cookies[cookieName];
    if (!usertoken) {
      return next();
    }

    try {
      const varifiyingtoken = varifiytoken(usertoken);
      req.user = varifiyingtoken;
    } catch (error) {
      console.log(error);
    }
    return next();
  };
}

module.exports = { checkthetoken };
