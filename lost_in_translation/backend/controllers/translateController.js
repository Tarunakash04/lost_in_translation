const fetch = require("node-fetch");
require("dotenv").config();

const translateText = async (req, res) => {
    try {
        const { text, sourceLang, targetLang } = req.body;

        if (!text || !sourceLang || !targetLang) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Call LibreTranslate API
        const response = await fetch(process.env.LIBRETRANSLATE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: sourceLang,
                target: targetLang,
                format: "text"
            })
        });

        const data = await response.json();

        if (!data.translatedText) {
            return res.status(500).json({ error: "Translation failed" });
        }

        res.json({ translatedText: data.translatedText });
    } catch (error) {
        console.error("Translation Error:", error);
        res.status(500).json({ error: "Failed to translate text" });
    }
};

module.exports = { translateText };
