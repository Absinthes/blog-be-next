import { Injectable } from '@nestjs/common';
import dotenv, { DotenvParseOutput, parse } from 'dotenv'
import * as fs from 'fs';
import { resolve } from 'path';
import { MySQLDataKey } from './interface/dataBaseKey.interface';

export type EnvConfig = Record<string, any>

@Injectable()
export class ConfigService {
  public readonly isEnvProduction: boolean
  public readonly isEnvDevelopment: boolean
  private readonly envConfig: EnvConfig

  constructor(filePaths: string[]) {
    let config: DotenvParseOutput = {}
    filePaths.forEach(filePath => {
      const _config = parse(fs.readFileSync(filePath))
      config = {
        ...config,
        ..._config
      }
    })
    this.envConfig = this.validateEnvFile(config)
    this.isEnvProduction = this.getNodeEnv() === 'production'
    this.isEnvDevelopment = this.getNodeEnv() === 'development'
  }

  getNodeEnv() {
    return process.env.NODE_ENV
  }

  private validateEnvFile(envConfig: EnvConfig): EnvConfig {
    return envConfig
  }

  public getJWTSecretKey(): string {
    return this.get('JWT_SECRET_KEY')
  }

  public getJWTExpiresTime(): number {
    return this.get('JWT_EXPIRES_TIME')
  }

  public getMySQLDataKey(): MySQLDataKey {
    return {
      type: 'mysql',
      host: this.get('DATABASE_HOST'),
      port: Number(this.get('DATABASE_PORT')),
      username: this.get('DATABASE_USER'),
      password: this.get('DATABASE_PASSWORD'),
      database: this.get('DATABASE_NAME')
    }
  }

  private get<T>(key: string): T{
    return this.envConfig[key]
  }

  public getServiceURL() {
    return this.get('SERVICE_URL')
  }

  public getStaticResourceDir() {
    return resolve(__dirname, '../../public')
  }
}
