export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { secret, url } = req.body;
        if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log(`revalidate page: ${url}`);
        res.revalidate(url);
        return res.json(
            { 
                revalidated: true,
                blog_url: url
            }
        );
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}