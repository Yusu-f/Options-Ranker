const axios = require("axios")
const path = require("path")

// Initital data fetching using a web crawler
exports.postCrawlOptions = async (req, res, next) => {
  const url = `https://www.marketwatch.com/investing/stock/nok?type=stock&page=options`;
  console.log("processing...");

  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setDefaultTimeout(0);
    await page.goto(url);

    let tabs = await page.$$("div.accordion__item.j-tabPane")

    //await page.waitForTimeout(1000)
    tabs.forEach(async (tab, i) => {
      console.log("clicking");
      if (i > 1) await page.click(`body > div.container.container--body > div.region.region--primary > div > div > mw-hybrid > div:nth-child(${i + 1})`)
      //await page.waitForTimeout(1000)
    })

    await page.evaluate(() => {
      console.log("clicking");
      let tabs = document.querySelectorAll("div.accordion__item.j-tabPane")
      tabs.forEach(tab => {
        tab.click()
      })
    })

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage()
    page.setDefaultTimeout(0)
    await page.goto(url)

    const accordions = await page.$$("div.accordion__item.j-tabPane")
    accordions.forEach(async (tab, i) => {
      const button = await page.$$(`body > div.container.container--body > div.region.region--primary > div
        > div > mw-hybrid > div:nth-child(${i + 1})`)
      await button[0].click()
      await page.waitForSelector("body > div.container.container--body > div.region.region--primary > div > div > mw-hybrid > div:nth-child(${i + 1}) > div.accordion__body.j-tabBody > div > div > div > table"))
    const html = await page.content()

    await page.evaluate(() => {
      console.log("clicking");
      let accordions = document.querySelectorAll("div.accordion__item.j-tabPane")
      accordions.forEach(accordion => {
        accordion.click()
      })
    })

    const tabs = await page.$$('body > div.container.container--body > div.region.region--primary > div > div > mw-hybrid > ul > li')

    tabs.forEach(async (tab, i) => {
      const button = await page.$x(`/html/body/div[4]/div[5]/div/div/mw-hybrid/ul/li[${i + 1}]`)
      await button[0].click()
    })

    const accordions = await page.$$("div.accordion__item.j-tabPane");
    accordions.forEach(async (tab, i) => {
      const button = await page.$$(
        `body > div.container.container--body > div.region.region--primary > div > div > mw-hybrid > div:nth-child(${i + 1
        })`
      );
      await button[0].click();
      await page.waitForSelector(
        `body > div.container.container--body > div.region.region--primary > div > div > mw-hybrid > div:nth-child(${i + 1
        }) > div.accordion__body.j-tabBody > div > div > div > table`
      );
    });

    //await page.waitForTimeout(10000);
    const tables = await page.$$("table.table.table--overflow");
    //console.log(tables.length);
    const displayed = page.waitForFunction(
      () => {
        return (
          document.querySelectorAll("table.table.table--overflow").length > 30
        );
      },
      { timeout: 0 }
    );
    await displayed;

    const html = await page.content();

    const $ = cheerio.load(html);
    const allOptions = [];
    const table = $("table.table.table--overflow");
    console.log(table.length);

    table.each(function () {
      const expiryDate = $(this)
        .find("span.text")
        .text()
        .split(" ")
        .slice(1)
        .join(" ");
      const rows = $(this).find("tr.table__row");
      rows.each(function () {
        let cells = $(this).find("div.option__cell");
        let arr = [];
        if (cells.length > 5) {
          cells.each(function () {
            arr.push($(this).text());
          });
          //console.log(arr);
          let strike = +arr[0].trim().split(",").join("");
          let ask = +arr[5].trim().split(",").join("");

          const option = {
            expiry: expiryDate,
            strike: strike,
            leverage: +(strike / ask).toPrecision(5),
            price: ask,
          };

          if (option.leverage > 1 && option.leverage != Infinity) {
            allOptions.push(option);
          }
        }
      });
    });

    const sortedOptions = allOptions.sort((a, b) => b.leverage - a.leverage);
    browser.close();
  } catch (err) {
    console.log(err);
  }
};


// Getting data via API reverse-engineering
exports.postFetchOptions = async (req, res, next) => {
  try {
    const string = req.body.ticker
    const tickers = (string.split(",").map(e => e.trim()));
    const prop = req.body.sortBy
    console.log(tickers);

    let allOptions = []

    for (let i = 0; i < tickers.length; i++) {
      try {
        const ticker = req.body.ticker
        const expiresInDays = +req.body.expiry

        let expiresInDate = new Date().setHours(0, 0, 0, 0)
        expiresInDate = new Date(expiresInDate)
        expiresInDate = expiresInDate.setDate(expiresInDate.getDate() + expiresInDays)

        let lastPrice = await axios.get(`https://api.nasdaq.com/api/quote/${tickers[i]}/info?assetclass=stocks`)
        lastPrice = lastPrice.data.data.primaryData.lastSalePrice.slice(1)

        let result = await axios.get(`https://api.nasdaq.com/api/quote/${tickers[i]}/option-chain?assetclass=stocks&limit=1000000&offset=0&fromdate=all&todate=undefined&excode=oprac&callput=call&money=all&type=all`)
        result = result.data.data.table.rows;
        console.log(result);

        let expiryDate;
        let options = result.map(result => {
          let leverage = (result.strike / result.c_Ask).toPrecision(5)
          expiryDate = result.expirygroup != "" ? result.expirygroup : expiryDate
          let prox = (+result.strike - +lastPrice) / (.01 * +lastPrice)
          let daysToExpiry = new Date(expiryDate) - new Date().setHours(0, 0, 0, 0)
          daysToExpiry = (daysToExpiry / (1000 * 60 * 60 * 24));

          if (isNaN(leverage) || new Date(expiryDate) < Date.now() || new Date(expiryDate) < expiresInDate) return

          return {
            ticker: tickers[i],
            expiry: expiryDate,
            leverage: +leverage,
            strike: +result.strike,
            price: +result.c_Ask,
            quality: ((+leverage * daysToExpiry) / +prox).toPrecision(5)
          }
        })

        options = (options.filter(option => option != undefined));
        allOptions = (allOptions.concat(options));
      } catch (err) {
        console.log(err);
      }
    }

    const sortBy = (array, prop, order = "descending") => {
      if (order == "ascending") return array.sort((a, b) => (a[prop] - b[prop]))
      return array.sort((a, b) => (b[prop] - a[prop]))
    }

    res.status(200).json({ options: sortBy(allOptions, prop) });
  } catch (error) {
    res.status(400).json({ error: error })
  }
}




