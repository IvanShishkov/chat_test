const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
    },
    messages: [
      {
        _id: {
          type: Schema.ObjectId,
          auto: true,
        },
        senderId: {
          type: String,
          required: true,
        },
        senderName: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: { type: Date, default: Date.now },
      },
    ],
    color: {
      type: String,
      required: true,
    },
    inviteId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Chats = mongoose.model("chats", ChatsSchema);
