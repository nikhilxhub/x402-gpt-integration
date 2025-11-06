import inquirer from "inquirer";


export async function askBackendUrl(current: string) {
    const { url } = await inquirer.prompt<{url: string}>([
        {
            type:"input",
            name: "url",
            message:"Backend URl:",
            default: current,
        }
    ])

    return url;

}