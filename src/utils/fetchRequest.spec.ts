import { describe } from 'mocha';
import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import { fetchRequest } from './fetchRequest';

describe('fetchRequest', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  const headers = { 'Content-Type': 'application/json' };
  const reqUrl = '/test';

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('GET-запрос', async () => {
    const response = { data: 'response message' };

    const promise = fetchRequest.get(reqUrl, { headers: headers });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(response));

    const result = await promise;

    expect(result).to.deep.equal(response);
    expect(requests[0].method).to.equal('GET');
    expect(requests[0].url).to.equal(reqUrl);
  });

  it('POST-запрос', async () => {
    const response = { data: 'response message' };
    const body = { data: 'body data' };

    const promise = fetchRequest.post(reqUrl, { headers: headers, data: body });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(response));

    const result = await promise;

    expect(result).to.deep.equal(response);
    expect(requests[0].requestBody).to.deep.equal(JSON.stringify(body));
    expect(requests[0].method).to.equal('POST');
    expect(requests[0].url).to.equal(reqUrl);
  });

  it('PUT-запрос', async () => {
    const response = { data: '' };
    const body = { data: 'body data' };

    const promise = fetchRequest.put(reqUrl, { headers: headers, data: body });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(response));

    const result = await promise;

    expect(result).to.deep.equal(response);
    expect(requests[0].requestBody).to.deep.equal(JSON.stringify(body));
    expect(requests[0].method).to.equal('PUT');
    expect(requests[0].url).to.equal(reqUrl);
  });

  it('DELETE-запрос', async () => {
    const response = { data: 'new data response' };
    const body = { data: 'delete success' };

    const promise = fetchRequest.delete(reqUrl, { headers: headers, data: body });
    requests[0].respond(200, { 'Content-Type': 'application/json' }, JSON.stringify(response));

    const result = await promise;

    expect(result).to.deep.equal(response);
    expect(requests[0].requestBody).to.deep.equal(JSON.stringify(body));
    expect(requests[0].method).to.equal('DELETE');
    expect(requests[0].url).to.equal(reqUrl);
  });
});
