import React, { useEffect } from 'react';
import IndexedDb from './indexedDb';

const TestIndexedDB = () => {
	useEffect(() => {
		const runIndexDb = async () => {
			const indexedDb = new IndexedDb('test');
			await indexedDb.createObjectStore(['books', 'students']);
			await indexedDb.createObjectStore(['books1', 'students1']);
			await indexedDb.createObjectStore(['books2', 'students2', 'books1']);
			await indexedDb.putValue('books', { name: 'Test Book 1' });
			await indexedDb.putBulkValue('books', [{ name: 'Test Book 2' }, { name: 'Test Book 3' }]);
			await indexedDb.getValue('books', 1);
			await indexedDb.getAllValue('books');
			await indexedDb.deleteValue('books', 1);
			await indexedDb.deleteDatabase('test');
		};
		runIndexDb();
	}, []);
	return <React.Fragment>ABCD</React.Fragment>;
};

export default TestIndexedDB;
