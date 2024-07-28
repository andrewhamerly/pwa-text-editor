import { openDB } from 'idb';

const initdb = async () =>
  openDB('contact', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('contact')) {
        console.log('contact database already exists');
        return;
      }
      db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
      console.log('contact database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');

  const test = await openDB('contact', 1);

  const tx = test.transaction('contact', 'readwrite');

  const store = tx.objectStore('contact');

  const request = store.add(content);

  const result = await request;
  console.log('result.value', result);
  return result;
};

export const getDb = async () => {
  console.log('GET from the database');

  const test = await openDB('contact', 1);

  const tx = test.transaction('contact', 'readonly');

  const store = tx.objectStore('contact');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
