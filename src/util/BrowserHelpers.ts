/**
 * Queries the DOM including shadowRoots starting at the provided node
 * @param node the starting node to search
 * @param selector the querySelector argument
 */
function querySelectorDeep(node, selector): HTMLElement | null {
	let el = node.querySelector(selector) || node.shadowRoot?.querySelector(selector)
	if (el) return el

	const children = [...Array.from(node.children), ...Array.from(node.shadowRoot?.children ?? [])]
	return children.map((c) => querySelectorDeep(c, selector)).find((r) => !!r)
}

export {
	querySelectorDeep,
}
