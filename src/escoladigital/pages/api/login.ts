/*
Login api
Get the user data from the database and return it to the client
*/
import { NextApiRequest, NextApiResponse } from 'next'
import { login } from '../../services/userController'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "GET") res.redirect("/login");
    let body = {};
    if(typeof(req.body) == "string" ) body = JSON.parse(req.body)
    else{
      body = req.body
    }
  
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
    
  
    const response = await login(user.email, user.password);
  
    res.status(200).json(response);
  }
