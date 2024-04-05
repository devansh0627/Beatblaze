import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";
import User from './models/User.js'
import authRoutes from './routes/auth.js';
import songRoutes from './routes/song.js';
import playlistRoutes from './routes/playlist.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5500;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://beatblaze-front.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(express.json()); // this will let express know that whatever coming in our req.body it'll convert to json
// connecting mongodb to our node app
dotenv.config();
const password=encodeURIComponent(process.env.MONGODB_PASSWORD);//cuz my password contains special characters

const MONGODB_URI = `mongodb+srv://devansh_27:${password}@cluster0.eie5woc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// setup passport-jwt, used for authentication purposes like it encode and decode like encryption if the code looks complex u can ask explanation from chatgpt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSupposedToBeSecret';//WeWillPutthatLaterInEnv
// opts.issuer = 'accounts.examplesoft.com'; not mandatory
// opts.audience = 'yoursite.net';           not mandatory
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.identifier}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
app.get('/', (req, res) => {
  res.send("hello world");
});
app.use('/auth',authRoutes);
app.use('/song',songRoutes);
app.use('/playlist',playlistRoutes);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
