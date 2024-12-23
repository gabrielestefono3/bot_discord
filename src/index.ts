import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const webhookToken = process.env.WEBHOOK_TOKEN;
  const channelId = process.env.CHANNEL_ID;

  const message = {
    content: JSON.stringify(body),
  };

  try {
    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${webhookToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const resposta = await response.json();
    console.log(resposta);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
  res.send(body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
