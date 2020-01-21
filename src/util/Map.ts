const mapToEnum = (enumeration, key, defaultVal) => enumeration[key?.toLowerCase()] || defaultVal

export {
  mapToEnum,
}
