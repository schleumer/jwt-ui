import jsrsasign from 'jsrsasign';
import {maybeObject} from './object';
import * as base64 from './base64';
import crypto from 'crypto-js';

const safeKey = (algo, key, isBase64) => {
  if(algo === 'HS256'){
    if (isBase64) {
      try {
        return crypto.enc.Base64
          .parse(jsrsasign.b64utob64(key))
          .toString();
      } catch (ex) {
        console.error(ex);
        throw new Error("Can't decode your base64 key.")
      }
    } else {
      return crypto.enc.Latin1.parse(key).toString();
    }
  }

  return key;
}

export const parse = ({token, key, keyIsBase64}) => {
  try {
      let [base64Header, base64Payload, base64Signature] = token.split('.');

      let parsed = {
        header: base64.decodeJson(base64Header),
        payload: base64.decodeJson(base64Payload),
        signature: base64Signature
      }

      key = safeKey(parsed.header.alg, key, keyIsBase64);

      if (!jsrsasign.jws.JWS.verify(token, key)) {
          throw new Error("Invalid token.");
      }

      return parsed;
  } catch (ex) {
      console.error(ex);
      throw new Error("Invalid token.");
  }
}

export const sign = ({algo = null, header = {}, payload = null, key = null, keyIsBase64}) => {
  let headerAsJson, payloadAsJson = null;

  const _header = Object.assign({}, maybeObject(header, {}), {
    "alg": algo,
    "typ": "JWT"
  });

  try {
    headerAsJson = JSON.stringify(_header);
  } catch (ex) {
    console.error(ex);
    throw new Error("Invalid JSON on header.");
  }

  try {
    payloadAsJson = JSON.stringify(payload);
  } catch (ex) {
    console.error(ex);
    throw new Error("Can't serialize the payload.")
  }

  key = safeKey(algo, key, keyIsBase64);

  try {
    return jsrsasign.jws.JWS.sign(algo, headerAsJson, payloadAsJson, key);
  } catch (ex) {
    console.error(ex);
    throw new Error(`Can't generate key. ${ex.message}`)
  }
}
