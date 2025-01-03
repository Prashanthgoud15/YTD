document.getElementById("downloadBtn").addEventListener("click", async () => {
    const videoUrl = document.getElementById("videoUrl").value;
    const format = document.getElementById("format").value;
    const statusMessage = document.getElementById("statusMessage");

    if (!videoUrl) {
        statusMessage.textContent = "Please enter a valid YouTube video URL.";
        statusMessage.style.color = "red";
        return;
    }

    statusMessage.textContent = "Processing...";
    statusMessage.style.color = "#333";

    try {
        const response = await fetch("http://127.0.0.1:5000/download", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ videoUrl, format })
        });

        const data = await response.json();

        if (response.ok) {
            statusMessage.textContent = "Download Successful!";
            statusMessage.style.color = "green";
        } else {
            statusMessage.textContent = data.error || "An error occurred.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        statusMessage.textContent = "Failed to connect to the server.";
        statusMessage.style.color = "red";
    }
});
