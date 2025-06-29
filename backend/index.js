import OpenAi from 'openai';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

console.log(process.env);

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());

//const newsKey = process.env.NEWS_KEY
const openai = new OpenAi({
    apiKey: process.env.API_KEY
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/country/:id", async (req, res) => {
    try {
        const country = req.params.id
        // const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${country}&apiKey=${newsKey}`)
        // if (!newsResponse) {
        //     console.log("Could not retrieve articles");
        //     throw new Error ("Could not retrieve articles");
        // }
        // const articles = newsResponse.data.articles.map(article => article.description).join('\n');

        // if (!articles) {
        //     return res.status(404).json({ error: "No news articles found"});
        // }

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an AI that analyzes country stability."
                },
                {
                    role: "user",
                    //content: `Analyze the following news and determine the sentiment (positive, neutral, or negative) and assign a stability score from 1-100: \n\n${articles} Please provide the stability score as the first number in your response.`
                    content: `Analyze the following country: ${country} and determine the sentiment (positive, neutral, or negative) and assign a stability score from 1-100 Please provide the stability score as the first number in your response.`
                }
            ]
        });
        const aiResult = aiResponse.choices[0].message.content;
        let x = aiResult.match(/\d+/);
        const score = parseInt(x);
        res.json({ country, analysis: aiResult , stabilityScore: score });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error"})
    }
});

app.listen(8080, () => console.log("Server running on port 8080"));
