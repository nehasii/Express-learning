// const UsersCollection = require('../Models/Signup.model');

// let addUsers = async(req, res)=>{
    
//     try{
//         let {fullname, email, password, mobile, age} = req.body

//         let userEmail = await UsersCollection.findOne({email:email})
//         let userMob = await UsersCollection.findOne({mobile: mobile})

//         if(userEmail && userMob){
//             return res.status(404).json({error: true, message: "User already exists."})
//         }

//         else if(userEmail) {
//            return res.status(404).json({error: true, message: "User already exists with the given email."})
//         }

//         else if(userMob) {
//             return res.status(404).json({error: true, message: "User alredy exists with the given mobile."})
//          }

//         let addedUser= await UsersCollection.create({fullname, email, password, mobile, age})
//         res.status(201).json({
//             error: false, 
//             message: "User added Successfully", 
//             data: addedUser
//         })
//     }
//     catch(err){
//         res.status(403).json({error: true, message: err})
//     }
// }


// let getUsers = async(req, res)=>{
    
//     try{
//         let allUsers= await UsersCollection.find({})
//         if(UsersCollection.length===0){
//             return res.status(404).json({error: true, message: "NO user found"})
//         }
//         res.status(201).json({error: false, message: "Users fetched Successfully", data: allUsers})
//     }
//     catch(err){
//         res.status(404).json({error: true, message: errMessage})
//     }
// }


// let login = async(req, res)=>{
//     try{
//         let {email, password} = req.body
//         console.log(req.body);
//         let isUserAvailable =await UsersCollection.findOne({email})
//         console.log(isUserAvailable);
//         if(isUserAvailable)
//         {
//             if(isUserAvailable.password === password){
//                 return res.status(200).json({error: false, message: "Login successfull"})
//             }
//             else{
//                 return res.status(200).json({error: true, message: "Invalid password!"})
//             }

//         }
//         else{
//             res.status(404).json({error: true, message: "User does not exist"})
//         }
//     }
//     catch(err){
//         res.status(404).json({error: true, message: err})
//     }
// }

// module.exports = {
//     addUsers,
//     getUsers, 
//     login
// }


// ! Using helpers ----> asyncWrapper & customErrors

// const UsersCollection = require("../Models/Signup.model");
// const asyncWrapper = require("../Helper/asyncWrapper");
// const customApiErrors = require("../Helper/customErrors");
// const jwt = require('jsonwebtoken');

// let addUsers = asyncWrapper(async (req, res, next) => {
//   let { fullname, email, password, mobile, age } = req.body;

//   let userEmail = await UsersCollection.findOne({ email: email });
//   let userMob = await UsersCollection.findOne({ mobile: mobile });

//   if (userEmail && userMob) {
//     return next(customApiErrors("User already exists.", 409));
//   } else if (userEmail) {
//     throw customApiErrors("User already exists with this email.", 409);
//   } else if (userMob) {
//     return next(customApiErrors("User alredy exists with this mobile..", 409));
//   }

//   let addedUser = await UsersCollection.create({
//     fullname,
//     email,
//     password,
//     mobile,
//     age,
//   });
//   res.status(201).json({
//     error: false,
//     message: "User added Successfully",
//     data: addedUser,
//   });
// });

// let getUsers = asyncWrapper(async (req, res, next) => {
//     let authToken = req.headers.authorization;
//     if(!authToken || !authToken.startsWith("Bearer")){
//         return res.status(401).json({error:true, message:"Token required"})
//     }
//     else{
//         let token = authToken.split(" ")[1]
//         let decodeData = jwt.verify(token, "neha123");
//         console.log(decodeData);
//     }
//   let allUsers = await UsersCollection.find({});
//   if (UsersCollection.length === 0) {
//     return res.status(404).json({ error: true, message: "NO user found" });
//   }
//   res
//     .status(201)
//     .json({
//       error: false,
//       message: "Users fetched Successfully",
//       data: allUsers,
//     });
// });

// let login = asyncWrapper(async (req, res, next) => {
//   let { email, password } = req.body;
//   console.log(req.body);
//   let isUserAvailable = await UsersCollection.findOne({ email });
//   console.log(isUserAvailable);
//   if (isUserAvailable) {
//     if (isUserAvailable.password === password) {
//       let token = jwt.sign(
//         { fullname: isUserAvailable.fullname, email: isUserAvailable.email },
//         "neha123",
//         { expiresIn: "1d" }
//       );
//       return res
//         .status(200)
//         .json({ error: false, message: "Login successfull", token });
//     } else {
//       return next(customApiErrors("Invalid password!", 401));
//     }
//   } else {
//     return next(customApiErrors("User does not exist", 404));
//   }
// });

// module.exports = {
//   addUsers,
//   getUsers,
//   login,
// };


// ! using helper function auth.js t0 simplify the jwt code with bcrypt
const UsersCollection = require("../Models/Signup.model");
const asyncWrapper = require("../Helper/asyncWrapper");
const customApiErrors = require("../Helper/customErrors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let addUsers = asyncWrapper(async (req, res, next) => {

    let createdBy = req.fullname

  let { fullname, email, password, mobile, age} = req.body;

//* decides length of the string (not characters)
  let salt = await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)
  
  let userEmail = await UsersCollection.findOne({ email: email });
  let userMob = await UsersCollection.findOne({ mobile: mobile });

  if (userEmail && userMob) {
    return next(customApiErrors("User already exists.", 409));
  } else if (userEmail) {
    throw customApiErrors("User already exists with this email.", 409);
  } else if (userMob) {
    return next(customApiErrors("User alredy exists with this mobile..", 409));
  }

  let addedUser = await UsersCollection.create({
    fullname,
    email,
    password: hashedPassword,
    mobile,
    age,
    createdBy
  });
  res.status(201).json({
    error: false,
    message: "User added Successfully",
    data: addedUser,
  });
});

let getUsers = asyncWrapper(async (req, res, next) => {
   
  let allUsers = await UsersCollection.find({});
  if (allUsers.length === 0) {
    return res.status(404).json({ error: true, message: "NO user found" });
  }
  res
    .status(201)
    .json({
      error: false,
      message: "Users fetched Successfully",
      data: allUsers,
    });
});

let login = asyncWrapper(async (req, res, next) => {
  let { email, password } = req.body;
  console.log(req.body);
  let isUserAvailable = await UsersCollection.findOne({ email });
  console.log(isUserAvailable);
  if (isUserAvailable) {
    let isPasswordMatch =await bcrypt.compare(password, isUserAvailable.password)
    if (isPasswordMatch) {
      let token = jwt.sign(
        { fullname: isUserAvailable.fullname, email: isUserAvailable.email },
        "neha123",
        { expiresIn: "1d" }
      );
      return res
        .status(200)
        .json({ error: false, message: "Login successfull", token });   
    } else {
      return next(customApiErrors("Invalid password!", 401));
    }
  } else {
    return next(customApiErrors("User does not exist", 404));
  }
});

module.exports = {
  addUsers,
  getUsers,
  login,
};
