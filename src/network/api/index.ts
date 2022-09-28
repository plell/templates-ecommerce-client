import { API_URL } from "../../constants";

class API {
  constructor() {
    this.get = addMethod("GET");
    this.post = addMethod("POST");
    this.put = addMethod("PUT");
    this.del = addMethod("DELETE");
  }
  get: Function;
  post: Function;
  put: Function;
  del: Function;
}

function addMethod(m: string): Function {
  const func = async function (url: string, data: any) {
    try {
      const headers: { [key: string]: string } = {};
      const opts: { [key: string]: any } = {
        mode: "cors"
      };
      // headers["Access-Control-Allow-Origin"] = window.location.hostname
      if (m === "POST" || m === "PUT") {
        headers["Content-Type"] = "application/json"
        opts.body = JSON.stringify(data);
      }
      opts.headers = new Headers(headers);
      opts.method = m;
      const r = await fetch(API_URL + url, opts);
      console.log('r',r)
      let res = await r.json();
      console.log('response', res)
      return res;
    } catch (e) {
      throw e;
    }
  };
  return func;
}

export default new API();


