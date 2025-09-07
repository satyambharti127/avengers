import express from "express"
const router = express.Router()

// Route: Generate initial post object using Mistral AI agent
router.post("/getinitialobject", async (req, res) => {
  // Send prompt to Mistral AI agent
  const response = await fetch("https://api.mistral.ai/v1/agents/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + process.env.MISTRAL_TOKEN
    },
    body: JSON.stringify({
      agent_id: "ag:688c666d:20250905:untitled-agent:c9ed3fee",
      messages: [
        { role: "user", content: req.body.prompt }
      ]
    })
  })

  // Return agent response to client
  res.send(await response.text())
})

// Route: Tune post object using Mistral AI agent
router.post("/tuneObject", async (req, res) => {
  // Send fix request and current items to Mistral AI agent
  const response = await fetch("https://api.mistral.ai/v1/agents/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + process.env.MISTRAL_TOKEN
    },
    body: JSON.stringify({
      agent_id: "ag:688c666d:20250906:echoai-tuner:cb37888a",
      messages: [
        { role: "user", content: JSON.stringify({ fix: req.body.fix, item: req.body.item }) }
      ]
    })
  })

  // Return agent response to client
  res.send(await response.text())
})

export default router