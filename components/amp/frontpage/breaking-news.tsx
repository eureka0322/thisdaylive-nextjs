import AmpArticle from '../common/article';
import { IPostInfo } from '../../../lib/types';

interface Props {
    postsList: IPostInfo[]
}

export default function AmpBreakingNews({postsList}: Props) {
    
    return (
        <section className="breaking-news">
            <div className="header">
                <div className="title-container">
                    <h2 className="title">BREAKING NEWS</h2>
                </div>
            </div>
            <div className="content">
                {postsList.length > 0 ? (
                    postsList.map((post, index) => (
                        <AmpArticle key={index} post={post} category={null} options={
                            {
                                layout :'minimal',
                                showImage : false,
                                imageSize: 'thumbnail',
                                headingSize: 'h6',
                                showPostMeta: false,
                                dateStyle: 'ago',
                                showExcerpt: false
                            }
                        }/>
                    ))
                    ) : (<></>)
                }
            </div>
            <style jsx>{`
                .breaking-news {
                    display:flex;
                    flex-direction:column;
                }
                .header {
                    margin: 16px 15px 8px;
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
                    font-size: 1em;
                    color: #000;
                    background: #c3ac13;
                    padding: 6px 10px;
                    font-family: "MainFont",system-ui;
                    text-transform: uppercase;
                    margin: 0;
                    display: inline-block;
                    overflow: visible;
                    position: relative;
                    text-align: start;
                }
                .content {
                    width: 100%;
                    height: 100%;
                    white-space: nowrap;
                    overflow-x:auto;
                    margin-left: 15px;
                }
            `}</style>
        </section>
    )
}
