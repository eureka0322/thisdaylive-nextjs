import { IPostInfo } from "../../../lib/types";
import AmpArticle from "../common/article";

interface Props {
    postsList: IPostInfo[],
}
export default function AmpRelatedArticles({postsList}:Props) {
    return (
        <div className="next-articles">
        <div className="header">
            <span className="title">
                Related articles
            </span>
        </div>
        <div className="container">
            {postsList.length > 0 ? (
                postsList.map((post, index) => (
                    <div key={index} className="item">
                        <AmpArticle  post={post} category={null} options={
                            {
                                layout :'minimal-related',
                                showImage : false,
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
                font-family: "SecondaryFontMedium",system-ui;
                font-weight: 500;
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
                margin-top:1px;
                margin-bottom:3px;
            }
        `}</style>
        
    </div>
    );
}