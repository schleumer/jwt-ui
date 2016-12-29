import crypto from 'crypto-js';

export const encode = (value) => {
  const words = crypto.enc.Utf8.parse(textString);

  return crypto.enc.Base64.stringify(words);
}

export const encodeJson = (value) => {
  return encode(JSON.stringify(value));
}

export const decode = (base64) => {
  const words = crypto.enc.Base64.parse(base64);

  return crypto.enc.Utf8.stringify(words);
}

export const decodeJson = (base64) => {
  return JSON.parse(decode(base64));
}
