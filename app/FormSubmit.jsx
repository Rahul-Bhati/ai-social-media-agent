"use client"; // Required for interactivity in Next.js App Router

import React, { useState } from "react";
import axios from "axios";

function FormSubmit() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

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
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <h2 className="text-xl text-black font-semibold mb-4 text-center">Submit Video URL</h2>
                <form onSubmit={handleSubmit} className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Enter YouTube video URL"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 p-2 text-black placeholder:text-gray-950 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {response && <p className="mt-4 text-center text-green-500">{response}</p>}
            </div>
        </div>
    );
}

export default FormSubmit;
