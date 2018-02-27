export default function ajax(url, token, contentType = 'json') {
  let uri = url;
  const options = {};
  const contentTypes = {
    json: 'application/json',
    file: 'multipart/form-data',
  };
  options.headers = new Headers();

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
      if (contentType === 'json') {
        options.headers.append('Content-Type', contentTypes[contentType]);
        options.body = JSON.stringify(body);
      } else if (contentType === 'file') {
        console.log(body);
        const formData = new FormData();
        formData.append('file', body);
        options.body = formData;
        options.headers.append('enctype', 'multipart/form-data');
      }
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
