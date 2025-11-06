import inquirer from "inquirer";

export async function askPrompt() {
  const { prompt } = await inquirer.prompt<{ prompt: string }>([
    {
      type: "input",
      name: "prompt",
      message: "Enter your prompt (or type :help):"
    }
  ]);
  return prompt.trim();
}