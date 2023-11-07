import Link from 'next/link'
import Slider from "react-slick";
import { IPostInfo } from '../../lib/types';

interface Props {
    postsList: IPostInfo[]
}

export default function BreakingNews({postsList}: Props) {
    const settings = {
        dots:false,
        arrows:false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical:true,
        autoplay:true,
        autoplaySpeed:4000
    };
    return (
        <div id="breaking_news_wrapper">
            <div className="wrapper container-fluid">
                <div className="breaking-news">
                    <div className="breaking-news-title">Breaking News</div>
                    <div className="content-area">
                         <Slider {...settings}>
                            {postsList.length > 0 ? (
                            postsList.map((post, index) => (
                                <div key={index}>
                                    <h5 className="h6 title">
                                        <Link href={post.url}>
                                            <span dangerouslySetInnerHTML={{ __html: post['title'] }}/>
                                        </Link>
                                        <span className="post-meta">
                                            <span className="date-container">
                                                <i className="fa-light fa-calendar-days"></i>
                                                <span className="date">{post['agoDate']}</span>
                                            </span>
                                        </span>
                                    </h5>
                                </div>
                            ))
                            ) : (<></>)
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}
