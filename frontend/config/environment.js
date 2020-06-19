// @ts-ignore
const envType = process.env.node_env || `local`;
console.log(`env type -->`, process.env.node_env || `local`);

const staging = {};

const production = {
  ...staging,
};

const local = {
  ...staging,
  API: `http://35.202.146.170/api`,
  PORT: 3000,
};

const configs = {
  staging,
  production,
  local,
};

const config = configs[envType];

module.exports = { ...config };
