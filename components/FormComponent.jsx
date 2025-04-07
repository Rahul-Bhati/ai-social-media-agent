"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import axios from 'axios';

const FormComponent = () => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) {
            setResponse("Please Put a Url In Input Box!")
            return;
        }

        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post("/api", { url: input });
            setResponse(res.data.message);
        } catch (error) {
            setResponse("Error submitting data");
        } finally {
            setLoading(false);
        }
    };
  return (
    <>
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
                          onSubmit={handleSubmit}
                          className="flex flex-col sm:flex-row gap-2"
                      >
                          <Input
                              name="url"
                              placeholder="Paste YouTube URL..."
                              className="flex-1 text-sm sm:text-base"
                              required
                              type="url"
                              onChange={(e) => setInput(e.target.value)}
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
                          action={handleSubmit}
                          className="flex flex-col sm:flex-row gap-2"
                      >
                          <Input
                              name="url"
                              placeholder="Paste article URL..."
                              className="flex-1 text-sm sm:text-base"
                              required
                              type="url"
                              onChange={(e) => setInput(e.target.value)}
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

    </>
  )
}

export default FormComponent