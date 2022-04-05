const mongoose = require('mongoose');
const Bcrypt = require("bcryptjs");
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}

const userSchema = new mongoose.Schema({
    firstName :{
        type:String
    },
    lastName :{
        type :String
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile :{
        type :Number
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    },
    password :{
        type:String,
        minlength:8,
        maxlength:16,
        validate: [checkPassword, 'Please fill a valid password'],
        match: [/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Please fill a valid password']
    },
    createdAt :{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},{collections:"user"});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = Bcrypt.hashSync(this.password, 10);
    next();
  });
module.exports = mongoose.model("user",userSchema)