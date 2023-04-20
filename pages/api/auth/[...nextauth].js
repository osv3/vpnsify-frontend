// pages/api/auth/[...nextauth].js
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
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
        const usDb = await axios.post("http://localhost:3001/api/login", {
          email: credentials.email,
          password: credentials.password,
        });
        if ((await usDb) != null) {
          const user = { name: await usDb.email };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});
