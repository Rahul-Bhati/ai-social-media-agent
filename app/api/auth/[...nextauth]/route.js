import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { authOptions } from "./authOptions";

const handler =  NextAuth(authOptions);
export {handler as POST , handler as GET};

// import NextAuth from "next-auth/next";
// import TwitterProvider from "next-auth/providers/twitter";
// import LinkedInProvider from "next-auth/providers/linkedin";

// const handler =  NextAuth({
//     providers: [
//         TwitterProvider({
//             clientId: process.env.TWITTER_CLIENT_ID,
//             clientSecret: process.env.TWITTER_CLIENT_SECRET,
//             version: "2.0", // Use OAuth 2.0
//         }),
//         LinkedInProvider({
//             clientId: process.env.LINKEDIN_CLIENT_ID,
//             clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//         }),
//     ],
//     callbacks: {
//         async jwt({ token, account }) {
//             if (account) {
//                 token.accessToken = account.access_token;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             session.accessToken = token.accessToken;
//             return session;
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// });

// export {handler as POST , handler as GET};