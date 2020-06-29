import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute";
import studentRoute from './routes/studentRoute'

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1/user', authRoute)

app.use('/api/v1/auth/student', studentRoute)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})