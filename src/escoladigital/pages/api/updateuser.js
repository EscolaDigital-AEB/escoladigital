import updateUser from '../../services/userDAO'

/*
async function updateUser(id, email, name, role, status)
*/
export default async function handler(req, res) {
    if (req.method == "POST") {
        try{
            const response = await updateUser.updateUser(req.body.id, req.body.email, req.body.name, req.body.role, req.body.status);
            if (response != null) {
                res.json(response);
            }
            else {
                res.status(500).json({ message: "No users found" });
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json({ message: "Error updating user" });
        }
    }
    else{
        res.status(500).json({ message: "Method not allowed" })
    }
}