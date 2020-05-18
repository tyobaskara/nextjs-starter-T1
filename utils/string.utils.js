export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function validateHttp(str) {
  var tarea = str;
  if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
    return true;
  }

  return false;
}
