const userModel = require('../modal/userModal');
const {createHash,validatePass,createToken} = require('../utils/comman');


const signUp = async (req, res) => {
    try {
        let {email,name,address,phone} = req.body;
        let emailExist =  await userModel.userModel.findOne({email : email}).select('_id email');
        console.log(emailExist);
        if(emailExist){
            return res.status(400).json({
                message: "Email already exist",
              });
    
        }
        let password = await createHash(req.body.password)
        let signUp = userModel.userModel({ name,email,address,phone,password });
        let result = await signUp.save();
        return res
          .status(200)
          .json({ message: "signUp sucessfully", data: result });
    } catch (error) {
        return res.status(400).json({
            message: "something went wrong",
            error: error,
          });
      
    }
    
}




const login = async (req, res) => {
try {
        let {email,password} = req.body;
        let userData = await userModel.userModel.findOne({email:email});
        if(userData){
            let validatePassword = await validatePass({password :password,hash :userData.password});
            if(validatePassword){
                let token  = await createToken(userData);
                await userModel.userModel.findOneAndUpdate({_id:userData._id },{$set : {accessToken : token}})

                return res
                .status(200)
                .json({ message: "Login sucessfully",accessToken : token, data: userData });
      

            }else{
               return res
            .status(400)
            .json({ message: "Password does not matched"});

            }

        }else{
           return res
            .status(200)
            .json({ message: "user not found"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "something went wrong",
            error: error,
          });
      
    }
    
}




const getUser = async (req, res) => {
    try {
       // console.log(req);
            let {email} = req.user;
            let userData = await userModel.userModel.findOne({email :email});
            if(userData){
    
                    return res
                    .status(200)
                    .json({ message: "User fetched  sucessfully", data: userData });
          
    
                }else{
                   return res
                .status(200)
                .json({ message: "user found"});
    
                }
    
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "something went wrong",
                error: error,
              });
          
        }
        
    }


module.exports = {
    signUp,
    login,
    getUser
}


