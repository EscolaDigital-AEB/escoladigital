// Import mongose
import * as mongoose from 'mongoose';
import { connectionFactory } from '../database/connection';





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
    const connection = connectionFactory();
    return connection.model('User', userSchema);
}

// User class
class User {
    name: string;
    email: string;
    password: string;
    role: string;
    model: any;

    constructor(name: string, email: string, password: string, role: string, model: any) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.model = model;
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

    // Methods
    
    // Return empty User Object
    static emptyUser(): User {
        return new User('', '', '', '', modelFactory());
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
            return true;
        } catch (error) {
            return false;
        }
    }
     
    
    // Get user by email
    async getUserByEmail(): Promise<User> {
        try {
            const user = await this.model.findOne({ email: this.email });
            return user;
        } catch (error) {
            return User.emptyUser();
        }
    }

    // Get user by id
    async getUserById(id: string): Promise<User> {
        try {
            const user = await this.model.findById(id);
            return user;
        } catch (error) {
            return User.emptyUser();
        }
    }
    
    // Get all users
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
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
            return true;
        } catch (error) {
            return false;
        }
    }

    // Delete user
    async deleteUser(): Promise<boolean> {
        try {
            await this
                .model
                .deleteOne({ email:this.email });
            return true;
        } catch (error) {
            return false;
        }
    }
}

// Tests

// Create user
const user = new User(
    'John Doe',
    'john@demo.com',
    '123456',
    'admin',
    modelFactory()
);


