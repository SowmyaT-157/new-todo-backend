import express from 'express';
import { router } from './routes/router';

const app = express();
app.use(express.json());

const PORT = process.env.PORT

app.use("/", router)
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
export default app;
