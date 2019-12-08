import _ from 'underscore'
import config from 'config'

const language = config.get('lang')

/**
 * @param {Object} prop The password to compare against
 * @return {Object} return property
 */
function get(prop) {
	// eslint-disable-next-line no-prototype-builtins
	if (this.hasOwnProperty(prop)) return this[prop]
	throw new Error(`There's no property defined as ${prop} in your translations`)
}

const lang = {
	get
}

const obj = require(`./${language}.js`).default
_.each(Object.getOwnPropertyNames(obj), property => {
	const prop = property
	lang[prop] = { ...obj[prop], get }
})

export default lang
