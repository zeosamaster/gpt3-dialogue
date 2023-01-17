import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const initialPrompt = (character) =>
  `This is a dialogue with ${character}. Always answer in portuguese from Portugal.`;

const generateAction = async (req, res) => {
  const { character, messages } = req.body;

  const allMessages = [
    initialPrompt(character),
    messages.map(({ author, message }) => `${author}: ${message}.`),
  ];
  const prompt = allMessages.join("\n");

  console.log("Generating with:\n", prompt);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.8,
    max_tokens: 500,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  console.log("Generated", basePromptOutput);

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
