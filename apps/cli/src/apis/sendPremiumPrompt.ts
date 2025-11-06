import { ENV } from "../config/env";
import { userPrompt } from "../types/type";

export async function sendPremiumPrompt(opts:userPrompt) {
    


    const url = `${ENV.BACKEND_URL}/api/premium`;

    
}