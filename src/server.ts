import express from 'express';
import { router } from './routes/router';

const app = express();
app.use(express.json());

app.use("/", router)
app.listen(3008, () => {
    console.log("Server running on http://localhost:3008");
});
export default app;
