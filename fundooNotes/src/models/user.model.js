import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userFirstName: {
      type: String
    } ,
    userLastName: {
      type: String
    } ,
    userEmailId: {
      type: String
    } ,
    userPhoneNo: {
      
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
