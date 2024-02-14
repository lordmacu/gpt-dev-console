
import Dexie from 'dexie';

const db = new Dexie('chat');
db.version(3).stores({
  chats: '++id, uuid, title, type, keywords, date',
  messages: '++id, chatId, text, date, sender',
  tips: '++id, keywords, contenido'
});

export default db;