import { DBSchema } from 'idb';

export interface PawsDB extends DBSchema {
    'diaries': {
        value: {
            id: string,
            date: Date,
            note: string,
        },
        key: string,
    };
}
