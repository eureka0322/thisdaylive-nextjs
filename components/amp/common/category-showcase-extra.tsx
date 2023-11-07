import Link from 'next/link'
import AmpArticle  from './article';
import  {getCategoryLink} from '../../../lib/utils'
import { IPostInfo } from '../../../lib/types';

interface Props {
    postsList: IPostInfo[],
    term: string
}

export default function AmpCategoryShowcaseExtra({postsList, term}: Props) {
    const postFirstVertical = postsList.length >= 1 ? postsList.slice(0, 1)[0]: null;
    const postsFirstList = postsList.length >= 5 ? postsList.slice(1, 5) : [];

    return (
        <section className="category-showcase">
            <div className="header">
                <div className="title-container">
                    <h2 className="title">{term}</h2>
                </div>
            </div>
            {postFirstVertical != null ? (
                <AmpArticle post={postFirstVertical} category={null} options={
                    {
                        layout :'vertical',
                        showImage : true,
                        imageSize: 'full',
                        headingSize: '',
                        showPostMeta: false,
                        dateStyle: 'full',
                        showExcerpt: false
                    }
                }/>
                ) : (<></>)
            }
            {postsFirstList.length > 0 ? (
                postsFirstList.map((post, index) => (
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
                .category-showcase {
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
