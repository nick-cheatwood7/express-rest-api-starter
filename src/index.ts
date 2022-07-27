import express from "express";
import cors from "cors";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["*"],
    }),
);

// configure routes
app.use("/api", routes);

const port = 4000;

app.listen(port, () => {
    console.info(`App is running at http://localhost:${port}`);
    swaggerDocs(app, port);
});
