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

//async fuction to register user
async function register(name:string , email: string, password: string, role: string): Promise<User> {
    //get data from client
    const user = new User();
    try {
    user.setName(name);
    user.setEmail(email);
    user.setPassword(password);
    user.setRole(role);

    //crypt password
    const hash = await cryptPassword(user.getPassword());
    user.setPassword(hash);

    //save user on db then validate
    const result = await user.createUser()
    .then((result) => {
        if (result) {
            return result;
        }
        return new User();
    })
    .catch((error) => {
        console.log(error);
        return new User();
    });
}
catch (error) {
    console.log(error);
    return new User();
}
    return user;
}
 


export { login, register}
    