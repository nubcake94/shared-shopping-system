import Joi = require('joi');

export const EnvInterface = {
	NODE_ENV: Joi.string().default('development'),
	PORT: Joi.number().default(5000),
	FIREBASE_PROJECT_ID: Joi.string().required(),
	FIREBASE_PRIVATE_KEY: Joi.string().required(),
	FIREBASE_CLIENT_EMAIL: Joi.string().required(),
};

export type EnvType = {
	[P in keyof typeof EnvInterface]: typeof EnvInterface[P] extends Joi.NumberSchema
		? number
		: typeof EnvInterface[P] extends Joi.StringSchema
		? string
		: any;
};
