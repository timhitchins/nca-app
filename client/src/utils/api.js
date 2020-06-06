/* ----- function to get construction sites ----- */
export async function fetchSiteData(route) {
  const siteDataResponse = await fetch(route);
  if (siteDataResponse.status === 200) {
    const siteDataJson = await siteDataResponse.json();
    return siteDataJson;
  } else {
    throw new Error(siteDataResponse.status);
  }
}
