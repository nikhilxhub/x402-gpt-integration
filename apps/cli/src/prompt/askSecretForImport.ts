import inquirer from "inquirer";

export async function askSecretForImport(){

    const { secret } = await inquirer.prompt<{ secret: string }>([
        {

            type:"editor",
            name:"secret",
            message:"Paste your secret key.Save & close the editor."
        }
    ]);

    return secret.trim();
}