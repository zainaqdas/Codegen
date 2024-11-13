document.getElementById('codeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const userPrompt = document.getElementById('userPrompt').value;
    document.getElementById('codeOutput').textContent = "Generating code...";

    try {
        const response = await fetch('/api/generateCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userPrompt })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                document.getElementById('codeOutput').textContent = data.choices[0].message.content;
            } else {
                document.getElementById('codeOutput').textContent = "Failed to generate code.";
            }
        } else {
            document.getElementById('codeOutput').textContent = "Error: Unable to generate code.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('codeOutput').textContent = "An error occurred. Please try again.";
    }
});
