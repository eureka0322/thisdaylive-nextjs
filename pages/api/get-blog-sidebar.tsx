import moment from "moment";
import cacheData from "memory-cache";
import { getSingleArticleSidebarHtml } from "../../lib/api";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        
        const cache_key="blog-sidebar";
        const { force } = req.query;
        var return_data = {};
        const value = cacheData.get(cache_key);
        if (value && ( force == undefined || force != 'true')) {
            return_data = value;
        } else {
            console.log(cache_key);
            const now = moment();
            const nowDateString = now.format('hh:mm:ss, YYYY/MM/DD');
            const sidebarHtml = await getSingleArticleSidebarHtml();
            const result = {
                time: nowDateString,
                sidebarHtml: sidebarHtml
            };
            
            const hours = 1;
            cacheData.put(cache_key, result, hours * 1000 * 60 * 60);
            // cacheData.put(cache_key, result, 1000 * 20);
            return_data = result;
        }

        return res.json(return_data);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}