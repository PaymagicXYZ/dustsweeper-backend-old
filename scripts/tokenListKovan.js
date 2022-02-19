const addressHelper = require("./addressHelper");

module.exports = {
    tokens:
        [
            {
                "address": addressHelper.linkTokenAddress,
                "symbol": "LINK"
            },
            {
                "address": addressHelper.zrxTokenAddress,
                "symbol": "ZRX"
            },
            {
                "address": addressHelper.batTokenAddress,
                "symbol": "BAT"
            },
        ]
};