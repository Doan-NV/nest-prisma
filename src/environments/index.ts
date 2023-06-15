import * as dotenv from 'dotenv';
dotenv.config();

const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'nest_microservice';
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const EMAIL_TOPIC = process.env.EMAIL_TOPIC;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
export { MYSQL_DATABASE, PRIVATE_KEY, EMAIL_TOPIC, REDIS_HOST, REDIS_PORT };
