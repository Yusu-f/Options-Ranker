const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.fetchOptions = functions.https.onRequest(async(req, res) => {
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
});

