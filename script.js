// Nebius API settings
const API_ENDPOINT = 'https://api.studio.nebius.ai/v1/chat/completions';
// Replace 'YOUR_API_KEY_HERE' with your actual API key
const API_KEY = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzQ0NzE5MDA1MjIzOTc2MTg0NyIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg4OTIyMTEzNiwidXVpZCI6IjI5NTMwY2UyLTlkYWQtNDFmYS1iYTRjLTNkYjRiMWY2NmU4YiIsIm5hbWUiOiJDb2RlciIsImV4cGlyZXNfYXQiOiIyMDI5LTExLTEyVDIzOjM4OjU2KzAwMDAifQ.ne1VImBXINCq7uRHZqgEh1dvVmNQF5uMQdopeGXOMQc';

document.getElementById('codeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userPrompt = document.getElementById('userPrompt').value;
    if (!userPrompt) {
        alert("Please enter a requirement.");
        return;
    }

    try {
        // Show loading message
        document.getElementById('codeOutput').textContent = "Generating code...";

        // Fetch generated code from Nebius API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
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

        // Display the generated text/code
        if (data.choices && data.choices[0] && data.choices[0].message) {
            document.getElementById('codeOutput').textContent = data.choices[0].message.content;
        } else {
            document.getElementById('codeOutput').textContent = "Failed to generate code.";
        }
    } catch (error) {
        console.error("Error generating code:", error);
        document.getElementById('codeOutput').textContent = "An error occurred. Please try again.";
    }
}); 
