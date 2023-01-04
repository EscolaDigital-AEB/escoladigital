/*
Login api
Get the user data from the database and return it to the client
*/
import { NextApiRequest, NextApiResponse } from 'next'


export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ token: 'Hi' })

    }
