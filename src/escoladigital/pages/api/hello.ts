// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../models/user';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const user = new User();
    user.setName("John Doe");
    user.setEmail("demo@gmail.com");
    user.setPassword("123456");
    user.setRole("admin");
    user.createUser();
  }
  catch (error) {
    console.log(error);
  }

  res.status(200).json({ name: 'John Doe' })
}
