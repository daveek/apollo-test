export const query = obj =>
  Object.keys(obj)
    .map(key => `${key}=${encodeURIComponent(obj[key])}`)
    .join('&')

export const request = (url, params = {}) => {
  const fullURL = url + '?' + query(params)
  return fetch(fullURL)
    .then(res => res.json())
    .then(res => {
      console.log('request', fullURL)
      console.log(res.data)
      console.log()
      return res
    })
    .catch(err => {
      throw err
    })
}
