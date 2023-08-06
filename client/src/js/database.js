import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Export a function to PUT to the database
export const putDb = async (content) => {
  // Open 'jate' database
  const jateDb = await openDB('jate', 1);

  // Access the object store to perform transactions
  const transaction = jateDb.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');

  // Add the content to the object store
  const request = store.add({ jate: content });

  // Commit the transaction
  const result = await request;
  console.log('🚀 - Content added to the database:', result);
};

// Export a function to GET to the database
export const getDb = async () => {
  // Open 'jate' database
  const jateDb = await openDB('jate', 1);

  // Access the object store to perform transactions
  const transaction = jateDb.transaction('jate', 'readonly');
  const store = transaction.objectStore('jate');

  // Retrieve all content from the object store
  const request = store.getAll();

  // Get confirmation of the request
  const result = await request;
  console.log('All content retrieved from the database:', result);
  return result?.value;
};

initdb();
