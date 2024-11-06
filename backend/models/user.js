import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is required"],
        },
        email:{
            type:String,
            required:[true, "Email is required"],
            unique:true,
            lowercase:true,
            trim:true,

        },
        password:{
            type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters long"],
        },

},{
    timestamps:true,
}
)

userSchema.pre("save",async function (next) {
    if(!this.isModified())
})