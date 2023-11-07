import { IPostInfo } from '../../../lib/types';
import AmpArticle  from '../common/article';

interface Props {
    postsList: IPostInfo[]
}

export default function AmpLatestHeadLines({postsList}: Props) {
    const newPostsList = postsList.slice(0, 4);

    return (
        <section className="latest-headlines">
            <div className="header">
                <div className="title-container">
                    <h2 className="title">Latest Headlines</h2>
                </div>
            </div>
            <div className="content">
                {newPostsList.length > 0 ? (
                    newPostsList.map((post, index) => (
                        <AmpArticle key={index} post={post} category={null} options={
                            {
                                layout :'slider',
                                showImage : true,
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
                .latest-headlines {
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
                .content{
                    display: flex;
                    flex-wrap: nowrap;
                    overflow-x: auto;
                }
            `}</style>
        </section>
    )
}
