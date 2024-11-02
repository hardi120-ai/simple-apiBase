/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const q = req.query.q || ""
  const apiKey = req.query.apiKey
  if (!q) {
    return res.status(400).json({
      error: "mau buat apa lu jirr"
    })
  }
  
    if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }
  

const url = 'https://duckduckgo.com/duckchat/v1/chat';

const payload = {
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: q
    }
  ]
};

const headers = {
  'User-Agent': 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
  'Accept': 'text/event-stream',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Content-Type': 'application/json',
  'x-vqd-4': '4-74467779026257759346368850849287520444',
  'sec-ch-ua-platform': '"Android"',
  'sec-ch-ua': '"Android WebView";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  'sec-ch-ua-mobile': '?1',
  'origin': 'https://duckduckgo.com',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-mode': 'cors',
  'sec-fetch-dest': 'empty',
  'referer': 'https://duckduckgo.com/',
  'accept-language': 'en,en-US;q=0.9',
  'priority': 'u=1, i',
  'Cookie': 'dcm=3'
};

function parseStreamMessages(responseText) {
  // Split the response into individual data streams
  const streams = responseText.trim().split('data: ');
  
  // Initialize empty string to store combined message
  let combinedMessage = '';
  
  // Process each stream
  streams.forEach(stream => {
    if (stream && stream !== '[DONE]') {
      try {
        // Parse JSON data
        const data = JSON.parse(stream.trim());
        
        // Extract message if it exists
        if (data.message !== null && data.message !== undefined) {
          combinedMessage += data.message;
        }
      } catch (error) {
        // Continue to next stream if JSON parsing fails
        return;
      }
    }
  });
  
  return combinedMessage.trim();
}

async function makeRequest() {
  try {
    const response = await axios.post(url, payload, { headers });
    const result = parseStreamMessages(response.data);
    m.reply(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

  try {
    res.status(200).json({
      creator: "Hann",
      hasil: makeRequest()
    })
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
