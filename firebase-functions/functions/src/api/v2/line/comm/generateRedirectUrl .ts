export const generateRedirectUrl = ({
  base,
  params,
}: {
  base: string;
  params?: { [key: string]: string };
}): string => {
  if (!params) {
    return base;
  }

  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return `${base}?${query}`;
};
