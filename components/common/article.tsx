import Link from 'next/link';
import  {
    getAuthorLink, 
    getCategoryLink
} from '../../lib/utils';

import  {
    getDateString, 
} from '../../lib/utils';

import {
    IArticleOption, 
    ICategoryInfo,
    IPostInfo
} from '../../lib/types';

import Image from 'next/image';
interface Props {
    post: IPostInfo,
    category: ICategoryInfo
    options: IArticleOption
}

export default function Article({post, category, options}: Props) {
    const {layout, showImage, imageSize, headingSize, showPostMeta, dateStyle, showExcerpt} = options;

    const articleClasses = `typography ${layout}`;

    const hasPostThumbnail  = () => {
        if (post['thumbnail'] != "")
            return true;
        else
            return false;
    }

    var articleStyleAtt = {};
    var featuredImgUrl="";
    if (layout == 'featured') {
        featuredImgUrl = post['thumbnail'];
        if(post['thumbnail_full'] != '')
            featuredImgUrl = post['thumbnail_full'];  
    };
    return (
        <article className={articleClasses } style={articleStyleAtt} >
            {layout === 'featured' &&
            (
                <div style={{width:'100%', height:'100%'}}>
                    <Image src={featuredImgUrl} fill style={{objectFit:"cover"}} alt="Image"/>
                </div>
            )
            }
            {layout !== 'featured' && hasPostThumbnail() && imageSize === 'thumbnail' &&
            
                <div className={`article-image ${imageSize}`}>
                    <Link title={post['title']} href={post.url}>
                        <div style={{width:'100%', paddingTop: '100%', position: 'relative'}}>
                            <Image src={post['thumbnail']} fill style={{objectFit:"cover"}} className="attachment-thumbnail" alt="Image"/>
                        </div>
                    </Link>
                </div>
            }

            {layout !== 'featured' && hasPostThumbnail() && imageSize === 'medium' &&
            
            <div className={`article-image ${imageSize}`}>
                <Link title={post['title']} href={post.url}>
                    <div style={{width:'100%', height: 0, paddingTop: '100%', position: 'relative'}}>
                        <Image src={post['thumbnail']} fill style={{objectFit:"cover"}} className="attachment-thumbnail" alt="Image"/>
                    </div>
                </Link>
            </div>
        }

            {layout !== 'featured' && !hasPostThumbnail() &&
                <div className="article-image">
                    <Link title={post['title']} href={post.url}>
                    </Link>
              </div>
            }

            <div className="article-content matchHeight">

                {/* category */}
                {showPostMeta &&
                    <div className="post-meta mb-1">
                        <span className="category">
                            { category != null ?
                                (
                                    <Link href={getCategoryLink(category['slug'])}>
                                        <span dangerouslySetInnerHTML={{ __html: category['name'] }}/>
                                    </Link>
                                ) : post['category'] != null ?
                                (
                                    <Link href={getCategoryLink(post['category']['slug'])}>
                                        <span dangerouslySetInnerHTML={{ __html: post['category']['name'] }}/>
                                    </Link>
                                ) : (<></>)
                            }
                        </span>
                    </div>
                }

                {/* title */}
                <h2 className={headingSize}>
                    <Link href={post.url}>
                        <span dangerouslySetInnerHTML={{ __html: post['title'] }}/>
                    </Link>
                </h2>
                
                {/* date and author */}
                { showPostMeta && dateStyle == 'ago' &&
                    <div className="post-date">
                        <span className="date-container">
                            <i className="fa-light fa-calendar-days"></i>
                            <span className="date">{post['agoDate']}</span>
                        </span>
                        <span> by <Link href={getAuthorLink(post['author']['slug'])} title={`Posts by ${post['author']['name']}`}>
                                {post['author']['name']}
                            </Link>
                        </span>
                    </div>
                }

                { showPostMeta && dateStyle != 'ago' &&
                    <div className="post-date">
                        <span className="date-container">
                            <i className="fa-light fa-calendar-days"></i>
                            <span className="date">{getDateString(post['date'])}</span>
                        </span>
                        <span> by <Link href={getAuthorLink(post['author']['slug'])} title={`Posts by ${post['author']['name']}`}>
                                {post['author']['name']}
                            </Link>
                        </span>
                    </div>
                }

                {showExcerpt &&
                    <div className="excerpt" dangerouslySetInnerHTML={{ __html: post['excerpt'] }}>
                    </div>
                }
            </div>

        </article>
    )
}