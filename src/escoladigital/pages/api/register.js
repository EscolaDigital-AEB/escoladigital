import  register from "../../services/userDAO.js";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  if (req.method == "GET") res.redirect("/login");
  let body = {};
  if(typeof(req.body) == "string" ) body = JSON.parse(req.body)
  else{
    body = req.body
  }


    const user = {
        email: body.email,
        password:body.password,
        name: body.name,
        role: "user",
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()      
    }
    const response = await register.register(user.email, user.password, user.name, user.role, user.status, user.createdAt, user.updatedAt);
    
    if (response) {
        //set unique token for the user
        const token = jwt.sign({ _id: response._id }, process.env.TOKEN_SECRET);
        //send token and user data to the client
        res.setHeader("auth-token", token).json({token: token, user: response});

    }
    else {
        res.status(500).json({message: "User not created"});
    }


}