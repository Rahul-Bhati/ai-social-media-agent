import TwitterProvider from "next-auth/providers/twitter";

export const authOptions = {
    providers: [
        TwitterProvider({
            clientId: process.env.TWITTER_APP_KEY,
            clientSecret: process.env.TWITTER_APP_SECRET,
            version: "1.0A", // Required for OAuth 1.0a (User Context)
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.oauth_token;
                token.accessSecret = account.oauth_token_secret; // This is needed!
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.accessSecret = token.accessSecret; // Ensure this is included
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in .env
}