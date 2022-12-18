import express,{Request, Response} from 'express'
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController'
import { AppRouter } from './appRouter';
import './controllers/RootController'

const app = express()

const port = 3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieSession({keys:['secretkey']}))
app.use(AppRouter.getInstance())

app.listen(port, ()=>{
    console.log(`server is up on port ${port}`);
})