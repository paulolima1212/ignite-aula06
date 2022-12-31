import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, name } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      userName: username,
    },
  })

  if (userExists) {
    return res.status(403).json({ message: 'User already exists' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      userName: username,
    },
  })

  const daysExpiration = 60 * 60 * 24 * 7 //7 days

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: daysExpiration,
    path: '/',
  })

  return res.status(201).json(user)
}
