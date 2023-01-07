import * as bcrypt from 'bcrypt-ts';
import { User } from '../models/user';

// async function to crypt user password before save it on db
async function cryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

// async function to compare user password with password on db
async function comparePassword(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);
    return result;
}

//
 
    