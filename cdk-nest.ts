import 'source-map-support/register';
import { App, Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { config as envConfig } from 'dotenv';

envConfig();

class ServerStack extends Stack {
  constructor() {

    super(new App(), `nodejs-cart-api-stack` );

    new NodejsFunction(
      this,
      `nodejs-cart-api-express-server-lambda`, {
        entry: './dist/main.js',
        runtime: Runtime.NODEJS_18_X,
        functionName: 'expressServerHandler',
        handler: 'handler',
        environment: {
          PGDATABASE: process.env.DATABASE!,
          PGHOST: process.env.HOST!,
          PGPORT: process.env.PORT!,
          PGUSER: process.env.USER!,
          PGPASSWORD: process.env.PASSWORD!
        }
      }
    );
  }
}

new ServerStack();