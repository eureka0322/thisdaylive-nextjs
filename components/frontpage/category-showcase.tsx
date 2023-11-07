import Link from 'next/link'
import Article  from '../common/article';
import  {getCategoryLink} from '../../lib/utils'
import { IPostInfo } from '../../lib/types';

interface Props {
    postsList: IPostInfo[],
    term: string
}

export default function CategoryShowcase({postsList, term}: Props) {
    const postsThumbnails = postsList.slice(0, 3);
    const postsOthers = postsList.slice(3);
    return (
        <section className="news-category mb-3">
            <div className="section-heading">
                <h2 className="title"><span>{term}</span></h2>
                <div className="cat-link">
                    <Link  href={getCategoryLink(term)}>
                        View all {term}
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Link>
                </div>
            </div>
            <div className="row">
                {postsThumbnails.length > 0 ? (
                    postsThumbnails.map((post, index) => (
                        <div className="col-xs-12 col-md-4" key={index}>
                            <Article post={post} category={null} options={
                                {
                                    layout :'vertical',
                                    showImage : true,
                                    imageSize: 'medium',
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
                {postsOthers.length > 0 ? (
                    postsOthers.map((post, index) => (
                        <div className="col-xs-12 col-md-4" key={index}>
                            <Article post={post} category={null} options={
                                {
                                    layout :'horizontal no-img',
                                    showImage : false,
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
