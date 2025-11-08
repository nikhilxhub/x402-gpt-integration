import inquirer from "inquirer";
import { ModelKey } from "../types/ModelKey";

export async function askModel(current: ModelKey) {
  const { model } = await inquirer.prompt<{ model: ModelKey }>([
    {
      type: "list",
      name: "model",
      message: "Select model:",
      default: current,
      choices: [
          { name: "OpenAI GPT-3.5 Turbo(have limits)", value: "gpt-3.5-turbo" },
          { name: "Google Gemini 2.5 pro(have limits)", value: "gemini-2.5-pro" },
        { name: "groq", value: "groq" },
        { name: "Google Gemini 2.5", value: "gemini-2" },
        // { name: "Anthropic Claude 3.5", value: "claude-3.5" }
      ]
    }
  ]);
  return model;
}