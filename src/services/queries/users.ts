import type { CreateUserAttrs } from '$services/types';
import { genId } from '$services/utils';
import {client } from '$services/redis'
import { usersKey} from '$services/keys'

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));
    return deserialize(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = genId(); // generates a unique id
    await client.hSet(usersKey(id), serialize(attrs)); // sets hash with key of users key from services/keys>
    // calls serialize on attrs which does nothing extra, but is extensible and strongly typed
    // returns the id
    return id;
};

const serialize = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password
    }
}

const deserialize = (id: string, user: {[key: string] : string}) => {
    return {
        id,
        username: user.username,
        password: user.password
    }
}
