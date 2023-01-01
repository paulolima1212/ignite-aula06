import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies, destroyCookie } from 'nookies'

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User ID not found on cookies.')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies!,
        },
        data: {
          name: user.name,
          avatar_url: user.avatar_url!,
          email: user.email!,
        },
      })

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: userIdOnCookies,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        avatar_url: prismaUser.avatar_url!,
        emailVerified: null,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
      })
      return {
        id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_accountId: {
            provider,
            provider_accountId: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name!,
          email: user.email!,
          avatar_url: user.avatar_url!,
        },
      })

      return {
        avatar_url: user.avatar_url!,
        email: user.email!,
        name: user.name!,
        emailVerified: null,
        username: user.username!,
        id: user.id!,
      }
    },

    async deleteUser(userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      })
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_accountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async unlinkAccount({ providerAccountId, provider }) {
      return
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          expires,
          session_token: sessionToken,
          user_id: userId,
        },
      })

      return {
        expires,
        sessionToken,
        userId,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!session) {
        return null
      }

      const { user } = session

      return {
        user: {
          avatar_url: user.avatar_url!,
          email: user.email!,
          emailVerified: null,
          id: user.id!,
          name: user.name,
          username: user.username,
        },
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
          session_token: sessionToken,
        },
      })

      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.user_id,
      }
    },
  }
}
