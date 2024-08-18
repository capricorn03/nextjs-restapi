import { Schema, model, models } from 'mongoose';

const UpdateSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      unique: true,
    },
    link: {
      type: String,
    },
    description: {
      type: String,
    },
    saved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Update = models.Update || model('Update', UpdateSchema);

export default Update;
