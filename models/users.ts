import { Schema, model, Document } from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";

interface User extends Document {
  id: string;
  username: string;
  password: string;
  favorite?: string;
}

const usersSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorite: {
    type: String,
  },
});

usersSchema.plugin(passportLocalMongoose);

export type { User };
export default model<User>('Users', usersSchema)