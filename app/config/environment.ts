// @ts-ignore
const envType = process.env.node_env || "local";

const staging = {
  CORS_ORIGIN_WHITELIST: ["http://localhost:3004"],
  MONGODB_URI: `mongodb+srv://chris:0000@cluster0-llwhs.mongodb.net/Boilerplate?retryWrites=true&w=majority
  `,
  SECRET: "doge",
};

const production = {
  ...staging,
  CORS_ORIGIN_WHITELIST: [],
};

const local = {
  ...staging,
  PORT: 5000,
  FRONTEND_URL: "http://localhost:3004",
};

const configs = {
  staging,
  production,
  local,
};

// @ts-ignore
const config = configs[envType];

export default config;
