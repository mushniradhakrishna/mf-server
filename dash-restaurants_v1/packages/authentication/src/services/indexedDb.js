import { deleteDB, openDB } from 'idb';

class IndexedDb {
	constructor(database) {
		this.database = database;
	}

	/*
	 * This function creates the store in the database
	 * @param {String}
	 * @return {null}
	 */
	async createObjectStore(tableNames, ver) {
		try {
			let version = ver;
			if (this.db) {
				version = this.db.version + 1;
				this.db.close();
			}
			this.db = await openDB(this.database, version, {
				upgrade(db) {
					for (const tableName of tableNames) {
						if (db.objectStoreNames.contains(tableName)) {
							continue;
						}
						db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
					}
				},
			});
		} catch (error) {
			return false;
		}
	}

	/*
	 * This function open's the database to perform transactions
	 * @param {null}
	 * @return {null}
	 */
	async openDatabase() {
		if (typeof this.db === 'undefined') {
			this.db = await openDB(this.database, 1);
		}
	}

	/*
	 * This function checks if the store exist in the database
	 * @param {String}
	 * @return {null}
	 */
	storeExists(storeName) {
		if (this.db) {
			const storeExist = this.db.objectStoreNames.contains(storeName);
			return storeExist;
		}
		return false;
	}

	/*
	 * This function fetches an object from the store
	 * @param {String,object id}
	 * @return {null}
	 */
	async getValue(tableName, id) {
		await this.openDatabase();
		const tx = this.db.transaction(tableName, 'readonly');
		const store = tx.objectStore(tableName);
		const result = await store.get(id);
		await tx.done;
		return result;
	}

	/*
	 * This function fetched all the values from the store
	 * @param {String}
	 * @return {null}
	 */
	async getAllValue(tableName) {
		await this.openDatabase();
		const tx = this.db.transaction(tableName, 'readonly');
		const store = tx.objectStore(tableName);
		const result = await store.getAll();
		await tx.done;
		return result;
	}

	/*
	 * This function adds the value to the store
	 * @param {String, object}
	 * @return {null}
	 */
	async putValue(tableName, value) {
		await this.openDatabase();
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		const result = await store.put(value);
		await tx.done;
		return result;
	}

	/*
	 * This function adds the multiple objects to the store
	 * @param {String,objects}
	 * @return {null}
	 */
	async putBulkValue(tableName, values) {
		this.openDatabase();
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		for (const value of values) {
			await store.put(value);
		}
		await tx.done;
		return this.getAllValue(tableName);
	}

	/*
	 * This function deleted the object from a store
	 * @param {String,object id}
	 * @return {null}
	 */
	async deleteValue(tableName, id) {
		await this.openDatabase();
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		const result = await store.get(id);
		if (!result) {
			await tx.done;
			return result;
		}
		await store.delete(id);
		await tx.done;
		return id;
	}

	/*
	 * This function deleted the database
	 * @param {String}
	 * @return {null}
	 */
	async deleteDatabase(dbName) {
		if (this.db) {
			await this.db.close();
		}
		return await deleteDB(dbName, {
			blocked() {
				//console.log('open');
			},
		});
	}

	/*
	 * This function returns the Count of the stores in db
	 * @param {null}
	 * @return {null}
	 */
	objectStoresLength() {
		return this.db.objectStoreNames.length;
	}
}

export default IndexedDb;
