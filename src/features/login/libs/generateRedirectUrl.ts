export const generateRedirectUrl = ({
  base,
  params,
}: {
  base: string;
  params: Record<string, string>;
}): string => {
  const query = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return `${base}?${query}`;
};
