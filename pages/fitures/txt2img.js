/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const fetch = require("node-fetch")
const { FormData, Blob } = require("form-data");
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

 const fluxschnell = async (prompt) => {
try {
      const response = await axios.post(`https://api.cloudflare.com/client/v4/accounts/77192fa7d0e666303fc9ba04a53bbc87/ai/run/@cf/black-forest-labs/flux-1-schnell`, { "prompt": prompt }, { headers: { "Authorization": "Bearer Ds3TLA6CuIplDCpvia8zfXIy60rInplXbcVdVZIM" } });
      return response.data;
    } catch (error) {
      return error
    }
}

const upload = async (buffer) => {
    let data = new FormData();
const blob = new Blob([buffer], {
        type: "upload.jpg",
      });
    data.append("files[]", blob, "upload.jpg"); // Nama file bisa disesuaikan


    let response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: data
    });

    let resp = await response.json()
return resp.files[0].url
}
  
  try {
    const hai = await fluxschnell(q)
const buffer = Buffer.from(hai.result.image, 'base64')
const data = await upload(buffer)
    res.status(200).json({
      data
    })
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
