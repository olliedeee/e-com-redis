export const pageCacheKey = (id: string) => `pagecache#${id}`;
export const usersKey = (userId: string) => `users#${userId}`;  // accepts userID as param, sets key with the id.
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;
