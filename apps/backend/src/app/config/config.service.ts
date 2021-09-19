import { Injectable } from '@nestjs/common';
import { EnvType, EnvInterface } from './env.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import Joi = require('joi');

@Injectable()
export class ConfigService {
	private readonly envConfig: EnvType;

	constructor() {
		if (process.env.NODE_ENV === 'production') {
			throw Error('Production environment is not implemented yet');
		} else if (process.env.NODE_ENV === 'development') {
			const config = dotenv.parse(fs.readFileSync('.env'));
			this.envConfig = this.validateInputConfig(config);
		}
	}

	private validateInputConfig(envConfig: dotenv.DotenvParseOutput): EnvType {
		const envSchema: Joi.ObjectSchema = Joi.object(EnvInterface);
		const { error, value: validatedEnvConfig } = envSchema.validate(envConfig);
		if (error) {
			throw Error(`Config validation error: ${error.details[0].message}`);
		}
		return validatedEnvConfig;
	}

	get<K extends keyof EnvType>(key: K) {
		return this.envConfig[key];
	}
}
