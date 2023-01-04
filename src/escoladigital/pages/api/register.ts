
import { NextApiRequest, NextApiResponse } from 'next'

//return hi
export default (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ token: 'Hi' })

    
    }
