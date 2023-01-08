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

  res.status(200).json({ name: 'John Doe' })
}
