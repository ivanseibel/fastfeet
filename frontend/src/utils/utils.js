export function getSafe(fn, defaultVal = null) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}
