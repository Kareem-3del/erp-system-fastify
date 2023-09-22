export function Get(route: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    if (!target.routes) {
      target.routes = [];
    }
    target.routes.push({
      method: 'get',
      route,
      handler: descriptor.value,
    });
  };
}
