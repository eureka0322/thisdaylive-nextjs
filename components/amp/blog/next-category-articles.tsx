import { IPostInfo } from "../../../lib/types";
import AmpArticle from "../common/article";

interface Props {
    categoryName: string,
    postsList: IPostInfo[],
}
export default function AmpNextCategoryArticles({categoryName, postsList}:Props) {
    return (
        <div className="next-category-articles">
            <div className="header">
                <span className="title" dangerouslySetInnerHTML={{ __html: categoryName }}>
                </span>
            </div>
            <div className="container">
                {postsList.length > 0 ? (
                    postsList.map((post, index) => (
                        <div key={index} className="item">
                            <AmpArticle  post={post} category={null} options={
                                {
                                    layout :'vertical-slider',
                                    showImage : true,
                                    imageSize: 'medium',
                                    headingSize: '',
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
            <style jsx>{`
                .header {
                    margin: 16px 0 8px;
                    overflow: hidden;
                }
                .title {
                    margin: 0;
                    padding-inline-end: 10px;
                    font: 1em "SecondaryFont",system-ui;
                    display: inline-block;
                    overflow: visible;
                    position: relative;
                    text-align: start;
                    font: 21.6px "MainFont",system-ui;
                    line-height: 1.305;
                    font-weight: bold;
                    color: #222222;
                }
                .title:after {
                    background: #000;
                    left: 100%;
                    content: "";
                    display: block;
                    height: 2px;
                    position: absolute;
                    top: 50%;
                    width: 100vw;
                    pointer-events: none;
                }
                .container{
                    display: flex;
                    flex-wrap: nowrap;
                    overflow-x: auto;
                }
                .container .item {
                    margin-right:5px;
                }
            `}</style>
            
        </div>
    );
}