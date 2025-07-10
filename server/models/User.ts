import mongoose from "mongoose";

const seed = Math.random().toString(36).substring(7);
  const url = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    description: {type: String, default: ""},
    avatar: {type: String, default: url},
    role: {type: String, default: "user"}
}, {timestamps: true});

userSchema.methods.toJSON = function (this: mongoose.Document) {
    const user = this.toObject();
    delete user.password;
    return user;
}
const User = mongoose.model("User", userSchema);
export default User;