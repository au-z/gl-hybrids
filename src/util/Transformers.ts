const Transformers = {
	array: {
		vector3: (property) => ({
			get: ({x, y, z}) => [x, y, z],
			set: (obj, [x, y, z]) => {
				obj[property].set(x, y, z)
				return [x, y, z]
			},
		}),
		euler: (property) => ({
			get: ({x, y, z, order}) => [x, y, z, order],
			set: (obj, [x, y, z, order = 'XYZ']) => {
				obj[property].set(x, y, z, order)
				return [x, y, z, order]
			},
		}),
	},
	bool: {
		invert: (property) => ({
			get: (bool) => !bool,
			set: (obj, value) => {
				obj[property] = !value
				return value
			},
		}),
	},
}

export {
	Transformers,
}