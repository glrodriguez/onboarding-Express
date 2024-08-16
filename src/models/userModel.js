import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

export default User;
