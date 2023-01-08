//Realizar operações de CRUD na aplicaçao
// > Login
// > Cadastrar
// > Editar
// > Deletar

import { connect } from "../services/dbmongo";
import bcrypt from "bcryptjs";


//async function to get a single user by id 
async function getUserById(id) {
  const { db } = await connect();
  
  const query = {
    _id: id
  }

  const opcoes = {
    projection: {
      password: false,
    },
  };

  const collection = db.collection("Users");

  const response = await collection
    .findOne(query, opcoes);

  if (response) {
    return response;
  } else {
    return null;
  }
}


//async func get all users that are active
async function getAllUsers(status) {
  const { db } = await connect();
  
  const query = {
    status: "active"
  }

  const opcoes = {
    projection: {
      password: false,
    },
  };

  const collection = db.collection("Users");

  const response = await collection
    .find(query.active, opcoes)
    .toArray();

  if (response) {
    return response;
  } else {
    return null;
  }
}




async function login(email, password) {
  const { db } = await connect();

  const user = {
    email: email,
    password: password,
  };

  const opcoes = {
    projection: {
      password: false,
    },
  };

  const collection = db.collection("Users");

  const response = await collection.findOne({ email: user.email }, opcoes);

  if (response) {
    return response;
  } else {
    return null;
  }
}

async function register(
  email,
  password,
  nome,
  role,
  status,
  createdAt,
  updatedAt
) {
  const { db } = await connect();

  const user = {
    email: email,
    password: password,
    name: nome,
    role: role,
    status: status,
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  //veryfy if user already exists
  const userExists = await db.collection("Users").findOne({ email: user.email });
  if (userExists != null) {
    //user already exists
    //dont create user
    return null;
  } else {
    const collection = db.collection("Users");
    //crypt password
    user.password = bcrypt.hashSync(user.password, 10);

    const response = await collection.insertOne(user);

    if (response) {
      return response;
    } else {
      return null;
    }
  }
}
export default { login, register, getAllUsers, getUserById };
