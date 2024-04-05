import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import { getToken } from "../utils/helper.js";
const router = express.Router();// we don't want other unecessary things that's why we r just importing Router();

// this POST will help to register a new user
router.post('/register', async (req, res) => {
   // this code will run when /register api is called as a POST req
   // req.body will be of format {email,password,firstname,lastname,userName}
   const { email, password, firstName, lastName, userName } = req.body;

   // check if a user already exists
   let user = await User.findOne({ email: email });
   if (user) {
      return res.status(403).json({ error: "A user with this email already exists" });
      // status of type 400-404 is basically for failure and like 200 is for success
   }
   user = await User.findOne({ userName: userName });
   if (user) {
      return res.status(400).json({ error: "Username already in use. Please select a different one." });
      // status of type 400-404 is basically for failure and like 200 is for success
   }
   // user is new hence valid req
   // create new user in DB
   const hashPassword = await bcrypt.hash(password, 10);//securing password using hashing using bcrypt library
   const newUserData = { email, hashPassword, firstName, lastName, userName };
   const newUser = await User.create(newUserData);
   // creating token to return it to the user
   const token = await getToken(email, newUser);
   // returing result to user
   const userToReturn = { ...newUser.toJSON(), token };
   delete userToReturn.password;
   return res.status(200).json(userToReturn);//tho by default status code is 200 so u can skip typing that
})

// LOGIN THE EXISTING USER
router.post('/login', async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email: email });// finding user in our database

   if (!user) {
      return res.status(403).json({ error: "Invalid Credentials" });
   }
   // user exists in our database so now check for password
   // since in our database we stored the hashed password we can't directly compare the password entered by the user and the stored hashed password so for that we bcrypt.compare

   const isPasswordValid = await bcrypt.compare(password, user.hashPassword);
   if (!isPasswordValid) {
      return res.status(403).json({ error: "Invalid Credentials" });//giving the same error is the good practice u can search for this in detail tho one of my reasons is that one who tries to sneak will not know what exactly he's guessing wrong
   }
   // valid password
   const token = await getToken(user.email, user);
   // returing result to user
   const userName = user.userName;
   const userToReturn = { ...user.toJSON(), token, userName };
   delete userToReturn.password;
   return res.status(200).json(userToReturn);//tho by default status code is 200 so u can skip typing that
}
)
export default router;