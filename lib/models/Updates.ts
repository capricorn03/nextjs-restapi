import { Schema, model, models } from 'mongoose';

const UpdateSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      unique: true,
    },
    link:{
      type:String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Update = models.Update || model('Update', UpdateSchema);

export default Update;
