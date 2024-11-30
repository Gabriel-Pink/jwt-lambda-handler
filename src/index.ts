import { APIGatewayEvent, Context, Callback } from 'aws-lambda';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export const handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  const payload = { secret: "teste" };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'JWT secret is not defined in the environment variables.' }),
    };
    return callback(null, response);
  }
  
  try {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    const response = {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };

    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao gerar o JWT', error }),
    };
    callback(null, response);
  }
};