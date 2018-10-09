
// ensures all required keys are present
function checkForRequiredKeys(config) {
  let requiredKeys = ['hostname', 'dbName', 'port', 'basePath', 'endpoints'];

  for(let rk of requiredKeys){
    if(!(rk in config)){
      throw new Error(`Invalid config, missing required key '${rk}' in config.js`);
    }
  }
}

// ensures that all endpoint obj have the 3 required keys
function checkEndpoints(config) {
  let count = 0;

  for(let obj of config['endpoints']) {
    if(!('relPath' in obj) || !('model' in obj) || !('methods' in obj)) {
      throw new Error(`Invalid config, endpoint ${count} is missing one of the required keys: 'relPath', 'model', or 'methods'`);
    }
    count++;
  }
}

// ensures that certain keys are correctlly formatted
function validateKeys(config) {
  if(config['basePath'].slice(0) !== '/' || config['basePath'].slice(-1) !== '/') {
    throw new Error(`Invalid config, 'basePath' key must start and end with '/'`);
  }
  if(typeof config['port'] !== "number" && Math.floor(config['port'] !== config['port'])) {
    throw new Error(`Invalid config, the 'port' key must be an integer`);
  }
  if(config['endpoints'].length === 0) {
    throw new Error(`Invalid config, must have at least one endpoint`);
  }
}

function configValidator(config) {
  checkForRequiredKeys(config);
  validateKeys(config);
  checkEndpoints(config);
}

module.exports = configValidator;
