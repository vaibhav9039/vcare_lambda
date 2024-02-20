const fs = require('fs');
const updateFrequency = require('../src/handlers/updateFrequency');


const eventData = fs.readFileSync('../src/handlers/data.json', 'utf8');

updateFrequency.handler(eventData, null)
    .then((response) => {
        console.log("Lambda function response:", response);
    })
    .catch((error) => {
        console.error("Error invoking Lambda function:", error);
    });
