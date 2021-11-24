require('./bootstrap');
const express = require('express');
const app  = express();
const PORT = process.env.PORT ||  4000;


app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, on http://localhost:${PORT}`);
});
