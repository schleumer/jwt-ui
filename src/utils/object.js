export const isObject = (value) => {
  // GOD SHOULD HATE ME
  try {
    if (value.toString() === "[object Object]") {
      return true;
    }

    return false;
  } catch (ex) {
    return false;
  }
}

export const maybeObject = (value, _default = {}) => {
  if (!isObject(value)) return _default;

  return value;
}
