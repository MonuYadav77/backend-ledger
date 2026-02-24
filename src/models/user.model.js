const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    password: {
        type :String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"],
        select: false  // Ensure password is not included when querying the user
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields of users
})

userSchema.pre("save", async function(next){
    // Hash the password before saving the user document
    if(this.isModified("password")){
        return next();
    }

    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    return next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;