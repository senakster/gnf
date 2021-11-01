import config from './config.json'
import PackageJson from '../../../package.json';
const data = { ...config, version: PackageJson.version }
export default data;