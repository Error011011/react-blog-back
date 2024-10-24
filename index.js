import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'


import { register, login, getMe } from './controllers/userController.js';
import { createPost, getAll, getOne, removePost, updatePost } from './controllers/postController.js';
import { registerValidation, loginValidation, createPostValidation } from './validations/validations.js';
import checkAuth from './utils/checkAuth.js';
import handleValidationErrors from './validations/handleValidationErrors.js';


// db connect
mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    console.log('db ok')   
}).catch((err)=> {
    console.log(err);   
})



const app = express();
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const upload = multer({ storage })


// user actions
app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/registration',  registerValidation, handleValidationErrors, register)
app.get('/auth/me', checkAuth, getMe)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})


// post actions
app.get('/posts', getAll)
app.get('/posts/:id', getOne)
app.post('/posts', checkAuth, createPostValidation, createPost)
app.delete('/posts/:id', checkAuth, removePost)
app.patch('/posts/:id', checkAuth, updatePost)

app.listen(process.env.port || 4444, (err) => {
    if(err) {
        return console.log(err);
        
    }

    console.log('server starts');
    
})


