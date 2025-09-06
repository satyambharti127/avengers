import express from "express";
const router = express.Router();


router.post("/getinitialobject", async (req, res) => {
  var response = await fetch("https://api.mistral.ai/v1/agents/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + process.env.MISTRAL_TOKEN
  },
  body: JSON.stringify({
    agent_id: "ag:688c666d:20250905:untitled-agent:c9ed3fee", 
    messages: [
      { role: "user", content: req.body.prompt}
    ]
  })
});

res.send(await response.text())

});



router.post("/tuneObject", async (req, res) => {
  var response = await fetch("https://api.mistral.ai/v1/agents/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + process.env.MISTRAL_TOKEN
  },
  body: JSON.stringify({
    agent_id: "ag:688c666d:20250906:echoai-tuner:cb37888a", 
    messages: [
      { role: "user", content: JSON.stringify({fix:req.body.fix,item:req.body.item})}
    ]
  })
});

res.send(await response.text())

});




export default router;
