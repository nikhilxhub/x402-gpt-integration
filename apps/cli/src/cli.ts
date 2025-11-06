import chalk from "chalk";
import figlet from "figlet"
import { loadConfig } from "./config/config";
import { hasWallet } from "./wallet/hasWallet";



function showBanner(){
    const art = figlet.textSync("x402");
    console.log(chalk.magentaBright(art));

}

function showHelp(){

    console.log(`
        Commands:
            :help               show this help
            :change_model       choose a different model
            :change_cluster     choose solana cluster
            :pub_key            show current wallet public key
            :exit               quit
        
        `)


}


export async function runCli() {
    showBanner();

    let cfg = loadConfig();

    if(!hasWallet(cfg.walletPath)){


    }
}