
import { Interface as ReadlineInterface } from "readline/promises";
import chalk from "chalk";

export async function askPrompt2(rl: ReadlineInterface) {

  const prompt = await rl.question(chalk.blueBright("> "));
  return prompt.trim();
}