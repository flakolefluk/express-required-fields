export const pick = (obj: any, ...properties: string[]): any =>
  Object.keys(obj)
    .filter(key => properties.indexOf(key) > -1)
    .reduce(
      (result, key) =>
        Object.assign(result, {
          [key]: obj[key]
        }),
      {}
    );
