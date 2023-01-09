import getAllUsers from "../../services/userDAO";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const response = await getAllUsers.getAllUsers();
    if (response != null) {
   
      //map response and then put it into object allUsers
      let allUsers = response.map((user) => {
        return {
          
          id: user._id,
          nome: user.name,
          email: user.email,
    
          role : user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        };
      });

      res.json(allUsers);
     
    } else {
      res.status(500).json({ message: "No users found" });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
