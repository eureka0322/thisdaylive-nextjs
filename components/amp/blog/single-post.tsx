import { INextCategoryPost, IPostData, IPostInfo } from "../../../lib/types";
import AmpScript from "../AmpScript";
import AmpNextArticles from "./next-articles";
import AmpNextCategoryArticles from "./next-category-articles";
import AmpRelatedArticles from "./related-articles";
import AmpBlogOptions from "./blog-options";
import striptags from 'striptags';
import AmpButtonToTop from "../common/btn-to-top";
import getConfig from "next/config";
import cheerio from 'cheerio';

const { publicRuntimeConfig } = getConfig();
const SITE_URL = publicRuntimeConfig.SITE_URL;

interface Props {
    post: IPostData,
    categoryName: string,
    nextPosts: IPostInfo[],
    nextCategoryPosts: INextCategoryPost[],
    relatedPosts: IPostInfo[],
    commentsCount: number
}
export default function AmpSinglePost({
    post, 
    categoryName, 
    nextPosts, 
    nextCategoryPosts, 
    relatedPosts, 
    commentsCount}: Props) {

    const getReadingTime = (htmlString) => {
        const plainText = striptags(htmlString);
        const words = plainText.split(/\s+/);
        const wordCount = words.length;
        return Math.ceil(wordCount / 250);
    }
    const getAmpContentData = (content) => {
        const $ = cheerio.load(content);

        $('img').each((index, element) => {
            const src = $(element).attr('src');
            if (!src || src === '') {
                $(element).remove();
            }
            else{
                const width = $(element).attr('width');
                const height = $(element).attr('height');

                const ampImg = $('<amp-img>');
                ampImg.attr('src', src);
                ampImg.attr('layout', 'responsive');

                if(width && height){
                    ampImg.attr('width', width);
                    ampImg.attr('height', height);
                }
                else{
                    ampImg.attr('width', '1');
                    ampImg.attr('height', '1');
                }
                

                $(element).replaceWith(ampImg);
            }
        });

        return $.html();
    }
    return (
        <div className="blog">
            <AmpButtonToTop anchor="blog-anchor-top"/>

            
                {post.thumbnail !='' &&
                (
                    <span className="image">
                    <amp-img 
                        className="thumbnail-image"
                        width="150"
                        height="150"
                        layout="fill"
                        object-fit="cover"
                        src={post.thumbnail}>

                    </amp-img>
                    </span>
                )
                }

            
            <div className="decorator">
                <div className="readingTime">
                    <span className="readingTime-number">
                    {getReadingTime(post.content)}'
                    </span>
                    <svg className="readingTime-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="8" r="5.5"/><path d="M5.5.5h3M7 .5v2M5.5 6L7 8h2.5M12 2l1 1M2 2L1 3"/></g></svg>
                </div>
            </div>
            <div className="detail-body">
                <h1 className="title" dangerouslySetInnerHTML={{ __html: post.title }}></h1>
                <div className="meta">
                    <span className="category">
                        {categoryName}
                    </span> | 
                    <span className="date-container">
                        
                        <span className="date">
                        <amp-timeago
                            layout="responsive"
                            width="160"
                            height="20"
                            datetime={`${post.date}+01:00`}
                            locale="en"
                        >
                            {post.date}
                        </amp-timeago>
                        </span>
                        </span>
                </div>
                <div className="content" dangerouslySetInnerHTML={{ __html: getAmpContentData(post.content) }}>
                </div>
            </div>
            <div className="extra">
                <div className="extra--wrapper">
                    <AmpScript
                        id="comment-header-script"
                        layout="container"
                        script="
                        const btn = document.getElementById('comment-header-btn');
                        btn.addEventListener('click', () => {
                            const container = document.getElementById('disque-comments');
                            if(container.classList.value.includes('collapsed')){
                                container.classList.remove('collapsed');
                            }
                            else{
                                container.classList.add('collapsed');
                            }
                        })"
                    >
                        <div id="disque-comments" className="disque-comments collapsed">
                            <button id="comment-header-btn" className="header">
                                <div className="title">
                                    <svg className="comment-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M9 22a1 1 0 0 1-1-1v-3H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29H9Z"/></svg>
                                    <span>{commentsCount > 0 ? commentsCount : ''} Comments</span>
                                </div>
                                <div className="icon-dir">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                                    </div>
                                </div>
                            </button>
                            <div  className="iframe">
                                <amp-iframe
                                    width="200"
                                    height="300"
                                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
                                    layout="responsive"
                                    frameborder="0"
                                    src={`https://live.mrf.io/statics/marfeel/comments/disqus.html?url=${SITE_URL}${post.url}&identifier=${SITE_URL}${post.url}&shortname=tdaylive&title=${post.title}&linkColor=rgb(0, 0, 0)&fontFamily=SecondaryFont, system-ui`}
                                >
                                </amp-iframe>
                            </div>
                            
                        </div>
                    </AmpScript>
                    <div style={{padding:'0px 15px'}}>
                        <AmpNextArticles postsList={nextPosts}/>
                        {nextCategoryPosts.length > 0 ? (
                            nextCategoryPosts.map((item, index) => (
                                <AmpNextCategoryArticles key={index} categoryName={item.categoryName} postsList={item.posts} />
                            ))
                            ) : (<></>)
                        }
                        <AmpRelatedArticles postsList={relatedPosts} />
                        
                    </div>
                </div>
            </div>
            <AmpBlogOptions nextBlogLink={nextPosts.length > 0 ? nextPosts[0].url: ""}/>
            <style jsx>{`
                .blog{
                    font-size: 18px;
                    color: #4f4f4f;
                }
                .image {
                    padding-bottom: 67.27664%;
                    margin: 0;
                    position: relative;
                    height: 0;
                    width: auto;
                    display: block;
                    clear: both;
                }
                .thumbnail-image {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    top: 0;
                    left: 0;
                }
                .thumbnail-image:after {
                    content: "";
                    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
                    height: 75px;
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                }
                .decorator {
                    width: 100%;
                    box-sizing: border-box;
                    min-height: 40px;
                    margin-top: -40px;
                    overflow: hidden;
                    position: relative;
                    pointer-events: none;
                }
                .readingTime {
                    float: right;
                    padding-right: 15px;
                    text-align: right;
                }
                .readingTime-number{
                    font: 500 20px "SecondaryFontMedium",system-ui;
                    color: #fff;
                    display: inline-block;
                    vertical-align: middle;
                }
                .readingTime-icon {
                    height: 20px;
                    width: 20px;
                    vertical-align: text-bottom;
                    padding-inline-start: 5px;
                    color: #fff;
                }
                .detail-body{
                    padding: 15px 15px 24px;
                    overflow-x: visible;
                    width: 100%;
                    box-sizing: border-box;
                }
                .detail-body .title{
                    font: 25.875px "MainFont",system-ui;
                    line-height: 1.305;
                    color: #363636;
                    padding: 0;
                    margin: 0 0 10px;
                    font-size: 25.6px;
                    font-weight:bold;
                }
                .detail-body .meta{
                    font-size: 13px;
                    color: #737373;
                    font-style: normal;
                    margin-bottom: 15px;
                }
                .detail-body .meta .category {
                    font-size: 13px;
                    color: #A00E0E;
                }
                .detail-body .meta .date {
                    font-size: 13px;
                    color: #737373;
                    font-style: normal;
                }
                .detail-body .date-container{
                    margin-left: 4px;
                }
                .detail-body .date-container .date{
                    display:inline-flex;
                }

                .extra {
                    width:100%;

                }
                .extra-wrapper {
                    padding:0 15px;
                }
                .disque-comments.collapsed {
                    height: 60px;
                    overflow: hidden;
                }
                .disque-comments .header {
                    background: none;
                    border: 0;
                    color: #444;
                    position: absolute;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    height: 60px;
                    padding: 0 15px;
                    background-color: #ededed;
                    box-sizing: border-box;
                    font-size: 1.125rem;
                }

                .disque-comments .title {
                    display: block;
                    color: #444;
                    line-height: 20px;
                    font-size: 0.8em;
                }
                .disque-comments .icon-dir{

                }
                .disque-comments.collapsed .icon-dir{
                    transform: rotateZ(180deg);
                }
                .disque-comments .iframe {
                    padding-top:70px;
                }
                .disque-comments .comment-icon {
                    vertical-align:middle;
                    margin-right:5px;
                }
              `}</style>
        </div>
    )
}