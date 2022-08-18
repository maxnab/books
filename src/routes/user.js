const express = require('express');
const router = express.Router();

router.post('/login', (request, response) => {
  const user = { id: 1, mail: "test@mail.ru" };
  response.json(user);
})

module.exports = router;