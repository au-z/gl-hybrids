const Transformers = {
	string: {
		vector3: (property) => ({
			get: ({x, y, z}) => [x, y, z],
			set: (proxy, [x, y, z]) => proxy[property].set(x, y, z),
			connect: (str) => JSON.parse(str),
		}),
		euler: (property) => ({
			get: ({x, y, z, order}) => [x, y, z, order],
			set: (proxy, [x, y, z, order = 'XYZ']) => proxy[property].set(x, y, z, order),
			connect: (str) => JSON.parse(str),
		}),
	},
	bool: {
		invert: (property) => ({
			get: (bool) => !bool,
			set: (proxy, value) => {
				proxy[property] = !value
				return value
			},
		}),
	},
}

export {
	Transformers,
}