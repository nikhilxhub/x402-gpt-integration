import chalk from "chalk";
import boxen from "boxen";
// Remove the figlet import

export function showBanner2() {
  const title = chalk.magentaBright.bold("Askx402");
  const tagline = chalk.dim("Chat with a premium AI, paid via Solana.");

  const banner = boxen(
    `${title}\n${tagline}`, 
    {
      padding: 1,
      margin: 1,
      borderStyle: "round", // 'round', 'single', 'double'
      borderColor: "blueBright",
      title: "x402",
      titleAlignment: "left",
    }
  );

  console.log(banner);
}