import login from "../../services/userDAO.js";

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

  const response = await login.login(user.email, user.password);

  if (response) {
 //create a unique token for the user
 

  }
  res.status(200).json(response);
}