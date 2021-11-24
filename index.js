require('./bootstrap');
const express = require('express');
const app  = express();
const PORT = process.env.PORT ||  4000;
const authRoutes = require('./app/v1/routes/auth');


app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, on http://localhost:${PORT}`);
});
