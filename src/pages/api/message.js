import openai from "../../utils/openai";

const getContactPrompt = (contact) => `Answer as if you were ${contact}.`;
const getLanguagePrompt = (language) => `Always answer in ${language}.`;
const getMessagePrompt = ({ author, message }) => `${author}: ${message}.`;

const generateMessage = async (req, res) => {
  const { contact, language, messages } = req.body;

  const contactPrompt = getContactPrompt(contact);
  const languagePrompt = language ? getLanguagePrompt(language) : undefined;
  const messagePrompts = messages.map(getMessagePrompt);

  const allMessages = [
    contactPrompt,
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

export default generateMessage;
