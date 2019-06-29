(function () {
  'use strict';

  // self.addEventListener('fetch', (event) => {
  //     const db = await openDB('pawsdb', 1, {
  //       upgrade(db) {
  //         db.createObjectStore('diaries');
  //       }
  //     });
  
  //     let cursor = await db.transaction('pawsdb').store.openCursor();
  
  //     while (cursor) {
  //       console.log(cursor.key, cursor.value);
  //       cursor = await cursor.continue();
  //     }
    
  //   console.log('diaries from indexed db');
  //   console.log(diaries);
  // });
}());