import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://abbaskherani:abbas123@cluster0.fxhcc.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}
