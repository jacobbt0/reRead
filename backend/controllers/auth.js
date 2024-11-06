import User from "../models/user";

export const signup = async (req, res) =>{
   const { name , email, password} = req.body
   try {
        const userExist = await User.findOne({email})
        if (userExist){
            return res.status(400).json({messsage:"User already exists"})
        }
        const user = await User.create({name, email, password})
        res.status(201).json({messsage:"User created successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    
   } catch (error) {
    
   }
}