require('fake-indexeddb/auto');
import IndexedDb from './indexedDb';

describe('IndexedDb Services', () => {
	let indexedDb;
	//create indexedDb object before each test
	beforeEach(async () => {
		indexedDb = new IndexedDb('test');
		await indexedDb.createObjectStore(['books', 'students']);
	});

	afterEach(async () => {
		//await indexedDb.deleteDatabase('test');
	});

	//should create object store
	it('should create object stores', async () => {
		const storeCount = indexedDb.objectStoresLength();
		expect(storeCount).toBe(2);
	});

	//should not create object store if it already exists in the database
	it('should not create object store if it already exists in the database', async () => {
		const tempIDB = new IndexedDb('temp');
		await tempIDB.createObjectStore(['books', 'students', 'books']);
		const storeCount = tempIDB.objectStoresLength();
		expect(storeCount).toBe(2);
		await tempIDB.deleteDatabase('temp');
		const result = await tempIDB.createObjectStore(['books']);
		expect(result).toEqual(undefined);
	});

	//should throw error if incorrect version is passed
	it('should not create object store if it already exists in the database', async () => {
		const tempIDB = new IndexedDb('temp2');
		const result = await tempIDB.createObjectStore(['books'], '');
		expect(result).toEqual(false);
	});

	//should return true if the store exits
	it('should return true if the store exits', () => {
		const storeExist = indexedDb.storeExists('books');
		expect(storeExist).toBe(true);
	});

	//should return false if database does not exists
	it('should return false if database does not exists', () => {
		const tempDB = new IndexedDb('temp');
		const storeExist = tempDB.storeExists('books');
		expect(storeExist).toBe(false);
	});

	//should add data to object store
	it('should add data to object store', async () => {
		const bookCount = await indexedDb.putValue('books', { name: 'Test Book 1' });
		expect(bookCount).toBe(1);
	});

	//should add multiple records to object store
	it('should add multiple records to object store', async () => {
		const books = await indexedDb.putBulkValue('books', [
			{ name: 'Test Book 2' },
			{ name: 'Test Book 3' },
		]);
		expect(books[2].name).toBe('Test Book 3');
	});

	//should get data from object store
	it('should get data from object store', async () => {
		const book = await indexedDb.getValue('books', 1);
		expect(book.name).toBe('Test Book 1');
	});

	//should get all data from object store
	it('should get all data from object store', async () => {
		const books = await indexedDb.getAllValue('books');
		expect(books.length).toBe(3);
	});

	//should delete data from object store
	it('should delete data from object store', async () => {
		const bookCount = await indexedDb.deleteValue('books', 2);
		expect(bookCount).toBe(2);
	});

	//should return result as undefined if we delete data that does not exists in the object store
	it('should return result as undefined if we delete data that does not exists in the object store', async () => {
		const bookCount = await indexedDb.deleteValue('books', 10);
		expect(bookCount).toBe(undefined);
	});

	//should reopen the database if the database is closed
	it('should reopen the database if the database is closed', async () => {
		await indexedDb.db.close();
		await indexedDb.openDatabase();
		expect(indexedDb.db._closed).toBe(false);
	});
});
