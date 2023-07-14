import 'source-map-support/register';
import { App, Stack } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { config as envConfig } from 'dotenv';
import {
  HttpApi,
  CorsHttpMethod,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';


envConfig();

class ServerStack extends Stack {
  constructor() {

    super(new App(), `nodejs-cart-api-stack` );

    const expressServerHandler=new NodejsFunction(
      this,
      `nodejs-cart-api-express-server-lambda`, {
        entry: './dist/main.js',
        runtime: Runtime.NODEJS_18_X,
        functionName: 'expressServerHandler',
        handler: 'lambda',
        environment: {
          DATABASE: process.env.DATABASE!,
          HOST: process.env.HOST!,
          PORT: process.env.PORT!,
          USER: process.env.USER!,
          PASSWORD: process.env.PASSWORD!
        }
      }
    );

    const api = new HttpApi(this, `nodejs-carts-api`, {
      corsPreflight: {
        allowHeaders: ["*"],
        allowOrigins: ["*"],
        allowMethods: [CorsHttpMethod.ANY],
      }
    });

    api.addRoutes({
      integration: new HttpLambdaIntegration(
        `expressHandler-integration`,
        expressServerHandler
      ),
      path: '/{proxy+}',
      methods: [HttpMethod.ANY]
    });

    // const api = new apiGateway.LambdaRestApi(this, 'NestApiGateway', {
    //   handler: expressServerHandler ,
    // });
  }

  }


new ServerStack();