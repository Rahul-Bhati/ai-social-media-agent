import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
require("dotenv").config();

export async function POST(req) {
  console.log("API called");

  try {
    const { url, accessToken, accessSecret } = await req.json();

    // 🔍 Debug logs to verify if the API is receiving tokens
    console.log("Received URL:", url);
    console.log("Received Access Token:", accessToken);
    console.log("Received Access Secret:", accessSecret);

  //   if (!url || !accessToken || !accessSecret) {
  //     console.error("Missing required parameters");
  //     return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  //   }

  //   // ✅ Authenticate with Twitter using user's OAuth tokens
  //   const twitterClient = new TwitterApi({
  //     appKey: process.env.TWITTER_APP_KEY,
  //     appSecret: process.env.TWITTER_APP_SECRET,
  //     accessToken,   // ✅ Use received token
  //     accessSecret,  // ✅ Use received secret
  //   });

  //   console.log("Twitter Authentication Successful");

  //   // ✅ Post a sample tweet (uncomment when testing)
  //   // const response = await twitterClient.v2.tweet("Test tweet from API! 🚀");
  //   // console.log("Tweet posted successfully:", response);

  //   return NextResponse.json({
  //     success: true,
  //     message: "Tweet posted successfully",
  //     url,
  //   });

  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
