const mapToEnum = (enumeration, defaultVal, key) => enumeration[key?.toLowerCase()] || defaultVal

export {
  mapToEnum,
}
