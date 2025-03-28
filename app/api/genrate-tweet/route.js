import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const prompt = `
You are an AI assistant specializing in transcribing YouTube videos and generating engaging social media posts. Your task is as follows:

1. Transcription:
   - Extract the entire spoken content from the given YouTube video URL.
   - Do not include timestamps, speaker labels, or additional formatting like 'bold-text'.
   - Ensure the output is a single block of text in plain format, maintaining coherence and readability.

2. LinkedIn Post:
   - Based on the transcription, generate an engaging LinkedIn post that summarizes the key insights, humor, or themes from the video.
   - Make the tone conversational and relatable to professionals, creators, or general audiences.
   - Use relevant hashtags to increase visibility.
   - Do not exceed 3,000 characters.
   - Do not include suggestions or multiple options—only provide one complete LinkedIn post.

3. Twitter Post:
   - Summarize the key theme of the video into a single engaging tweet.
   - Ensure the tweet remains within 280 characters.
   - Use a casual and engaging tone while maintaining clarity.
   - Include relevant hashtags, but do not overuse them.
   - Avoid special characters except emojis where appropriate.

Output format:
Return only the final outputs in plain text, following this structure:

[Output] in js object Formate containing three field : transcript, twitterPost, linkedinPost

`;

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
export async function POST(req) {
  console.log("First");

  // Get authentication token from NextAuth
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(session);

  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    console.log(url);
    const twitterPost = "Learn how to use the Twitter API v2 with OAuth 1.0a! 🚀";


    // Authenticate using Twitter API with OAuth 1.0a
    const twitterClient = new TwitterApi({
      appKey: process.env.TWITTER_APP_KEY,
      appSecret: process.env.TWITTER_APP_SECRET,
      accessToken: session.accessToken,
      accessSecret: session.accessSecret,
    });

    console.log("TWITTER_APP_KEY => ", process.env.TWITTER_APP_KEY);
    console.log("TWITTER_APP_SECRET => ", process.env.TWITTER_APP_SECRET);
    console.log("accessSecret => ", process.env.accessSecret);
    console.log("accessToken => ", process.env.accessToken);
    console.log("GEMINI_API_KEY => ", process.env.GEMINI_API_KEY);


      // Generate transcription
      // const chatSession = model.startChat({
      //     generationConfig,
      //     history: [{ role: "user", parts: [{ text: `${transcribePrompt} ${url}` }] }],
      // });
      // const transcriptResult = await chatSession.sendMessage("Please transcribe this video.");
      // const transcript = transcriptResult.response.text();

      // // Generate Twitter post
      // const twitterSession = model.startChat({ generationConfig });
      // const twitterPostResult = await twitterSession.sendMessage(`${twitterPrompt} ${transcript}`);
      // const tweetText = twitterPostResult.response.text();

      // const response = await twitterClient.v2.tweet(tweetText);
        // console.log("Tweet posted successfully:", response);

    return NextResponse.json({
      success: true,
      message: "Tweet posted successfully",
      // tweetId: response.data.id,
      url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
