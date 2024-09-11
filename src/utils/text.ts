interface QueryParams {
  [key: string]: string;
}

export const trimWithEllipsis = (text: string, maxLength?: number) => {
  if (text.length <= (maxLength || 10)) {
    return text;
  }

  return text.slice(0, maxLength) + "...";
};

export function parseQueryString(queryString: string): QueryParams {
  if (queryString.startsWith("?")) {
    queryString = queryString.substring(1);
  }

  const params: QueryParams = {};

  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    if (key && value) {
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
}
