//imports:
require("dotenv").config(".env");
const express = require("express");
const userRouter = require("./routes/UserRoutes");
const postRouter = require("./routes/PostRoutes");
const commentRouter = require("./routes/CommentRoutes");
const GlobalErrorHandler = require("./middlewares/GlobalErrorHandler");
const {dbConnect,dbDisconnect} = require("./configurations/database");
const session = require("express-session");
const MongoStore = require("connect-mongo");



//Setup, Configurations, middlewares:
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

//Session Config: Note Always put session configuration above Routers otherwise it 'll give errors!
  app.use(session({
    secret:process.env.SECRET_KEY, //SECRET KEY IS DEFINED IN .env FILE
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:60000},
    //Saving Session in the Database so that user will not lose his even if the whole server wents down!
    store: new MongoStore({
        mongoUrl:process.env.MONGO_URL,
        ttl:24*60*60
    })
 })
 )
 
 //Routes Setup:
 app.use(userRouter);
 app.use(postRouter);
 app.use(commentRouter);
 //midlewares
 app.use(GlobalErrorHandler);//for handling Error!



//Server:
port = process.env.port || 3000;
app.listen(port, ()=>{
    console.log(`Started, listening to port:  ${port}...`);
    dbConnect();
})

