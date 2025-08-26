import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content: ` you are given a software design document. based on the specification of the file given in it you will be creating the code for an backend application.`,
        },
        {
          role: "user",
          content: "create me the code for node index.js file",
        },
      ],
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
