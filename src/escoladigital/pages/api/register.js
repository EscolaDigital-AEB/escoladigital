import  register from "../../services/userDAO.js";

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
        res.status(200).json(response);
    }
    else {
        res.status(500).json({message: "User not created"});
    }

  res.status(200).json(response);

}