"use strict";
const express = require("express");
// https://github.com/sskender/nodejs-backend-starter.git
const app = express();
const PORT = 3001 || process.env.PORT;
app.use('/api/v1', require('./routes/v1'));
// app.use(require('./routes/errors').clientErrorHandler)
// app.use(require('./routes/errors').errorHandler)
app.get('/', (req, res) => {
    res.send("User service!");
});
app.listen(PORT, () => console.log("User service started"));
//# sourceMappingURL=app.js.map