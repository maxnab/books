const verifyPassword = (user, password) => {
  return user.password === password
}

export { verifyPassword }