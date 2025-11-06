import chalk from "chalk";
import figlet from "figlet"
import { loadConfig, saveConfig } from "./config/config";
import { hasWallet } from "./wallet/hasWallet";
import { createWallet } from "./wallet/createWallet";
import { log } from "./utils/logger";
import { askFirstRunWalletChoice } from "./prompt/askFirstRun";
import { askSecretForImport } from "./prompt/askSecretForImport";
import { importWalletFromString } from "./wallet/importWalletFromString";
import ora from "ora";
import { loadWallet } from "./wallet/loadWallet";
import { askPrompt } from "./prompt/askPrompt";



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

    log.info(`Model: ${cfg.modelKey} | Cluster: ${cfg.cluster}`);
    const wallet = loadWallet(cfg.walletPath);
    log.info(`Wallet: ${wallet.publicKey.toBase58()}`);

    showHelp();


    while(true){
        const input = await askPrompt();

        if(!input){
            continue;

        }

        if(input == ":exit"){
            break;

        }
        if(input == ":help"){


        }

        if(input == ":change_model"){


        }

        if(input == ":change_cluster"){


        }


        if (input === ":pub_key") {
            log.info(`Your Wallet Address: ${wallet.publicKey.toBase58()}`);
            continue;
        }

        const spinner = ora("Sending prompt...").start();

        try{


        }catch(e: any){
            spinner.fail("Request failed");
            log.err(e.message || String(e));
        }
        
    }

    log.ok("GoodBye..!");

}

