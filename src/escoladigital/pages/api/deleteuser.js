import deleteUser from '../../services/userDAO'

/*
async function updateUser(id, email, name, role, status)
*/
export default async function handler(req, res) {
    if (req.method == "POST") {
        try{
            const response = await deleteUser.deleteUser(req.body.id);
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