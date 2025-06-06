import Message from "../models/message.js"
import User from "../models/user.js"
import Product from "../models/product.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString()
    const { id: bookId } = req.params;
    const bookSellerId = await Product.find({ _id: bookId }).select("sellerId")
    

    if (!bookId) {
      return res.status(400).json({ error: "Book ID is required" });
    }
  

    if (bookSellerId[0].sellerId == loggedInUserId) {
      const messages = await Message.find({ bookId }).select("senderId receiverId")
      const userIds = [
        ...new Set(messages?.flatMap(msg => [msg.senderId.toString(), msg.receiverId.toString()]))
      ].filter(id => id !== loggedInUserId)
      const filteredUsers = await User.find({ _id: userIds }).select("-password");
      console.log("filter", filteredUsers)
      res.status(200).json(filteredUsers);
    } else {
      const filteredUser = await User.find({ _id: bookSellerId[0].sellerId}).select("-password");
      res.status(200).json(filteredUser);
    }


  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, bookId } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader?.upload(image);
      imageUrl = uploadResponse?.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      bookId
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
}
