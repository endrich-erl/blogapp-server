const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));


mongoose.connect("mongodb+srv://erlendrich:admin123@cluster0.6tr9g.mongodb.net/blog-API?retryWrites=true&w=majority&appName=Cluster0");

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

//Routes Middleware
const blogRoutes = require("./routes/blog");
const userRoutes = require("./routes/user");

app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);



if(require.main === module){
    app.listen(process.env.PORT || 3000
, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
    });
}
module.exports = { app, mongoose };



