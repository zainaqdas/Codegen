const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const { userPrompt } = req.body;

    if (!userPrompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const response = await fetch('https://api.studio.nebius.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEBIUS_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "temperature": 0.6,
                "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",
                "messages": [
                    {
                        "role": "user",
                        "content": userPrompt
                    }
                ]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
