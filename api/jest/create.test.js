const { MongoClient } = require('mongodb');
const note = require('../NotesAPI');
const client = new MongoClient(process.env.MONGODB_URI);

client.connect(async (err, client) => {
	const notesAPI = new note(client);

	describe('Endpoints test', () => {
		it('Should create a new note', async () => {
			const res = await notesAPI.CreateNote({
				title: 'RouteTest',
				subject: 'Testing',
				topic: 'API Testing',
				content: 'API Test Content #0',
				url: null,
				userID: 'O5',
				login: 'O5-1'
			});

			expect(res).toHaveProperty('noteID');
			expect(res).toHaveProperty('error');
			expect(res).toHaveProperty('result');
		});
	});
});