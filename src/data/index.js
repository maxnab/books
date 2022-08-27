const getCheckboxValue = (value) => {
  return value === "on";
}

const options = {
  usernameField: "username",
  passwordField: "password",
}

module.exports = { getCheckboxValue, options };