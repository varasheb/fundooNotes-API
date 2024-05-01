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