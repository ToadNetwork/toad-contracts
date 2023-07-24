//NOTE: You need to have a .env.enc file in the root directory where you are running the node command
// Have this .env.enc file created by running
// npm-run secure-env .env -s GeneratorAddress
// on the root folder where the .env file resides (safely delete .env file after.)
// Initialise logger
const log4js = require("log4js");
const log = log4js.getLogger("secureEnv");

// Configure logger
log4js.configure({
  appenders: {
      console: { type: "console" },
  },
  categories: {
      default: { appenders: ["console"], level: "debug" },
  },
});

//function used to unencrypt .env.enc environment file and have it added to process.env
function secureEnvironment(GeneratorAddress){

  if ((!GeneratorAddress) || (typeof GeneratorAddress === 'undefined')){
  //error on no GeneratorAddress passed
    log.error("Please provide credentials to decrypt the secure env file.",);
    throw new Error(
      "Please provide credentials to decrypt the secure env file.",
    );
  }else{
    const secureEnv = require('secure-env');
    return secureEnv({ secret: GeneratorAddress });
  }
}

module.exports = { secureEnvironment };