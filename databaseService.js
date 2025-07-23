import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const defaultData = {posts: []}
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);
const db = new Low(adapter);

export async function init() {
    await db.read();
    db.data = db.data || { users: [] };
    await db.write();
    console.log('Banco de dados iniciado e pronto.');
}

export async function findUser(whatsappNumber) {
    await db.read();
    return db.data.users.find(u => u.whatsappNumber === whatsappNumber);
}

export async function createUser(userData) {
    await db.read();
    db.data.users.push(userData);
    await db.write();
}

export async function updateUser(whatsappNumber, data) {
    await db.read();
    const userIndex = db.data.users.findIndex(u => u.whatsappNumber === whatsappNumber);
    if (userIndex !== -1) {
        db.data.users[userIndex] = { ...db.data.users[userIndex], ...data };
        await db.write();
    }
}