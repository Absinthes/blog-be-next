export async function getForeign(props: any, foreigns: any[], methods: any[]) {
  for (const prop in props) {
    if (foreigns.includes(prop) && props[prop] != null) {
      const i = foreigns.indexOf(prop);
      props[prop] = await methods[i](props[prop]);
    }
  }
  return props;
}
