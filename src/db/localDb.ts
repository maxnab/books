import {User} from "../../models/users";

const verifyPassword = (user: User, password: string): boolean => {
  return user.password === password
}

export { verifyPassword }