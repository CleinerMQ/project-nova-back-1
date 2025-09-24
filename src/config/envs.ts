/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import * as joi from 'joi';

// Definimos todas las envs esperadas
interface EnvsVars {
  PORT: number;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  EMAIL_HOST: string;
  EMAIL_PORT: number;
  EMAIL_USER: string;
  EMAIL_PASS: string;
}

// Validación con Joi
const envSchema = joi
  .object<EnvsVars>({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    EMAIL_HOST: joi.string().required(),
    EMAIL_PORT: joi.number().required(),
    EMAIL_USER: joi.string().email().required(),
    EMAIL_PASS: joi.string().required(),
  })
  .unknown(true); // permite otras variables que no estén definidas

const { error, value: validatedEnv } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Error de validación de configuración: ${error.message}`);
}

// Cast seguro porque Joi ya validó
const envsVars: EnvsVars = validatedEnv;

export const envs = {
  port: envsVars.PORT,
  jwtSecret: envsVars.JWT_SECRET,
  jwtExpiresIn: envsVars.JWT_EXPIRES_IN,
  emailHost: envsVars.EMAIL_HOST,
  emailPort: envsVars.EMAIL_PORT,
  emailUser: envsVars.EMAIL_USER,
  emailPass: envsVars.EMAIL_PASS,
};
