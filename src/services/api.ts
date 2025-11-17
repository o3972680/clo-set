import type { ApiItem } from "@/types";
import { CacheManager } from "@/utils/cache";

const API_URL = "https://closet-recruiting-api.azurewebsites.net/api/data";
const CACHE_DURATION = 60 * 60 * 1000; // 60 minutes in milliseconds

const apiCache = new CacheManager<ApiItem[]>(CACHE_DURATION);

/**
 * Fetch items from the API with pagination
 *
 * @param page - Current page number (0-based)
 * @param limit - Number of items per page
 * @returns Promise with array of API items
 */
export const fetchItems = async (
    page: number = 0,
    limit: number = 8
): Promise<ApiItem[]> => {
    const cacheKey = `${page}-${limit}`;

    // Check if we have a valid cached response
    const cachedData = apiCache.get(cacheKey);
    if (cachedData) {
        console.log(`Using cached data for page ${page}`);
        return cachedData;
    }

    try {
        console.log(`Fetching from API for page ${page}`);
        const response = await fetch(`${API_URL}`);

        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        const rawData = await response.json();

        const items: ApiItem[] = rawData || [];
        // Cache the items
        apiCache.set(cacheKey, items);

        return items;
    } catch (error) {
        console.error("Error fetching items:", error);
        // If there's an error but we have cached data (even if expired), return it as fallback
        const expiredData = apiCache.getExpired(cacheKey);
        if (expiredData) {
            console.log(
                `Using expired cached data for page ${page} due to error`
            );
            return expiredData;
        }

        throw error;
    }
};

export const clearApiCache = (): void => {
    apiCache.clear();
};
