const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const { full_name, dob, email, roll_number, data } = req.body;

    if (!full_name || !dob || !email || !roll_number || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Missing required fields or invalid data format"
        });
    }

    const numbers = [];
    const alphabets = [];

    data.forEach(element => {
        if (/^\d+$/.test(element)) {
            numbers.push(element);
        } else if (/^[a-zA-Z]$/.test(element)) {
            alphabets.push(element.toUpperCase());
        }
    });

    const highestAlphabet = alphabets.length > 0 
        ? [alphabets.reduce((max, current) => max > current ? max : current)]
        : [];

    const response = {
        is_success: true,
        user_id: `${full_name.replace(/\s+/g, '_')}_${dob}`,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
