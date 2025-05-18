// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
// import AppleProvider from "next-auth/providers/apple"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/libs/prisma"
import bcrypt from "bcrypt"


const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),

    // ...add more providers here
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Type your email" },
        password: { label: "Password", type: "password", placeholder: "Type your password" },
      },
      async authorize(credentials, req) {
        console.log("credentials:\n", credentials)
        console.log("request body:\n", req.body)

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          console.log("user not found")
          throw new Error("User not found");
        }

        console.log("user:\n", user)

        const matchPassword = await bcrypt.compare(credentials.password, user.password)
        
        if (!matchPassword) {
          console.log("password does not match")
          throw new Error("Password does not match");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      }
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
