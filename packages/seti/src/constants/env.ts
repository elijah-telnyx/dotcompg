import devConstants from "env/dev.json";
import testConstants from "env/test.json";
import stagingConstants from "env/staging.json";
import prodConstants from "env/prod.json";

/**
 * @param {('dev'|'staging'|'production')}  [env=process.env.NEXT_PUBLIC_RUNTIME_ENV] env target environment name
 * @returns {object} constants according to the process.env `env` value
 */
function constantsByEnv(env = process.env.NEXT_PUBLIC_RUNTIME_ENV) {
  if (env === "dev") return devConstants;
  if (env === "staging") return stagingConstants;
  if (env === "test") return testConstants;

  return prodConstants;
}

const constants = { ...constantsByEnv() };

export default constants;
