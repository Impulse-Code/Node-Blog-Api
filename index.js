const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js');
const userRoute = require('./routes/users.js');
const postRoute = require('./routes/posts.js');
const categoryRoute = require('./routes/categories.js');
const multer = require('multer');
// const bcrypt = require('bcrypt');
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use('/api/auth',authRoute) ;
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('connected to mongodb...')
)
.catch((error)=>console.error('Could not connect to mongodb',error));


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
     callback(null,images);  
    },filename:(req,file,callback)=>{
        callback(null,req.body.name);
    }
});
const upload= multer({storage:storage});
const port =process.env.PORT || 8800;

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('File has been uploaded');
});


app.listen(port,()=>{
    console.log(`Server started and listening on port ${port}`);
});
