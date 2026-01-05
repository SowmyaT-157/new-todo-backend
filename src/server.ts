import express from 'express';
import { router } from './routes/router';
import cors from "cors"


const app = express();
app.use(express.json());

const PORT = process.env.PORT
app.use(cors())

app.use("/", router)
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
export default app;
