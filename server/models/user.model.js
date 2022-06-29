const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
// Create Schema
const userSchema = new Schema({
    name: { type: String, required: true,},
    email: { type: String, required: true, unique:true},
    role: { type: String, required: false },
    password:{type: String, required: true},
}, {
    timestamps: true,
});

userSchema.methods.generateAuthToken = function(){

    const token = jwt.sign({_id: this._id},process.env.JWTPRIVATEKEY,{expiresIn: "7d"});
   
    return token
};
const User = mongoose.model('User', userSchema);

const validate = (data) => {
    console.log("HI" + data);
    const schema = Joi.object({
        name : Joi.string().required().label("Name"),
        email : Joi.string().email().required().label("Email"),
        role : Joi.string().allow(null, '').label("Role"),
        password : passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}
module.exports = {User,validate};
