export interface IServiceBase<T = unknown> {
  [key: string]: T;
}

export type IService<T = any> = IServiceBase<T> & {
  name: string;
  handler: T;
};
