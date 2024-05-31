import User from "../model/userSchema.js";

const userController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

const userPostController = async (req, res) => {
  try {
    const { name, age, addresses } = req.body;
    if (!name || !age || !addresses) {
      return res.status(200).json({
        success: false,
        message: "All field is Required",
      });
    }
    const newUser = new User({ name, age, addresses });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Add user Successfully",
      data: newUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

const userEditController = async (req, res) => {
  try {
    const { name, age, addresses } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, addresses },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success:true,
      message : "User Updated",
      data : updatedUser
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

const userIdController = async(req, res)=>{
  const {id} = req.params;
  try {
    const userId = await User.findById(id);
    return res.status(201).json({
      success:true,
      message:'get the user data',
      data:userId
    })
  } catch (error) {
    console.log(error);
  }

}

export { userController, userPostController, userEditController,userIdController };
