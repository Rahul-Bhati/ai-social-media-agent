"use server"; // ✅ This explicitly makes it a Server Action

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash", });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const transcribePrompt = `
Extract the entire spoken content from the given YouTube video URL.
   - Do not include timestamps, speaker labels, or additional formatting like 'bold-text'.
   - Ensure the output is a single block of text in plain format, maintaining coherence and readability.
`;
const twitterPrompt = `
 Ensure the tweet remains within 280 characters.
   - Use a casual and engaging tone while maintaining clarity.
   - Include relevant hashtags, but do not overuse them.
   - Avoid special characters except emojis where appropriate.
`;

export default async function generateTweets(formData) {
    console.log("First");

    // Get authentication token from NextAuth
    const session = await getServerSession(authOptions);

    if (!session) {
        console.log("session erro , unauthorized")
        return false;
    }

    console.log(session);

    console.log(formData.get("url"))

    try {
        if (!formData.get("url")) {
            console.log("URL is required");
            return false;
        }

        // // Authenticate using Twitter API with OAuth 1.0a
        // const twitterClient = new TwitterApi({
        //     appKey: process.env.TWITTER_APP_KEY,
        //     appSecret: process.env.TWITTER_APP_SECRET,
        //     accessToken: session.accessToken,
        //     accessSecret: session.accessSecret,
        // });

        console.log("TWITTER_APP_KEY => ", process.env.TWITTER_APP_KEY);
        console.log("TWITTER_APP_SECRET => ", process.env.TWITTER_APP_SECRET);
        console.log("accessSecret => ", process.env.accessSecret);
        console.log("accessToken => ", process.env.accessToken);
        console.log("GEMINI_API_KEY => ", process.env.GEMINI_API_KEY);

        // console.log(twitterClient);

        // // Generate transcription
        // const chatSession = model.startChat({
        //     generationConfig,
        //     history: [{ role: "user", parts: [{ text: `${transcribePrompt} ${formData.get("url")}` }] }],
        // });
        // const transcriptResult = await chatSession.sendMessage("Please transcribe this video.");
        // const transcript = transcriptResult.response.text();

        // console.log(transcript);

        // // Generate Twitter post
        // const twitterSession = model.startChat({ generationConfig });
        // const twitterPostResult = await twitterSession.sendMessage(`${twitterPrompt} ${transcript}`);
        // const tweetText = twitterPostResult.response.text();

        // console.log(tweetText)

        // const response = await twitterClient.v2.tweet(tweetText);
        // console.log("Tweet posted successfully:", response.data);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
