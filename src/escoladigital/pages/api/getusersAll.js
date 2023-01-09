import getAllUsers from "../../services/userDAO";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const response = await getAllUsers.getAllUsers();
    if (response != null) {
      let count = {
        quantidade: response.length,
      };
      //get all id



     

      let all = {
        all: response,
        quantidade: count.quantidade,
       
      };

      res.json(all);
      //

     
    } else {
      res.status(500).json({ message: "No users found" });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
