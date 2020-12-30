export default {
  jwtSecret: process.env.JWT_SECRET || 'SECRET_TOKEN',
  DB: {
    // URI_LOCAL: process.env.URI_LOCAL,
    URI: process.env.MONGODB_URI,
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD,
  },
};
