import inquirer from "inquirer";

export async function askFirstRunWalletChoice() {
    
    const { action } = await inquirer.prompt<{action: "create" | "import"}>([

        {

            type:"list",
            name:"action",
            message:"No wallet found. What would you like to do?",
            choices:[
                {
                    name:"create new solana wallet",
                    value:"create"
                },
                {

                    name:"import existing wallet",
                    value:"import"
                }
            ]
        }
    ])

    return action;
}