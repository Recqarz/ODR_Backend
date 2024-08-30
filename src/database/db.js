
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery',true)
mongoose.connect(`${process.env.DB_URI}`)
const db=mongoose.connection
console.log(process.env.DB_URI,'----dbUri')
db.on('error',(error)=>{
    console.log(error)
})
db.once('open',()=>{
    console.log('connected to mongodb ! Enjoy')
})
export default db