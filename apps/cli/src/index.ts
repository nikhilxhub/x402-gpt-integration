#!/usr/bin/env node

import { runCli } from "./cli";

runCli().catch((err) => {
    console.error(err);
    process.exit(1);
});
