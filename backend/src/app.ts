import {createConnection} from "typeorm";
import express from "express"
import cors from "cors";

const PORT = 3001;
const app = express();
const corsOptions : cors.CorsOptions = {
    origin: "http://localhost:3000",
};

app.use(express.json());
app.use(cors(corsOptions));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

createConnection().then(async () => {
    // I like to have services provided with connection
    // meaning we need to connect to DB first
    const module = await import("./routes/routes")
    app.use(module.default);
});
