let axios = require("axios");
let cheerio = require("cheerio");

let baseUrl = "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports";

class Crawler {
  constructor() {}
  async scrape() {
    let { data } = await axios.get(baseUrl);
    const $ = cheerio.load(data);
    let retData = [];
    $(".sf-content-block > div >p").each(function(i, elem) {
      retData.push({
        name: $(this)
          .find("a")
          .text()
          .trim(),
        link:
          "https://www.who.int" +
          $(this)
            .find("a")
            .attr("href"),
        text: $(this)
          .text()
          .trim()
      });
    });

    retData = retData.filter(d => d.name && d.name.length > 4);
    retData = retData.filter(d => d.text && d.text.length > 4);
    retData = retData.map(d => {
      let date = d.text.substring(d.text.lastIndexOf("nCoV)") + 5);
      if (date.indexOf("COVID-19") > -1) {
        date = d.text.substring(d.text.indexOf("COVID-19") + 10);
      }
      if (date) date = date.trim();
      return {
        no: parseInt(d.name.match(/\d+/)[0]),
        type: "WHO",
        name: d.name,
        url: d.link,
        date
      };
    });
    return retData;
  }
}

module.exports = new Crawler();
