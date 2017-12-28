export const query = obj =>
  Object.keys(obj)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')

export const request = (url, params = {}) => {
  const fullURL = url + '?' + query(params)
  return fetch(fullURL)
    .then(res => res.json())
}
