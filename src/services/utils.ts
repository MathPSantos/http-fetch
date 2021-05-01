interface ParamsObj {
  [key: string]: string | number | boolean;
}

export function objToQueryString(obj: ParamsObj | undefined): string {
  if (!obj) return "";

  const keyValuePairs = [];
  for (let i = 0; i < Object.keys(obj).length; i += 1) {
    if (Object.values(obj)[i] !== undefined)
      keyValuePairs.push(
        `${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(
          Object.values(obj)[i]
        )}`
      );
  }
  return "?" + keyValuePairs.join("&");
}
