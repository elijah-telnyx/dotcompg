import featureFlippersObject from './featureFlippers.json';

type Env = 'dev' | 'staging' | 'production' | 'test';

type FeatureFlippersKeys = keyof typeof featureFlippersObject;
type FlipperMap = {
  [key in FeatureFlippersKeys]: boolean;
};

/**
 * return feature flippers values according to the runtime environment
 * @param {('dev'|'staging'|'production|test')} env target environment name
 * test environment is set to use the same value as dev
 * @returns a JSON-Like object with the { $flipper_name: $value } structure
 */
function getFeatureFlippersByEnv(env: Env) {
  return Object.entries(featureFlippersObject).reduce<FlipperMap>((featureFlippers, [key, value]) => {
    featureFlippers[key as FeatureFlippersKeys] = env === 'test' ? value.dev : value[env];
    return featureFlippers;
  }, {} as FlipperMap);
}

export default getFeatureFlippersByEnv(process.env.NEXT_PUBLIC_RUNTIME_ENV as Env);
