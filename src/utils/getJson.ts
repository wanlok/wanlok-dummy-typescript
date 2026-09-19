export const getJson = async (urlString: string) => {
  const response = await fetch(urlString);
  if (!response.ok) {
    throw new Error(JSON.stringify(response));
  }
  return await response.json();
};
