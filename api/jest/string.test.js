const API = require('../API');

describe('Random string generation', () => {
	for (let i = 1; i < 999; i++) {
		it('Should generate a random ' + i + '-digit string', async () => {
			const value = API.GetRandomString(i);

			expect(value);
			expect(value.length === i);
		});
	}
});