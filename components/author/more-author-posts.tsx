import { IPostInfo } from '../../lib/types';
import Article  from '../common/article';

interface Props {
    title: string,
    isMainPage: boolean,
    morePosts: IPostInfo[]
}

export default function MoreAuthorPosts({
    title, 
    isMainPage, 
    morePosts}: Props) {
        
    return (
        <>
            {isMainPage &&
                (
                    <div className="section-heading">
                        <h2 className="title"><span>Latest Articles by {title}</span></h2>
                    </div>
                )
            }
            <section className="news-category mb-3">
                <div className="row mb-3">
                    {morePosts.length > 0 ? (
                        morePosts.map((post, index) => (
                            <div key={index} className="col-xs-12 col-md-4">
                                <Article post={post} category={null} options={
                                    {
                                        layout :'vertical',
                                        showImage : true,
                                        imageSize: 'medium',
                                        headingSize: 'h6',
                                        showPostMeta: true,
                                        dateStyle: 'full',
                                        showExcerpt: false
                                    }
                                }/>
                            </div>
                        ))
                        ) : (<></>)
                    }
                </div>
            </section>
        </>
    )
}
  