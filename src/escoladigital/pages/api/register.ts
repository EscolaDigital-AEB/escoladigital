
import { NextApiRequest, NextApiResponse } from 'next'
import { register } from '../../services/userController'
//return hi
export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") res.redirect("/register");
    let body = {};
    if(typeof(req.body) == "string" ) body = JSON.parse(req.body)
    else{
      body = req.body
    }

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user",
    };

    const response = register(user.name, user.email, user.password, user.role);

    res.status(200).json(response);

    
    }

    