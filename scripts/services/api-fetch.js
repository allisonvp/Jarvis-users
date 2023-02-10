import { BASE_URI } from '../config.js';

/*Scalable generic function to obtain a response from the api*/
export default async function apiFetch(
  endPoint,
  { method, headers, body, params } = {}
) {
  if (body) {
    headers = {
      'Content-Type': 'application/json',
      ...headers
    };
  }
  const config = {
    //The method defaults to GET.
    method: method || (body ? 'POST' : 'GET'),
    headers: headers,
    //If there is a body, JSON.stringify converts its argument to a JSON string.
    body: body ? JSON.stringify(body) : null
  };

  const response = await fetch(
    BASE_URI + endPoint + '?' + new URLSearchParams(params),
    config
  );
  let data;

  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors.message);
  }
  //if the response is ok, try to parse the body response as JSON, but if there is no body in the response, returns the statusText of the response, that would be "OK" if the response returned successfully.
  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }
  return data;
}
