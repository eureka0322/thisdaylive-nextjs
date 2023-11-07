import { IPostInfo } from '../../lib/types';
import Article  from './article';
import Slider from "react-slick";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });

interface Props {
    postsList: IPostInfo[]
}

export default function LatestHeadLines({postsList}: Props) {
    const newPostsList = postsList.slice(0, 4);
    const options = {
        dots:false,
        nav: false,
        items: 3,
        margin: 10,
        loop: true,
        responsive: {
          0: {
            items: 1
          },
          800: {
            items: 2
          },
          1000: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      };

    return (
        <div id="latest_headlines_wrapper" className="typography">
            <div className="wrapper container-fluid">
                <div className="row middle-md">
                    <div className="col-xs-12 col-md-2">
                    <h5 className="section-title">Latest Headlines</h5>
                </div>
                <div className="col-xs-12 col-md-10">
                    <OwlCarousel {...options} >
                        {newPostsList.length > 0 ? (
                        newPostsList.map((post, index) => (
                            <Article key={index} category={null} post={post} options={
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
                    </OwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    )
}
