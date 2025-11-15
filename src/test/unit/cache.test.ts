import { beforeEach, describe, expect, test, vi } from "vitest";
import { CacheManager } from "../../utils/cache";

describe("CacheManager", () => {
    let cacheManager: CacheManager<string>;
    const CACHE_DURATION = 1000; // 1 second for testing

    beforeEach(() => {
        cacheManager = new CacheManager<string>(CACHE_DURATION);

        vi.resetAllMocks();
    });

    describe("set and get methods", () => {
        test("should store and retrieve an item", () => {
            const key = "test-key";
            const value = "test-value";

            cacheManager.set(key, value);
            const result = cacheManager.get(key);

            expect(result).toBe(value);
        });

        test("should return null for non-existent keys", () => {
            const result = cacheManager.get("non-existent-key");

            expect(result).toBeNull();
        });

        test("should return valid items within the cache duration", () => {
            const key = "test-key";
            const value = "test-value";

            cacheManager.set(key, value);

            // Mock Date.now to simulate time passing but still within cache duration
            const originalNow = Date.now;
            const mockNow = vi.fn(() => originalNow() + CACHE_DURATION / 2);
            vi.spyOn(globalThis.Date, "now").mockImplementation(mockNow);

            const result = cacheManager.get(key);

            expect(result).toBe(value);

            // Restore original Date.now
            vi.spyOn(globalThis.Date, "now").mockImplementation(originalNow);
        });
    });

    describe("getExpired method", () => {
        test("should return null for non-existent keys", () => {
            const result = cacheManager.getExpired("non-existent-key");

            expect(result).toBeNull();
        });
    });

    describe("remove method", () => {
        test("should remove an item from the cache", () => {
            const key = "test-key";
            const value = "test-value";

            cacheManager.set(key, value);
            expect(cacheManager.get(key)).toBe(value);

            cacheManager.remove(key);

            expect(cacheManager.get(key)).toBeNull();
            expect(cacheManager.getExpired(key)).toBeNull();
        });
    });

    describe("has method", () => {
        test("should return true if the key exists in the cache", () => {
            const key = "test-key";
            const value = "test-value";

            cacheManager.set(key, value);

            expect(cacheManager.has(key)).toBe(true);
        });

        test("should return false if the key does not exist in the cache", () => {
            expect(cacheManager.has("non-existent-key")).toBe(false);
        });

        test("should return true for expired items", () => {
            const key = "test-key";
            const value = "test-value";

            cacheManager.set(key, value);

            const originalNow = Date.now;
            const mockNow = vi.fn(() => originalNow() + CACHE_DURATION + 1);
            vi.spyOn(globalThis.Date, "now").mockImplementation(mockNow);

            expect(cacheManager.has(key)).toBe(true);

            vi.spyOn(globalThis.Date, "now").mockImplementation(originalNow);
        });
    });

    describe("clear method", () => {
        test("should clear all items from the cache", () => {
            cacheManager.set("key1", "value1");
            cacheManager.set("key2", "value2");

            expect(cacheManager.get("key1")).toBe("value1");
            expect(cacheManager.get("key2")).toBe("value2");

            cacheManager.clear();

            expect(cacheManager.get("key1")).toBeNull();
            expect(cacheManager.get("key2")).toBeNull();
        });
    });
});
