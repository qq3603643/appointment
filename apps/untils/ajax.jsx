import fetch from 'isomorphic-fetch';

const API_PREFIX = window.$GLOBALCONFIG.$ctx;

export function fetchJSON(url, params) {
  params = {
    ...params,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
      'Content-Type': "application/x-www-form-urlencoded"
    }
  }

  url = `${API_PREFIX}${url}`;
  return fetch(url, params)
}

function buildParams(obj) {
  if (!obj) {
    return ''
  }
  const params = []
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      const value = obj[key] === undefined ? '' : obj[key]
      params.push(`${key}=${value}`)
    }
  }
  return params.join('&')
}

export const fetchJSONByGet = (url, query) => {
  const params = {
    method: 'GET'
  },
        _url = `${ url }${ url.indexOf('?') > -1 ? '' : '?' }${ buildParams(query) }`;

    return fetchJSON(_url, params);
}

export const fetchJSONByPost = (url, query) => {
  const params = {
    method: 'POST',
    body: buildParams(query)
  }
  return fetchJSON(url, params)
}

export const fetchJSONStringByPost = (url, query) => {
  const params = {
    method: 'POST',
    body: query,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  }
  return fetchJSON(url, params)
}