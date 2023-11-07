import cacheData from "memory-cache";
import { getCategories, getCategoryPosts, getLatestPosts } from "../../lib/api";
import { getCategoryIdFromSlug, getNowDateString } from "../../lib/utils";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        
        const cache_key="top-news";
        const { force } = req.query;
        var return_data = {};
        const value = cacheData.get(cache_key);
        if (value && ( force == undefined || force != 'true')) {
            return_data = value;
        } else {
            console.log(cache_key);
            const categoriesData = await getCategories(); 
            const latestPosts = await getLatestPosts(5);
            const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
            const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
            const nowDateString = getNowDateString();
            
            const result = {
                nowDateString: nowDateString,
                latestPosts: latestPosts,
                breakingNews: breakingNews
            };
            
            const min = 10;
            cacheData.put(cache_key, result, min * 1000 * 60);
            return_data = result;
        }

        return res.json(return_data);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}