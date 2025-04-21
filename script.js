async function askBots() {
  const question = document.getElementById("userInput").value;

  // Update UI to show loading
  document.getElementById("openai").querySelector("p").textContent = "Loading...";
  document.getElementById("huggingface").querySelector("p").textContent = "Loading...";
  document.getElementById("groq").querySelector("p").textContent = "Loading...";

  // OpenAI (you’ll need a free key from OpenAI)
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "sk-efghijklmnop5678efghijklmnop5678efghijkl",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }]
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("openai").querySelector("p").textContent =
      data.choices[0].message.content;
  })
  .catch(() => {
    document.getElementById("openai").querySelector("p").textContent =
      "Failed to load response.";
  });

  // Hugging Face
  fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: question })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("huggingface").querySelector("p").textContent =
      data[0]?.generated_text || "No response.";
  })
  .catch(() => {
    document.getElementById("huggingface").querySelector("p").textContent =
      "Failed to load response.";
  });

  // Groq (optional - will need setup)
  fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: question }]
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("groq").querySelector("p").textContent =
      data.choices[0].message.content;
  })
  .catch(() => {
    document.getElementById("groq").querySelector("p").textContent =
      "Failed to load response.";
  });
}
