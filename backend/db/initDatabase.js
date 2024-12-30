const db = require('./database');
const axios = require('axios');

// URL of the JSON data
const url = 'https://pecto-content-f2egcwgbcvbkbye6.z03.azurefd.net/language-data/language-data/russian-finnish/cards/curated_platform_cards/sm1_new_kap1.json';

// Function to load data and insert into the database
async function loadInitialData() {
    try {
        // Fetch the data from the URL
        const response = await axios.get(url);
        const jsonData = response.data;

        // Create the table if it does not exist
        db.serialize(() => {
            db.run(`
                CREATE TABLE IF NOT EXISTS words (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    wordFirstLang TEXT NOT NULL,
                    sentenceFirstLang TEXT NOT NULL,
                    wordSecondLang TEXT NOT NULL,
                    sentenceSecondLang TEXT NOT NULL
                )
            `);

            // Insert the fetched data into the database
            const stmt = db.prepare('INSERT INTO words (id, wordFirstLang, sentenceFirstLang, wordSecondLang, sentenceSecondLang) VALUES (?, ?, ?, ?, ?)');
            jsonData.forEach((item) => {
                stmt.run(item.id, item.wordFirstLang, item.sentenceFirstLang, item.wordSecondLang, item.sentenceSecondLang);
            });

            stmt.finalize();
            console.log('Initial data loaded successfully.');
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Load the initial data when the app starts
loadInitialData();
