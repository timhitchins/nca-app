/* ----- function to get construction sites ----- */
export async function fetchSiteData(route) {
  const siteDataResponse = await fetch(route);
  if (siteDataResponse.status === 200) {
    const siteDataJSON = await siteDataResponse.json();
    return siteDataJSON;
  } else {
    throw new Error(siteDataResponse.status);
  }
}

/*----- function to fetch MB API geocode results -----*/
export async function fetchGeocdeResults(searchTerm, route) {
  //route can be <host>/api/search/{searchTerm}
  if (searchTerm === "") {
    return [];
  } else {
    const geocodeResponse = await fetch(
      `${route}${encodeURIComponent(searchTerm)}`
    );
    const geocodeJSON = await geocodeResponse.json();
    if (geocodeResponse.status !== 200) {
      throw Error(`An error occured searching: ${geocodeResponse.status}`);
    }
    return geocodeJSON;
  }
}
