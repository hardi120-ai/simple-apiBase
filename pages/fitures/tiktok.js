/*
   * by balzz
   * dont delate my wm
   * follow more instagram: @iqstore78
*/
const axios = require("axios")
const cheerio = require("cheerio")
const allowedApiKeys = require("../../declaration/arrayKey.jsx")

module.exports = async (req, res) => {
  const urls = req.query.urls
  const apiKey = req.query.apiKey

  if (!urls) {
    return res.status(400).json({
      error: "Url Tiktok Nya Mana?"
    })
  }

  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(403).json({
      error: "Input Parameter Apikey !"
    })
  }

  async function tiktok(url) {
    try {
        const data = new URLSearchParams({
            'id': url,
            'locale': 'id',
            'tt': 'RFBiZ3Bi'
        });

        const headers = {
            'HX-Request': true,
            'HX-Trigger': '_gcaptcha_pt',
            'HX-Target': 'target',
            'HX-Current-URL': 'https://ssstik.io/id',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://ssstik.io/id'
        };

        const response = await axios.post('https://ssstik.io/abc?url=dl', data, {
            headers
        });
        const html = response.data;

        const $ = cheerio.load(html);

        const author = $('#avatarAndTextUsual h2').text().trim();
        const title = $('#avatarAndTextUsual p').text().trim();
        const video = $('.result_overlay_buttons a.download_link').attr('href');
        const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
        const imgLinks = [];
        $('img[data-splide-lazy]').each((index, element) => {
            const imgLink = $(element).attr('data-splide-lazy');
            imgLinks.push(imgLink);
        });

        const result = {
            isSlide: video ? false : true,
            author,
            title,
            result: video || imgLinks,
            audio
        };
        return result
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
  try {
    const response = await tiktok(urls)
 
    res.status(200).json({
      data: response
    })
  } catch (error) {
    res.status(500).json({
      error: "Ada masalah, coba lagi nanti"
    })
  }
}
