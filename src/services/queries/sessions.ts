import type { Session } from '$services/types';
import { sessionsKey } from '$services/keys';
import { client } from '$services/redis';
import type { session } from '$app/stores';

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionsKey(id));
    // hGetAll always returns an object,  {}, most languages assume any non-null response
    // means that a session is found. So an extra step must be added to return a null response.

    if (Object.keys(session).length === 0) {
        return null;
    }
    return deserialize(id, session); // purpose of this is to add the id back in as it's not stored in redis.
};

export const saveSession = async (session: Session) => {
    return client.hSet(
        sessionsKey(session.id),
        serialize(session)
    )
};

const deserialize = (id: string, session: {[key: string] : string}) => {
    return {
        id,
        userId: session.userId,
        username: session.username
    }
}

const serialize = (session: Session) => {
    return {
        userId: session.userId,
        username: session.username
    }
}
