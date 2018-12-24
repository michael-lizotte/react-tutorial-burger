import config from './config.json';

const env = process.env.NODE_ENV || "development";
let envConfig = config[env];

if (env !== "development") {
    envConfig = Object.assign(envConfig, envConfig[env]);
}
export const config_db = Object.assign({
    "firebase_api_key": process.env.REACT_APP_FIREBASE_KEY
}, envConfig.database);