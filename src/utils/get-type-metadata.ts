export function GetTypeMetadata(
  target: Object,
  propertyKey: string,
):
  | 'string'
  | 'number'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'bigint'
  | undefined {
  const constructor = Reflect.getMetadata('design:type', target, propertyKey);
  return constructor.name;
}
