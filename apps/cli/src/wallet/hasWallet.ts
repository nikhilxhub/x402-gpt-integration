import { walletPath as defaultWalletPath } from "../utils/paths";
import { existsSync } from "node:fs"

export function hasWallet(path = defaultWalletPath()) :boolean {


    return existsSync(path)
}