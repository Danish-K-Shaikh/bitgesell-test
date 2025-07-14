const BACKEND_BASE_URI = "http://localhost:3001";
const BACKEND_API_URI = BACKEND_BASE_URI + "/api";

function getUri(uri) {
    return BACKEND_API_URI + uri
}

export function getItems(limit,page, filterQuery) {
  let url = getUri(`/items?limit=${limit}&page=${page}`);
  if(filterQuery) url += "&q="+filterQuery
  return fetch(url); 
}

export function getItem(itemId) {
  return fetch(getUri("/items/"+itemId));
}

export function getStats() {
  return fetch(getUri("/stats"));
}
