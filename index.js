require('./bootstrap');
const express = require('express');
const cors = require('cors');
const app  = express();
const PORT = process.env.PORT ||  4000;
const authRoutes = require('./app/v1/routes/auth');
const appointmentRoutes = require('./app/v1/routes/appointments');


app.use(express.json());

app.use(cors());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode, on http://localhost:${PORT}`);
});
