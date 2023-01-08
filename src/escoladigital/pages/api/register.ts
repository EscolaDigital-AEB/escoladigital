
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../models/user';

//return hi
export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "GET") res.redirect("/register");
    let body = {};
    if(typeof(req.body) == "string" ) body = JSON.parse(req.body)
    else{
      body = req.body
    }

    const userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "user",
    };


    /*
    json exemple
    {
        "name": "demo",
        "email": "demo@gmail.com",
        "password": "12345",
        "role": "user"
    }
    */ 

    // register
    try {
      const user = new User()
      .setEmail("demo@gmail.com")
      .setName("Demo")
      .setPassword("12345")
      .setRole("admin");
  
      // Create
      user.createUser();
  
      console.log(user);
  
      // Delete
    }
    catch (error) {
      console.log(error);
    }

    res.status(200).json({
        status: status,
    });
}

    