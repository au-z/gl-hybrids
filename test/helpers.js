export function test(html) {
	const template = document.createElement('template');
	template.innerHTML = html;

	return (spec) => (done) => {
		const wrapper = document.createElement('div');
		document.body.appendChild(wrapper);
		wrapper.appendChild(template.content.cloneNode(true));
		const result = spec(wrapper.children[0]);

		if (result) {
			Promise.resolve(result).then(() => {
				requestAnimationFrame(() => {
					document.body.removeChild(wrapper);
					done();
				});
			});
		} else {
			requestAnimationFrame(() => {
				document.body.removeChild(wrapper);
				done();
			});
		}
	};
}