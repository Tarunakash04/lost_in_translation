const express = require("express");
const axios = require("axios");
const Translation = require("../models/Translation");
const router = express.Router();

// Free translation API
const TRANSLATE_API_URL = "https://libretranslate.com/api/translate"; // Corrected endpoint

// Define a sequence of languages for translation
const LANG_SEQUENCE = ["fr", "de", "es", "it", "ja", "en"]; // French → German → Spanish → Italian → Japanese → English

router.post("/translate", async (req, res) => {
  try {
    let { text } = req.body;
    let sourceLang = "en";
    let translations = [];

    for (let i = 0; i < LANG_SEQUENCE.length; i++) {
      const targetLang = LANG_SEQUENCE[i];
      
      // Call LibreTranslate API
      const response = await axios.post(TRANSLATE_API_URL, {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: "text",
      }, {
        headers: { "Content-Type": "application/json" }
      });

      text = response.data.translatedText;
      translations.push({ lang: targetLang, text });
      sourceLang = targetLang;
    }

    // Save final translation
    const finalTranslation = await Translation.create({
      text: req.body.text,
      translatedText: text,
      sourceLang: "en",
      targetLang: "en",
    });

    res.json({ original: req.body.text, translations, final: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;
