const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Extract HWID and source from the query parameters
    const params = event.queryStringParameters;
    const hwid = params.hwid;
    const source = params.source;

    if (!hwid || !source) {
        return {
            statusCode: 400,
            body: JSON.stringify({ key: null, status: 'Invalid parameters', result: 'Error' })
        };
    }

    let apiUrl;
    if (source === 'fluxus') {
        apiUrl = `https://stickx.top/api-fluxus/?hwid=${hwid}&api_key=E99l9NOctud3vmu6bPne`;
    } else if (source === 'delta') {
        apiUrl = `https://stickx.top/api-delta/?hwid=${hwid}&api_key=tUnAZj3sS74DJo9BUb8tshpVhpLJLA`;
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ key: null, status: 'Invalid source', result: 'Error' })
        };
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const key = data.key || 'Key not found';

        return {
            statusCode: 200,
            body: JSON.stringify({ key, status: 'API working', result: 'Success' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ key: null, status: 'API error', result: error.message })
        };
    }
};
