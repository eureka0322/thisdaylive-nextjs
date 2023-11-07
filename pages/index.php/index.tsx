import { GetServerSideProps } from "next";
import { getString } from "../../lib/utils";
import { getRssFeed } from "../../lib/api";

const Sitemap = () => null;
  
export const getServerSideProps: GetServerSideProps = async (context) => {
    var res = context.res;
    var feed = "";
    if('feed' in context.query){
        feed = getString(context.query.feed);
    }
    if(feed == "rss"){
        res.setHeader("Content-Type", "application/rss+xml; charset=UTF-8");
        var data = await getRssFeed();
        res.write(data);
        res.end();
        return {
            props: {},
        };
    }
    else{
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
          };

    }
}
    
export default Sitemap;