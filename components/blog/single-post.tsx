import { IPostData } from "../../lib/types";
import ShareThisInlineButtons from "./sharethis-inline-button";
import Image from 'next/image';
import moment from 'moment-timezone';
import {useEffect, useState} from 'react';
import DisqusComments from "./disqus-comments";
interface Props {
    post: IPostData,
    categoryName: string   
}

export default function SinglePost({post, categoryName}: Props) {
    const [agoDate, setAgoDate] = useState<string>("");
    useEffect(() => {
        const post_date = `${post.date}+01:00`;
        const d = moment().tz("Africa/Lagos").format();
        setAgoDate(moment(post_date).from(moment().tz("Africa/Lagos").format()));
      }, []);
    return (
        <section id="single_article">
            <h1 className="article-title mb-2" dangerouslySetInnerHTML={{ __html: post['title'] }}></h1>
            <div className="post-meta mb-2">
                <span className="category"><a href="#" dangerouslySetInnerHTML={{ __html:categoryName }}>
                </a></span> | <span className="date-container"><i className="fa-light fa-calendar-days"></i> <span className="date">{agoDate}</span></span>
            </div>
            <div className="article-image" style={{width:'100%', height:'100%', position:"relative"}}>
                {post['thumbnail'] != '' && <img src={post['thumbnail']} className="attachment-full size-full wp-post-image" width={1024} height={1024} alt={post['title']} title={post['title']} />}
                
            </div>
            <div className="article-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-11">
                        <ShareThisInlineButtons />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-11" dangerouslySetInnerHTML={{ __html: post['content'] }}>
                    </div>
                </div>
            </div>
            <div>
                <DisqusComments post={post}/>
            </div>
        </section>
    )
}
