import getAllUsers from "../../services/userDAO";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const response = await getAllUsers.getAllUsers();
    if (response != null) {
      let count = {
        quantidade: response.length,
      };
      //get all id



      //get all names
      let nomes = [];
      for (let i = 0; i < response.length; i++) {
        nomes.push(response[i].nome);
      }

      //get all emails
      let emails = [];
      for (let i = 0; i < response.length; i++) {
        emails.push(response[i].email);
      }


      //get all roles
      let roles = [];
      for (let i = 0; i < response.length; i++) {
        roles.push(response[i].role);
      }

      //get all status
      let status = [];
      for (let i = 0; i < response.length; i++) {
        status.push(response[i].status);
      }

      //get all created_at
      let created_at = [];
      for (let i = 0; i < response.length; i++) {
        created_at.push(response[i].created_at);
      }

      //get all updated_at
      let updated_at = [];
      for (let i = 0; i < response.length; i++) {
        updated_at.push(response[i].updated_at);
      }

  

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
