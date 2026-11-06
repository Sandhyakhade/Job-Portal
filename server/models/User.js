import mongoose, { mongo } from "mongoose";
import bycrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    tyepe: String,
    required: [true, "Please Provide Your Full Name"],
    trim: true,
    maxlength: [50, "Name can not exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide and email address"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
    },
    password: {
        type: String,
        enum: {
            values: ['jobseeker', 'employer'],
            message:`${VALUE} is not a valid role`,
        },
        default:'jobseeker',
    },
    bio: {
        type: String,
        maxlength: [300, 'Bio can not exceed more than 300 characters'],
        default:'',
    },
    skills: {
        type: [String],
        default:[],
    },
    resume: {
        type: String,
        deafult: '',
        
    },  
},
     {
        timestamps:true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bycrypt.genSalt(10)
    this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bycrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model('User', userSchema);
export default User