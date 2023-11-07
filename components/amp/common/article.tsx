import Link from 'next/link';
import  {
    getAmpUrl,
    getAuthorLink, 
    getCategoryLink
} from '../../../lib/utils';

import  {
    getDateString, 
} from '../../../lib/utils';

import {
    IArticleOption, 
    ICategoryInfo,
    IPostInfo
} from '../../../lib/types';

import Image from 'next/image';
interface Props {
    post: IPostInfo,
    category: ICategoryInfo,
    options: IArticleOption
}

export default function AmpArticle({post, category, options}: Props) {
    const {layout, showImage, imageSize, headingSize, showPostMeta, dateStyle, showExcerpt} = options;

    var articleClasses = `container ${layout}-container ${imageSize}`;
    
    var featuredImgUrl="";
    if (layout == 'featured') {
        featuredImgUrl = post['thumbnail'];
        if(post['thumbnail_full'] != '')
            featuredImgUrl = post['thumbnail_full'];  
    };
    var imageUrl="";
    if(layout == "horizontal" || layout == "slider"){
        if(post.thumbnail_small != '')
            imageUrl = post.thumbnail_small;
        else
            imageUrl = post.thumbnail_full;
    }
    if(layout == "vertical"){
        if(post.thumbnail_medium != '')
            imageUrl = post.thumbnail_medium;
        else
            imageUrl = post.thumbnail_full;
    }
    else if(layout == "featured"){
        imageUrl = post.thumbnail_full;
    }
    if(layout == "vertical-slider"){
        if(post.thumbnail_medium != '')
            imageUrl = post.thumbnail_medium;
        else
            imageUrl = post.thumbnail_full;
    }

    return (
        <article className={articleClasses}  >
            {layout === 'minimal' &&
            (
                <>
                    <div className="article-share">
                        <amp-social-share layout="responsive" width="25" height="25" type="system" aria-label="Share" className="share-system"></amp-social-share>
                    </div>
                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                    <time className="article-date">
                        {post.agoDate}
                    </time>
                    </div>
                </>
            )
            }
            {layout === 'minimal-related' &&
            (
                <>
                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <div className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></div>
                        </Link>
                    </div>
                </>
            )
            }
            {layout === 'slider' &&
            (
                <>
                    {showImage && imageUrl != '' && 
                    (
                        <div className="thumbnail">
                            <Link title={post.title} href={getAmpUrl(post.url)}>
                                <amp-img 
                                    width="150"
                                    height="150"
                                    layout="responsive"
                                    src={imageUrl}>

                                </amp-img>
                            </Link>
                        </div>
                    )
                    }
                    
                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                    </div>
                    <div className="article-share">
                        <amp-social-share layout="responsive" width="25" height="25" type="system" aria-label="Share" className="share-system"></amp-social-share>
                    </div>
                    
                </>
            )
            }
            {layout === 'horizontal' &&
            (
                <>
                    {showImage && imageUrl != '' && 
                    (
                        
                        <div className="thumbnail">
                            <Link title={post.title} href={getAmpUrl(post.url)}>
                                <amp-img 
                                    width="130"
                                    height="98"
                                    layout="fill"
                                    object-fit="cover"
                                    src={imageUrl}>

                                </amp-img>
                            </Link>
                        </div>
                         
                    )
                    }
                    
                    <div className="article-share">
                        <amp-social-share layout="responsive" width="25" height="25" type="system" aria-label="Share" className="share-system"></amp-social-share>
                    </div>
                    <div className="article-text">
                        {showPostMeta && category != null &&
                        (
                            <span className="article-category" dangerouslySetInnerHTML={{ __html: category['name'] }}></span>
                        )}
                        {showPostMeta && category == null &&
                        (
                            <span className="article-category" dangerouslySetInnerHTML={{ __html: post.category.name }}></span>
                        )}

                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                        {showPostMeta && 
                        (
                            <time className="article-date">{getDateString(post.date)}</time>
                        )}
                    </div>
                    
                    
                </>
            )
            }
            {layout === 'featured' &&
            (
                <>
                    {showImage && imageUrl != '' && 
                    (
                        <div className="thumbnail">
                            <Link title={post.title} href={getAmpUrl(post.url)}>
                                <amp-img 
                                    width="150"
                                    height="150"
                                    layout="fill"
                                    object-fit="cover"
                                    src={imageUrl}>
                                </amp-img>
                            </Link>
                        </div>
                    )
                    }
                    <div className="article-share">
                        <amp-social-share layout="responsive" width="25" height="25" type="system" aria-label="Share" className="share-system"></amp-social-share>
                    </div>
                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                    </div>
                    
                    
                </>
            )
            }
            {layout === 'vertical' &&
            (
                <>
                    {showImage && imageUrl != '' && 
                    (
                        <div className="thumbnail">
                            <Link title={post.title} href={getAmpUrl(post.url)}>
                                <amp-img 
                                    width="150"
                                    height="150"
                                    layout="fill"
                                    object-fit="cover"
                                    src={imageUrl}>

                                </amp-img>
                            </Link>
                        </div>
                    )}
                    <div className="article-share">
                        <amp-social-share layout="responsive" width="25" height="25" type="system" aria-label="Share" className="share-system"></amp-social-share>
                    </div>
                    {showPostMeta && category != null &&
                    (
                        <span className="article-category" dangerouslySetInnerHTML={{ __html: category['name'] }}></span>
                    )}
                    {showPostMeta && category == null &&
                    (
                        <span className="article-category" dangerouslySetInnerHTML={{ __html: post.category.name }}></span>
                    )}

                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                    </div>

                    {showPostMeta && 
                    (
                        <time className="article-date">{getDateString(post.date)}</time>
                    )
                    }

                    {showExcerpt &&
                    (
                        <div className="article-excerpt" dangerouslySetInnerHTML={{ __html: post['excerpt'] }}>
                        </div>
                    )}
                    
                    
                </>
            )
            }
            {layout === 'vertical-slider' &&
            (
                <>
                    {showImage && imageUrl != '' && 
                    (
                        <div className="thumbnail">
                            <Link title={post.title} href={getAmpUrl(post.url)}>
                            <amp-img 
                                width="150"
                                height="150"
                                layout="fill"
                                object-fit="cover"
                                src={imageUrl}>

                            </amp-img>
                            </Link>
                        </div>
                    )}
                    
                    
                    <div className="article-text">
                        <Link title={post.title} href={getAmpUrl(post.url)}>
                            <h3 className="article-title" dangerouslySetInnerHTML={{ __html: post.title }}></h3>
                        </Link>
                    </div>
                </>
            )
            }
            <style jsx>{`

                .share-system {
                    background-color: transparent;
                    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="%23b3b3b3" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>')
                }
                .container.slider {
                    display: flex;
                    flex: 0 0 auto;
                    margin: 15px 0 15px 10px;
                    width: 90%;
                    background-color: #efefef;
                }
                .minimal-container {
                    text-overflow: ellipsis;
                    border-width: 1px;
                    border-color: rgba(0,0,0,0.08);
                    background: #f0f0f0;
                    display: inline-block;
                    width: 80%;
                    margin-bottom: 15px;
                    margin-right: 3px;
                    padding: 0;
                    white-space: normal;
                    vertical-align: top;
                }
                .minimal-container .article-share{
                    margin-top: 13px;
                    float: right;
                    width: 8%;
                    color: #b3b3b3;
                }
                .minimal-container .article-text {
                    position: relative;
                    border-radius: 0;
                    box-shadow: none;
                    padding: 15px 15px 5px;
                    min-height: 114px;
                    padding-inline-start: 15px;
                    box-sizing: border-box;
                }
                .minimal-container .article-title {
                    color: #363636;
                    font-size: 16px;
                    line-height: 1.375;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0 0 8px;
                }
                .minimal-container .article-date{
                    font-size: 11px;
                    color: #737373;
                    font-style: normal;
                    line-height: 1.1;
                }


                .minimal-related-container {
                    display: inline-block;
                    width: 275px;
                    vertical-align: top;
                    padding: 10px;
                    margin-inline-end: 5px;
                    background-color: #f1f1f1;
                    border-left: 2px solid #D8D8D8;
                    height: 60px;
                    box-sizing: content-box;
                    margin-bottom: 15px;
                    color: #363636;

                }
                .minimal-related-container .article-text {

                }
                .minimal-related-container .article-title {
                    font-family: "MainFont",system-ui;
                    color: #363636;
                    font-size: 14.4px;
                    white-space: normal;
                    line-height: 1.375;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    font-weight:700;
                }



                .slider-container {
                    text-overflow: ellipsis;
                    border-width: 1px;
                    border-color: rgba(0,0,0,0.08);
                    display: flex;
                    flex: 0 0 auto;
                    margin: 15px 0 15px 10px;
                    width: 90%;
                    background-color: #efefef;
                }
                .slider-container .article-share{
                    margin-top: 5px;
                    color: #b3b3b3;
                    float: right;
                    width: 8%;
                }
                .slider-container .article-text {
                    flex: 1;
                    padding: 8px 0 0 8px;
                    white-space: normal;
                }
                .slider-container .article-title {
                    font-size: 16px;
                    line-height: 1.2;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0 0 8px;
                    color: black;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0 0 8px;
                }
                .slider-container .thumbnail {
                    background-color: #f0f0f0;
                    height: unset;
                    flex: 0 40%;
                    position: relative;
                }

                .horizontal-container {
                    border-top: 0;
                    padding-top: 15px;
                    display: flex;
                    gap: 8px;
                    width: 100%;
                    padding: 15px;
                    margin: 0;
                    box-sizing: border-box;
                    border-top: 1px solid #e4e4e4;
                }
                .horizontal-container .article-share{
                    position: absolute;
                    right: 0;
                    color: #b3b3b3;
                    margin-top: -3px;
                    float: right;
                    width: 8%;
                }
                .horizontal-container .article-text {
                    width: 100%;
                }
                .horizontal-container .article-title {
                    font-size: 16px;
                    line-height: 1.2353;
                    color:black;
                    margin-bottom: 4px;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0 0 8px;
                }
                .horizontal-container .thumbnail {
                    background-color: #f0f0f0;
                    height: 98px;
                    flex-shrink: 0;
                    float: left;
                    width: 35%;
                    position: relative;
                    padding-top: calc(35% / 1.32);
                    height:100%;
                }
                .horizontal-container .article-category {
                    font-family: "SecondaryFontMedium",system-ui;
                    font-weight: 500;
                    font-size: 10.8px;
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    color: #A00E0E;
                }
                .horizontal-container .article-date {
                    font-size: 9.9px;
                    color: #737373;
                    font-style: normal;
                    line-height: 1.1;
                    display: block;
                }



                .featured-container {
                    border-top: 0;
                    padding-top: 0;
                    margin-bottom: 0;
                    height: 240px;
                    position: relative;
                    left: 0;
                }
                .featured-container.medium {
                    height: 170px;
                }
                .featured-container .share-system {
                    background-color: transparent;
                    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="%23fff" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>')
                }
                .featured-container .article-share{
                    color: #fff;
                    margin-top: -3px;
                    position: absolute;
                    top: 13px;
                    right: 0;
                    float: right;
                    width: 8%;
                }
                .featured-container .article-text {
                    position: absolute;
                    padding: 0;
                    bottom: 10px;
                    left: 0;
                    width: 95%;
                    margin: 0 10px;
                }
                .featured-container .article-title {
                    color: #fff;
                    text-shadow: 1px 0 3px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.3), 0px -1px 3px rgba(0,0,0,0.3), -1px 0px 3px rgba(0,0,0,0.3);
                    width: 100%;
                    box-sizing: border-box;
                    font-size: 22px;
                    line-height: 1.2;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0 0 8px;
                }
                .featured-container .thumbnail {
                    background-color: #f0f0f0;
                    height: 100%;
                    width: 100%;
                    background-repeat: no-repeat;
                    position: relative;
                }


                .vertical-container {
                    padding-top: 15px;
                    border-top: 1px solid #e4e4e4;
                    margin-bottom: 15px;
                }
                .vertical-container .article-share{
                    color: #b3b3b3;
                    margin-top: -3px;
                    float: right;
                    width: 8%;
                }
                .vertical-container .article-text {

                }
                .vertical-container .article-title {
                    font-size: 22px;
                    line-height: 1.2;
                    word-break: break-word;
                    color:black;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                    margin: 0px 12px 8px 12px;
                }
                .vertical-container .thumbnail {
                    background-color: #f0f0f0;
                    width: 92.5%;
                    margin-inline-start: 3.75%;
                    height: 200px;
                    margin-bottom: 12px;
                    position: relative;
                }
                .vertical-container .article-excerpt {
                    color: #363636;
                    font-size: 12.8px;
                    line-height: 1.4;
                    margin-top: 5px;
                    margin-left: 12px;
                    margin-right: 12px;
                }
                .vertical-container .article-category {
                    font-family: "SecondaryFontMedium",system-ui;
                    font-weight: 500;
                    font-size: 12px;
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    margin-left: 12px;
                    margin-right: 12px;
                    color: #A00E0E;
                }
                .vertical-container .article-date {
                    display: block;
                    font-size: 11px;
                    color: #737373;
                    font-style: normal;
                    line-height: 1.1;
                    margin-left:12px;
                }

                .vertical-slider-container {
                    margin-inline-start: 0;
                    background-color: #333;
                    min-height: 233px;
                    width: 190px;
                    flex: none;
                    white-space: normal;
                    vertical-align: top;
                    text-overflow: ellipsis;
                    border-width: 1px;
                    border-color: rgba(0,0,0,0.08);
                    position: relative;
                    overflow: hidden;
                    margin: 0;
                    border: 0;
                    display: inline-block;
                    box-sizing: border-box;
                }
                .vertical-slider-container .article-share{
                    color: #b3b3b3;
                    margin-top: -3px;
                    float: right;
                    width: 8%;
                }
                .vertical-slider-container .article-text {

                }
                .vertical-slider-container .article-title {
                    margin-left: 10px;
                    margin-right: 10px;
                    font-size: 13.6px;
                    line-height: 1.3;
                    margin-bottom: 10px;
                    color: #fff;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    font-family: "MainFont",system-ui;
                    letter-spacing: 0;
                }
                .vertical-slider-container .thumbnail {
                    height: 160px;
                    width: 100%;
                    display: block;
                    margin-bottom: 8px;
                    position:relative;
                }
            `}</style>
        </article>
    )
}