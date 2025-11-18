import type { ApiItem } from "@/types";
import { CacheManager } from "@/utils/cache";

const API_URL = "https://closet-recruiting-api.azurewebsites.net/api/data";
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

const apiCache = new CacheManager<ApiItem[]>(CACHE_DURATION);

export const fetchItems = async (): Promise<ApiItem[]> => {
    const cacheKey = `clo-set`;

    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(`${API_URL}`);

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }
        const rawData = await response.json();

        const items: ApiItem[] = rawData || [];
        apiCache.set(cacheKey, items);

        return items;
    } catch (error) {
        console.error("Error fetching items:", error);
        // If there's an error but we have cached data (even if expired), return it as fallback
        const expiredData = apiCache.getExpired(cacheKey);
        if (expiredData) {
            console.log(`Using expired cached data for page due to error`);
            return expiredData;
        }

        throw error;
    }
};
