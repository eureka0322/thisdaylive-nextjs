import { getAmpUrl, getBlogLink } from "../../lib/utils";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { secret, blog } = req.body;
        if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if(blog.slug== ""){
            return res.status(401).json({ message: 'Invalid slug' });
        }
        const blogUrl = getBlogLink(blog.slug, blog.year, blog.month, blog.day);
        const blogUrlAmp = getAmpUrl(blogUrl)
        console.log(`blog revalidate ${blogUrl}`);
        console.log(`blog revalidate ${blogUrlAmp}`);
        res.revalidate(blogUrl);
        res.revalidate(blogUrlAmp);
        return res.json(
            { 
                revalidated: true,
                blog_url: blogUrl,
                blog_url_amp: blogUrlAmp
            }
        );


    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}