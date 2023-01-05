// Import mongose
import * as mongoose from 'mongoose';

// Import connectFactory
import connectFactory from '../database/conn';
let conn:any = connectFactory();

/*
password
email
name
role
*/

// Create a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
});

// Create a model
function modelFactory(): any {
    // Connect to db
    return conn.model('User', userSchema);
}

// User class
class User {
    name: string;
    email: string;
    password: string;
    role: string;
    model: any;

    constructor() {
        this.name = "";
        this.email = "";
        this.password = "";
        this.role = "default";
        this.model = modelFactory();
    }

    // Getters
    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPassword() {
        return this.password;
    }

    getRole(){
        return this.role;
    }

    // Setters
    setName(name: string) {
        this.name = name;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string) {
        this.password = password;
    }

    setRole(role: string){
        this.role = role;
    }

    setModel(model: any){
        this.model = model;
    }

    // Create user on db
    async createUser(): Promise<boolean> {
        try {
            const user = new this.model({
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role
            });
            await user.save();
            conn.close();
            return true;
        } catch (error) {
            conn.close();
            return false;
        }
    }
     
    
    // Get user by email
    async getUserByEmail(): Promise<User> {
        try {
            const user = await this.model.findOne({ email: this.email });
            conn.close();
            return user;
        } catch (error) {
            console.log(error);
            conn.close();
            return new User();
        }
    }

    // Get user by id
    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.model.findById(id);
            conn.close();
            return user;
        } catch (error) {
            console.log(error);
            conn.close();
            return new User();
        }
    }
    
    // Get all users
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.model.find();
            conn.close();
            return users;
        } catch (error) {
            conn.close();
            return [];
        }
    }

    // Update user
    async updateUser(): Promise<boolean> {
        try {
            await this
                .model
                .updateOne({ email: this.email, name: this.name }, {
                    $set: {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        role: this.role
                    }
                });
            conn.close();
            return true;
        } catch (error) {
            conn.close();
            return false;
        }
    }

    // Delete user
    async deleteUser(): Promise<boolean> {
        try {
            await this
                .model
                .deleteOne({ email:this.email });
            conn.close();
            return true;
        } catch (error) {
            conn.close();
            return false;
        }
    }
}

export { User };


