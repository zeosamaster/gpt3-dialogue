import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getCharacterPrompt = (character) =>
  `This is a dialogue with ${character}.`;

const getLanguagePrompt = (language) => `Always answer in ${language}.`;

const getMessagePrompt = ({ author, message }) => `${author}: ${message}.`;

const generateAction = async (req, res) => {
  const { character, language, messages } = req.body;

  const characterPrompt = getCharacterPrompt(character);
  const languagePrompt = language ? getLanguagePrompt(language) : undefined;
  const messagePrompts = messages.map(getMessagePrompt);

  const allMessages = [
    characterPrompt,
    ...(languagePrompt ? [languagePrompt] : []),
    ...messagePrompts,
  ];
  const prompt = allMessages.join("\n\n");

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.8,
    max_tokens: 500,
  });

  const { text } = baseCompletion.data.choices.pop();

  res.status(200).json({ output: text });
};

export default generateAction;
