const Transformers = {
	string: {
		vec3: (property) => ({
			get: ([x, y, z]) => [x, y, z],
			set: (proxy, [x, y, z]) => {
				proxy[property] = [x, y, z]
				return [x, y, z]
			},
		}),
		vector3: (property) => ({
			get: ({x, y, z}) => [x, y, z],
			set: (proxy, [x, y, z]) => proxy[property].set(x, y, z),
		}),
		euler: (property) => ({
			get: ({x, y, z, order}) => [x, y, z, order],
			set: (proxy, [x, y, z, order = 'XYZ']) => proxy[property].set(x, y, z, order),
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