// pages/api/auth/[...nextauth].js
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authUrl = "http://localhost:3001/api";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(`${authUrl}/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          const user = response.data.user;
          const token = response.data.token;
          return { ...user, token };
        } catch (error) {
          throw new Error("Invalid login credentials");
        }
      },
    }),
  ],
});
