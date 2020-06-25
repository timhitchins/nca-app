/*----- 
function to fetch the 
construction sites, attribute totals, and pdxBoundary data 
-----*/
export async function fetchJSONData(route) {
  const dataResponse = await fetch(route);
  if (dataResponse.status === 200) {
    const dataJSON = await dataResponse.json();
    if (dataJSON.message) {
      return null;
    } else {
      return dataJSON;
    }
  } else {
    throw new Error(dataResponse.status);
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
