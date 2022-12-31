import { NextApiRequest, NextApiResponse } from 'next'

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  return res.json({ message: 'api next' })
}
