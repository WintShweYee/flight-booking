const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

module.exports = {
  validateEmail
}