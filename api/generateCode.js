const fetch = require('node-fetch');

const TIMEOUT = 10000; // 10 seconds timeout

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  try {
    // Create a promise for the fetch request
    const fetchPromise = fetch('https://api.studio.nebius.ai/v1/chat/completions', {
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

    // Set a timeout for the fetch request
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), TIMEOUT)
    );

    // Wait for either fetch or timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    if (error.message === 'Request timed out') {
      res.status(504).json({ message: 'Gateway Timeout: The request took too long to process.' });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
