export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateHttp(str) {
  if (str !== null) {
    if (str.indexOf("http://") == 0 || str.indexOf("https://") == 0) {
      return true;
    }
  }

  return false;
}
