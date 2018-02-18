export default function ajax(url, token) {
  let uri = url;
  const options = {};
  options.headers = new Headers();
  options.headers.append('Content-Type', 'application/json');

  if (token) {
    options.headers.append('authorization', `Bearer ${token}`);
  }

  return {
    get() {
      options.method = 'GET';
      return makeRequest(uri, options);
    },
    post(body) {
      options.method = 'POST';
      options.body = JSON.stringify(body);
      return makeRequest(uri, options);
    }
  }
}

export function makeRequest(uri, options) {
  return new Promise(async (resolve, reject) => {
    let response;
    try {
      response = await window.fetch(uri, options);
    } catch(connectionError) {
      return reject({ status: 500, message: 'Server unavailable' });
    }
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType && contentType.indexOf('json') !== -1;

    if (response.ok) {
      if (isJson) {
        const json = await response.json();
        resolve([json, response]);
      } else {
        resolve([null, response]);
      }
    } else {
      const error = { status: response.status };
      reject([error, response]);
    }
  });
}
