import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    nickName: {
      type: String,
      required: true,
      unique: true,
    },
    realName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Hero", HeroSchema);
