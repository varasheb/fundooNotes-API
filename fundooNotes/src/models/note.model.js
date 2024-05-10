import { Schema , model } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    description: {
        type: String
      },
      createdBy: {
        type: String
      },
      color: {
        type: String,
        default: "white"
      },
      archived: {
        type: Boolean,
        default: false
      },
      trashed: {
        type: Boolean,
        default: false
      }
},  {
    timestamps: true
  }
);

export default model('Note',noteSchema);