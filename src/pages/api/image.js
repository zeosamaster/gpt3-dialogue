import openai from "../../utils/openai";

const prompts = {
  contact: (contact) => `a contact image of ${contact}`,
};

const generateImage = async (req, res) => {
  const { type, input } = req.query;

  const prompt = prompts[type](input);

  const response = await openai.createImage({
    prompt,
    n: 1,
  });

  const image_url = response.data.data[0].url;

  res.json({ image_url });
};

export default generateImage;
