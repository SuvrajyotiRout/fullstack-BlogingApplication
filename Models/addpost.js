const {Schema,model} = require('mongoose')

const addblogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:false
     
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const Blogs =model("addblog",addblogSchema)
module.exports=Blogs