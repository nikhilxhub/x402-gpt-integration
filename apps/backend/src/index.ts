
import express from "express"
import { premiumRouter } from "./routes/premiumRouter";
import cors from "cors";
const app = express();
app.use(express.json())

app.use("/premium",premiumRouter)
app.use(cors())

app.get("/health", (_req, res) => res.json({ ok: true }));


app.listen(3000, () =>{
    console.log(`server running on 3000`);
})