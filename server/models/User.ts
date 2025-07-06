import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    description: {type: String, default: ""},
    avatar: {type: String, default: "https://api.dicebear.com/7.x/identicon/svg?seed=ras"},
    role: {type: String, default: "user"}
}, {timestamps: true});

userSchema.methods.toJSON = function (this: mongoose.Document) {
    const user = this.toObject();
    delete user.password;
    return user;
}
const User = mongoose.model("User", userSchema);
export default User;