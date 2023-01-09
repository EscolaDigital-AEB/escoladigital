import getUserById from '../../services/userDAO'

export default async function handler(req, res) {

    if (req.method == "POST") {


        const response = await getUserById.getUserById(req.body.id);
        
        if (response != null) {
            res.json(response);
        }
        else {
            res.status(500).json({ message: "No users found" });
        }
    }
    else {
        res.status(500).json({ message: "Method not allowed" })
    }
}