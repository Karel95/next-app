// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import Credentials from "next-auth/providers/credentials"


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
        // console.log("req:\n", req)

        // const { email, password } = credentials

        // // You can add your own logic here to authenticate the user
        // // For example, you can call your own API to verify the credentials
        // const res = await fetch("https://example.com/api/auth", {
        //   method: "POST",
        //   body: JSON.stringify({ email, password }),
        //   headers: { "Content-Type": "application/json" },
        // })

        // const user = await res.json()

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }

        // // If you return null or false then the credentials will be rejected
        return null
      }
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
