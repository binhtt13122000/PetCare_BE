export default (): Record<string, number | string> => ({
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
  apiPrefix: process.env.API_PREFIX,
});
