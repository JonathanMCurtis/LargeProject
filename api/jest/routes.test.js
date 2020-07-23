const supertest = require('supertest');
const server = require('../../server');
const request = supertest(server);

describe('Endpoints test', () => {
	it('Should create a new note', async () => {
		const res = await request.post('/api/CreateNote').send({
			title: 'RouteTest',
			subject: 'Testing',
			topic: 'API Testing',
			content: 'API Test Content #0',
			url: null,
			userID: 'O5',
			login: 'O5-1'
		});

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('noteID');
		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('result');
	});
});