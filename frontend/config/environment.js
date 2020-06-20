// @ts-ignore
const envType = process.env.node_env || `local`;
console.log(`env type -->`, process.env.node_env || `local`);

const staging = {};

const production = {
  ...staging,
};

const local = {
  ...staging,
  API: `http://34.69.28.200/api`,
  PORT: 3000,
};

const configs = {
  staging,
  production,
  local,
};

const config = configs[envType];

module.exports = { ...config };
