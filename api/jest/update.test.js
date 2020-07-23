const { MongoClient } = require('mongodb');
const note = require('../NotesAPI');
const client = new MongoClient(process.env.MONGODB_URI);

client.connect(async (err, cl) => {
	const notesAPI = new note(cl);

	describe('Endpoints test', () => {
		it('Should update an existing note', async () => {
			const body = {
				noteID: '5f19005e6d6da1685807a859',
				title: 'RouteUpdateTest',
				content: 'API Test Content #0 - Updated'
			};
			const res = await notesAPI.UpdateNote(body);

			expect(res).toHaveProperty('error');
			expect(res.error).toBe(false);
			expect(res).toHaveProperty('result');
			expect(res.result).toHaveProperty('errorID');
			expect(res.result).toHaveProperty('errorMsg');
		});
	});
});