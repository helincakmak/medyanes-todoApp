import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const todo = await prisma.todo.findUnique({
        where: {
          id: String(id),
        },
      });
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, description, status } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: String(id) },
        data: { title, description, status },
      });
      res.status(200).json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({
        where: { id: String(id) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}