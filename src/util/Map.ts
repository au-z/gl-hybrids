const mapToEnum = (enumeration, defaultVal, key) => enumeration[key?.toLowerCase()] || enumeration[key?.toUpperCase()] || defaultVal

export {
	mapToEnum,
}
