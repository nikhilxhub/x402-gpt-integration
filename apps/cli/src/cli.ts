import chalk from "chalk";
import figlet from "figlet"
import { loadConfig, saveConfig } from "./config/config";
import { hasWallet } from "./wallet/hasWallet";
import { createWallet } from "./wallet/createWallet";
import { log } from "./utils/logger";
import { askFirstRunWalletChoice } from "./prompt/askFirstRun";
import { askSecretForImport } from "./prompt/askSecretForImport";
import { importWalletFromString } from "./wallet/importWalletFromString";
import cluster from "cluster";
import { loadWallet } from "./wallet/loadWallet";



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
    let kp;
    if(!hasWallet(cfg.walletPath)){
        const action = await askFirstRunWalletChoice();
        if(action == "create"){
            kp = createWallet(cfg.walletPath);
            log.ok(`Created wallet: ${kp.publicKey.toBase58()}`);
            
            
        }else{
            // import wallet
            const secret = await askSecretForImport();
            kp = importWalletFromString(secret,cfg.walletPath);
            log.ok(`Imported wallet: ${kp.publicKey.toBase58()}`);


        }


    }


    // cfg.backendUrl = await askBackendUrl(cfg.backendUrl);
    // saveConfig(cfg);

    log.info(`Model: ${cfg.modelKey} | ${cfg.cluster}`);
    const wallet = loadWallet(cfg.walletPath);

}

