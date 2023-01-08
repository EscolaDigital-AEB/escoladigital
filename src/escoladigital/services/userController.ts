import * as bcrypt from 'bcrypt-ts';
import { User } from '../models/user';
import { json } from 'stream/consumers';

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

//async fuction to login user
async function login(email: string, password: string): Promise<User> {


    try {
        const user = new User();
        const result = await user.model.findOne
            ({ email: email });
        if (result) {
            const passwordIsValid = await comparePassword(password, result.password);
            if (passwordIsValid) {
                return result;
            }
        }
        return new User();
    } catch (error) {
        console.log(error);
        return new User();
    }

}
 


export { login }
    