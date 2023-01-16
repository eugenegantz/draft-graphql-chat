'use strict';

import { getRandomIntInclusive } from './math';

export const SYMBOLS_NUMBERS         = `0123456789`;
export const SYMBOLS_CHARS_LOWERCASE = `abcdefghijklmnopqrstuvwxyz`;
export const SYMBOLS_CHARS_UPPERCASE = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
export const SYMBOLS_SPEC            = `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~`;

export const SYMBOLS = ''
	+ SYMBOLS_SPEC
	+ SYMBOLS_NUMBERS
	+ SYMBOLS_CHARS_LOWERCASE
	+ SYMBOLS_CHARS_UPPERCASE
	+ '';


// let _defaultRandomSymbols = '';

// for (let c = 33; c <= 126; c++) {
//     _defaultRandomSymbols += String.fromCharCode(c);
// }


export function createRandomStringGenerator(symbols: string | string[]) {
	return function _getRandomString(len = 16, _symbols = symbols) {
		let str = '';

		for (let c = 0; c < len; c++) {
			str += _symbols[getRandomIntInclusive(0, _symbols.length - 1)];
		}

		return str;
	};
}

const random = createRandomStringGenerator(SYMBOLS);

export { random };