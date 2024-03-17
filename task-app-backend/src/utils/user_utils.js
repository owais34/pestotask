const bcrypt = require("bcrypt");
const crypto = require("crypto");

const generateVerifyHash = () => {
  return crypto.randomUUID();
};

const generateResetHash = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let reset_hash = "";
  for (let i = 0; i < 100; i++) {
    reset_hash = reset_hash.concat(charset.charAt(crypto.randomInt(charset.length)));
  }
  return reset_hash;
};


const hashPassword = async (password) => {
  const SALT_ROUNDS = 10;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const verifyPassword = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};

module.exports = {
  generateVerifyHash,
  hashPassword,
  verifyPassword,
  generateResetHash,
};
