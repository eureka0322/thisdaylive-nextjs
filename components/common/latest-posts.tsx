import Link from 'next/link';
import Article  from './article';
import { IPostInfo } from '../../lib/types';

interface Props {
    postsList: IPostInfo[],
    title?: string,
    options?: {
        showViewAll: boolean
    }
}
export default function LatestPosts({
    postsList, 
    title = "", 
    options = {showViewAll: true}}: Props) {
    const {showViewAll} = options;
    const postFeatured = postsList.length > 0 ? postsList[0]: null;
    const postsSecondList = postsList.slice(1);
    return (
        <section className="news-category mb-4">
            <div className="section-heading">
                <h2 className="title"><span dangerouslySetInnerHTML={{ __html: "Latest " + title }}></span></h2>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-8">
                    <div className="featured-article-container">
                        {postFeatured != null ? (
                            <Article post={postFeatured} category={null} options={
                                {
                                    layout :'featured',
                                    showImage : true,
                                    imageSize: 'full',
                                    headingSize: '',
                                    showPostMeta: false,
                                    dateStyle: 'full',
                                    showExcerpt: true
                                }
                            }/>
                            ) : (<></>)
                        }
                    </div>
                </div>
                <div className="col-xs-12 col-md-4">
                    <div className="article-column">
                        {postsSecondList.length > 0 ? (
                            postsSecondList.map((post, index) => (
                                <Article key={index} post={post} category={null} options={
                                    {
                                        layout :'horizontal',
                                        showImage : true,
                                        imageSize: 'thumbnail',
                                        headingSize: 'h6',
                                        showPostMeta: false,
                                        dateStyle: 'full',
                                        showExcerpt: false
                                    }
                                }/>
                            ))
                            ) : (<></>)
                        }
                    </div>
                    { showViewAll && 
                        <Link className="more-articles column-end" href="#">
                            View all latest
                            <i className="fa-solid fa-newspaper"></i>
                        </Link>
                    }
                </div>
            </div>
        </section>
    )
}
