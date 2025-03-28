
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Twitter,
  Youtube,
  FileText,
  Bot,
  Sparkles,
} from "lucide-react";
import LoginButton from "@/components/LoginButton";
import axios from "axios";

export default function LandingPage() {
  // Server Action for Form Submission
  async function generateTweets(formData) {
    "use server"; // Marks this as a Server Action

    const url = formData.get("url");
    console.log("first", url);

    if (!url) {
      return { error: "Please provide a valid URL" };
    }

    // Simulate tweet generation (replace with your actual logic)
    try {
      // Example: Call an API or process the URL
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
      const res = await axios.post(`${apiBaseUrl}/api/genrate-tweet`, { url });

      // const res = await axios.post("/api", { url });
      console.log(res.data.message);

      const tweets = `Generated tweets from ${url}`;
      return { success: true, tweets };
    } catch (error) {
      console.log(error);
      return { error: "Failed to generate tweets. Try again." };
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Twitter className="h-5 w-5" />
            <span className="text-lg font-bold sm:text-xl">TweetCraft AI</span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="#features"
              className="text-sm hover:text-primary transition-colors hidden sm:block"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm hover:text-primary transition-colors hidden sm:block"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm hover:text-primary transition-colors hidden sm:block"
            >
              Pricing
            </Link>
            <ThemeToggle />
            <LoginButton />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto flex flex-col items-center gap-6 text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Create <span className="text-primary">Twitter Content</span> with
              AI
            </h1>
            <p className="max-w-[42rem] text-muted-foreground text-base sm:text-lg md:text-xl">
              Automate your Twitter presence with AI-powered content creation
              and scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-8" size="lg" asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                size="lg"
                asChild
              >
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
            
            {/* Optimized Tweet Generator Section */}
            <div className="w-full max-w-3xl mt-8 rounded-lg border bg-background p-4 sm:p-6 shadow-md">
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 w-full">
                  <TabsTrigger
                    value="video"
                    className="flex items-center justify-center text-sm sm:text-base py-2"
                  >
                    <Youtube className="mr-2 h-4 w-4" />
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger
                    value="article"
                    className="flex items-center justify-center text-sm sm:text-base py-2"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Article
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-4">
                  <form
                    action={generateTweets}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <Input
                      name="url"
                      placeholder="Paste YouTube URL..."
                      className="flex-1 text-sm sm:text-base"
                      required
                      type="url"
                    />
                    <Button
                      type="submit"
                      className="w-full sm:w-auto px-4"
                      disabled={false} // Add loading state if needed
                    >
                      Generate Tweets
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    Generate tweets from any YouTube video URL
                  </p>
                </TabsContent>

                <TabsContent value="article" className="space-y-4">
                  <form
                    action={generateTweets}
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <Input
                      name="url"
                      placeholder="Paste article URL..."
                      className="flex-1 text-sm sm:text-base"
                      required
                      type="url"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full sm:w-auto px-4"
                      disabled={false} // Add loading state if needed
                    >
                      Generate Tweets
                    </Button>
                  </form>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    Generate tweets from any article URL
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="bg-muted py-12 sm:py-16 lg:py-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Features
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                AI-powered Twitter content creation made simple
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  icon: Bot,
                  title: "AI-Powered Content",
                  desc: "Generate engaging tweets from videos and articles",
                },
                {
                  icon: Twitter,
                  title: "Direct Posting",
                  desc: "Post to Twitter with one click",
                },
                {
                  icon: Calendar,
                  title: "Smart Scheduling",
                  desc: "Ascendantly, I’ll use `asChild` for buttons with `Link` to avoid hydration issues and improve accessibility."
                },
                {
                  icon: Youtube,
                  title: "Video Content",
                  desc: "Convert YouTube videos to tweets",
                },
                {
                  icon: FileText,
                  title: "Article Summaries",
                  desc: "Turn articles into tweet-sized insights",
                },
                {
                  icon: Sparkles,
                  title: "Multiple Suggestions",
                  desc: "Choose from multiple tweet options",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="border rounded-lg p-6 bg-background hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Three simple steps to automate your Twitter
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  step: 1,
                  title: "Connect Account",
                  desc: "Securely connect your Twitter",
                },
                {
                  step: 2,
                  title: "Input Content",
                  desc: "Paste video or article URL",
                },
                {
                  step: 3,
                  title: "Post/Schedule",
                  desc: "Choose and post AI-generated tweets",
                },
              ].map((step) => (
                <div
                  key={step.step}
                  className="border rounded-lg p-6 bg-background text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Pricing
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Choose your plan
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                {
                  title: "Free",
                  price: "$0",
                  features: ["5 tweets/day", "Basic AI", "Manual posting"],
                  variant: "outline",
                },
                {
                  title: "Pro",
                  price: "$19",
                  features: [
                    "Unlimited tweets",
                    "Advanced AI",
                    "Scheduling",
                    "Analytics",
                  ],
                  popular: true,
                },
                {
                  title: "Business",
                  price: "$49",
                  features: [
                    "Everything in Pro",
                    "Team collaboration",
                    "Advanced analytics",
                    "Priority support",
                  ],
                  variant: "outline",
                },
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`border rounded-lg p-6 bg-background relative ${plan.popular ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs">
                      Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <p className="text-3xl font-bold my-2">{plan.price}</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    per month
                  </p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.variant} asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl mb-4">
              Transform Your Twitter Strategy
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              Join creators saving time and growing with TweetCraft AI
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started For Free</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Twitter className="h-5 w-5" />
            <p className="text-sm">
              © {new Date().getFullYear()} TweetCraft AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}



// import Image from "next/image";
// import Login from "./login";
// import LandingPage from "@/components/LandingPage";

// export default function Home() {
//   return (
//     <>
//       {/* <Login /> */}
//       <LandingPage />
//     </>
//   );
// }
