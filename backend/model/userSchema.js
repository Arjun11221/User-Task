import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  addresses: [
    {
      city: { type: String, required: true },
      state: { type: String, required: true },
      houseNo: { type: String, required: true },
      country: { type: String, required: true },
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
