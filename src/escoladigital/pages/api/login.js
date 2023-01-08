import login from "../../services/userDAO.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method == "GET") res.redirect("/login");
  let body = {};
  if(typeof(req.body) == "string" ) body = JSON.parse(req.body)
  else{
    body = req.body
  }

  const user = {
    email: body.email,
    password: body.password,
  };
// crypt password
  user.password = bcrypt.hashSync(user.password, 10);

  const response = await login.login(user.email, user.password);

  if (response) {
 //create a unique token for the user
 const token = jwt.sign({ _id: response._id }, process.env.TOKEN_SECRET);
 //then send the token and the user data and _id to the client
 res.setHeader("auth-token", token).json({token: token, user: response, _id: response._id});

}
else {
  res.status(500).json({message: "Login failed"});
  }

}