import AmpArticle  from '../common/article';
import { IPostInfo } from '../../../lib/types';

interface Props {
    postsList: IPostInfo[],
    title?: string,
}
export default function AmpLatestCategoryPosts({
    postsList, 
    title = "", 
    }: Props) {

    const postVertical = postsList.length >= 1 ? postsList[0]: null;
    const postsOtherList = postsList.length >= 6 ? postsList.slice(1, 6) : [];
    return (
        <section className="latest-category-posts">
            <div className="header">
                <div className="title-container">
                    <h2 className="title" dangerouslySetInnerHTML={{ __html: "Latest " + title }}></h2>
                </div>
            </div>
            {postVertical != null ? (
                <AmpArticle post={postVertical} category={null} options={
                    {
                        layout :'vertical',
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
            {postsOtherList.length > 0 ? (
                postsOtherList.map((post, index) => (
                    <AmpArticle key={index} post={post} category={null} options={
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
            
            <style jsx>{`
                .latest-category-posts {
                    display:flex;
                    flex-direction:column;
                }
                .header {
                    margin: 16px 15px 8px;
                    border-bottom: 2px solid #A4A4A4;
                }
                .title-container {
                    -webkit-appearance: none;
                    background: none;
                    border: 0;
                    box-sizing: content-box;
                    color: inherit;
                    font-family: inherit;
                    font-size: 100%;
                    padding: 0;
                    text-align: inherit;
                    text-decoration: none;
                    text-transform: inherit;
                }
                .title {
                    font-size: 1.25rem;
                    font-family: "MainFont",system-ui;
                    text-transform: uppercase;
                    color: #A4A4A4;
                    padding: 6px 0;
                    margin: 0;
                    display: inline-block;
                    overflow: visible;
                    position: relative;
                    text-align: start;
                }
            `}</style>
        </section>
    )
}
