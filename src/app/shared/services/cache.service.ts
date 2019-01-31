import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
    private localCache: any;
    private sessionCache: any;
    constructor() {
        this.localCache = new WebStorageCache();
        this.sessionCache = new WebStorageCache();
        this.sessionCache.expire = Infinity;
    }

    setLocalCaches(key: string, value: any, options?: any) {
        this.localCache.set(key, value, options);
    }

    getLocalCaches(key: string) {
        return this.localCache.get(key);
    }

    deleteLocalCaches(key: string) {
        this.localCache.delete(key);
    }

    setSessionCaches(key: string, value: any, options?: any) {
        this.sessionCache.set(key, value, options);
    }

    getSessionCaches(key: string) {
        return this.sessionCache.get(key);
    }

    deleteSessionCaches(key: string) {
        this.sessionCache.delete(key);
    }
}
