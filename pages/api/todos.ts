import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}