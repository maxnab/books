import type { IStrategyOptionsWithRequest } from "passport-local";

const getCheckboxValue = (value: string): boolean => {
  return value === "on";
}

const options: IStrategyOptionsWithRequest = {
  passReqToCallback: true,
  usernameField: "username",
  passwordField: "password"
}

export { getCheckboxValue, options };