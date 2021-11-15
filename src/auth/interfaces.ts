import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

export interface GqlAuth0ModuleOptions {
  audience: string;
  issuer: string;
}

export interface GqlAuth0OptionsFactory {
  createGqlAuth0Options():
    | Promise<GqlAuth0ModuleOptions>
    | GqlAuth0ModuleOptions;
}

export interface GqlAuth0ModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<GqlAuth0OptionsFactory>;
  useClass?: Type<GqlAuth0OptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<GqlAuth0ModuleOptions> | GqlAuth0ModuleOptions;
  inject?: any[];
}
