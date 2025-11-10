# 🤖 Askx402 

A pay-per-prompt application giving users on-demand access to premium AI models (like GPT, Gemini, and Groq) without the need for monthly subscriptions.
CLI is working..

**Backend URL:** `https://agentx402.onrender.com`

---

## 🚀 The Problem

Users who want to access high-performance AI models often face two choices:
1.  Pay expensive monthly subscriptions, even for infrequent use.
2.  Manage multiple API keys, complex billing, and worry about auto-pay.

This creates a barrier for developers and users who just want to "pay for what they use."

## 💡 The Solution

**Agentx402** solves this by leveraging the **Solana** blockchain for billing. It's built on the **x402 payment standard**, a protocol for on-chain, per-request payments.

Instead of a subscription, you pay a tiny amount of SOL (from your wallet) for *each prompt* you send. It's transparent, on-chain, and you never have to enter a credit card or manage a subscription.

---

## ⚙️ How It Works

The project uses a two-request "challenge" flow, standard for the x402 protocol.



[Image of x402 payment flow diagram]


1.  **Request (Attempt 1):** The user (via the CLI or frontend) sends a prompt and desired model to the backend.
2.  **Challenge (402):** The backend receives the request, calculates the cost (in lamports), and responds with a `402 Payment Required` error. This response includes the *amount* to pay and the *receiver* wallet address.
3.  **Payment:** The client (CLI/frontend) constructs a simple `SystemProgram.transfer` transaction, which the user signs with their connected wallet.
4.  **Verification (Attempt 2):** The client re-sends the *original* request, but this time, it includes two new things:
    * A header (`x402-signed-tx`) containing the signed, serialized transaction.
    * A `payer` field in the JSON body (their public key).
5.  **Success (200):** The backend receives the request, verifies the signature, confirms the payment on-chain, and *then* proxies the user's prompt to the premium AI model. The AI's response is streamed back to the user.

---

## 📊 Project Status

* ✅ **Backend:** (Node.js / Express) Fully operational and deployed on Render. Handles on-chain verification and AI model proxying.
* ✅ **CLI (`askx402`):** Complete. A command-line tool for engineers to interact with the backend (requires a local Solana keypair).
* 🚧 **Frontend:** (Next.js) Under construction. A user-friendly web interface that uses the Solana Wallet-Adapter for payments.

---

## 💻 Usage (CLI)

The `askx402` CLI is the primary way to interact with the service.

*(You can update this section with your actual installation and usage commands)*

```bash
# Example: Install the CLI (if published)
# npm install -g askx402

# Example: Run a prompt
# The CLI will detect the 402, prompt you to sign with your local keypair, and resubmit.
askx402 --model groq "Explain the x402 payment standard in simple terms"

# Example: Use a different model
askx402 --model gemini-2.5-pro "Write a Solana Anchor program for a simple counter"