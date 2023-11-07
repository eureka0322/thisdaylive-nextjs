import { 
    ICategoryInfo, 
    IPostInfo } from '../../lib/types';
import Article  from '../common/article';

interface Props {
    title: string,
    category: ICategoryInfo,
    topPosts: IPostInfo[],
    morePosts: IPostInfo[]
}

export default function MoreCategoryPosts({
    title, 
    category, 
    topPosts, 
    morePosts}: Props) {

    return (
        <section className="news-category mb-3">
            <div className="section-heading">
                <h2><span>More {title} Articles</span></h2>
            </div>
            <div className="row mb-3">
                {topPosts.length > 0 ? (
                    topPosts.map((post, index) => (
                        <div key={index} className="col-xs-12 col-md-4">
                            <Article  post={post} category={category} options={
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
            <div className="row">
                {morePosts.length > 0 ? (
                    morePosts.map((post, index) => (
                        <div key={index} className="col-xs-12 col-md-4">
                            <Article post={post} category={null} options={
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
                        </div>
                    ))
                    ) : (<></>)
                }
            </div>
        </section>
    )
}
  