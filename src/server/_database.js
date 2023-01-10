'use strict';

class _Table extends Array {
	#_counter = 0;

	constructor(...objs) {
		super();

		this.#_counter = this.length;

		this.push(...objs);
	}

	push(...objs) {
		for (let obj of objs) {
			let _obj = Object.assign({}, obj);

			_obj.id = ++this.#_counter;
			super.push.call(this, _obj);
		};

		return this.length;
	}

	last() {
		return this[this.length - 1];
	}
}

module.exports = {
	messages: new _Table(...[
		{
			id: 0,
			content: 'alpha beta gamma',
			datetime: '1673293544484',
			roomId: 1,
			userId: 1,
		},
		{
			id: 1,
			content: '100 200 300',
			datetime: '1673293544484',
			roomId: 1,
			userId: 1,
		},
		{
			id: 2,
			content: 'https://yandex.ru',
			datetime: '1673293544484',
			roomId: 1,
			userId: 1,
		},
	]),
	users: new _Table(...[
		{
			id: 0,
			name: 'anonymous',
		}
	]),
	rooms: new _Table(...[
		{
			id: 0,
			name: 'main',
		}
	]),
};