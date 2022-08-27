

const verifyPassword = (user, password) => {
  return user.password === password
}

module.exports = { verifyPassword }