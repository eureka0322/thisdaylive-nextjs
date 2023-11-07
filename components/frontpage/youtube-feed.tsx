import { YOUTUBE_ARISECHANEEL_URL } from "../../lib/constants";
import { IYoutubeFeedData } from "../../lib/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image from 'next/image';
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });
interface Props {
    feedData: IYoutubeFeedData
}

export default function YoutubeFeed({feedData}: Props) {
    const [itemHeight, setItemHeight] = useState(150);
    
    const {channel, videos} = feedData;
    const options = {
        nav: true,
        navElement: 'div',
        items: 3,
        margin: 10,
        responsive: {
          0: {
            items: 1
          },
          500: {
            items: 2
          },
          800: {
            items: 3
          }
        },
        stageClass: 'sby-owl-stage',
        stageOuterClass: 'sby-owl-stage-outer',
        navContainerClass: 'sby-owl-nav',
        navClass: ['sby-owl-prev','sby-owl-next'],
        dotsClass:'sby-owl-dots',
        dotClass: 'sby-owl-dot',
        className: 'owl-theme sby_items_wrap sby_carousel sby-owl-loaded sby-owl-drag' ,
        style: {padding: '5px', display: 'block'},
        navText: [
            '<svg class="svg-inline--fa fa-chevron-left fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="chevron-left" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>',
            '<svg class="svg-inline--fa fa-chevron-right fa-w-10" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="chevron-right" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>',
          ],

      };

    return (
        <>
        <div className="section-heading">
            <h2 className="title">
                <span>Latest Videos from Arise News</span>
            </h2>
            <div className="cat-link">
                <a href={YOUTUBE_ARISECHANEEL_URL}>View all <i className="fa-solid fa-arrow-right-from-bracket"></i></a>
            </div>
        </div>
        <div id="sb_youtube_sbyUCyEJXkSj0kOOCS7Qlq2G7g6" className="sb_youtube sby_layout_carousel sby_col_3 sby_mob_col_2 sby_width_resp sby_medium" data-feedid="sby_UCyEJX-kSj0kOOCS7Qlq2G7g#6" data-shortcode-atts="{}" data-cols="3" data-colsmobile="2" data-num="6" data-nummobile="6" data-options="{&quot;carousel&quot;:[true,true,false,false,true,1],&quot;cta&quot;:{&quot;type&quot;:&quot;related&quot;,&quot;defaultPosts&quot;:[],&quot;defaultLink&quot;:&quot;&quot;,&quot;defaultText&quot;:&quot;Learn More&quot;,&quot;openType&quot;:&quot;same&quot;,&quot;color&quot;:&quot;&quot;,&quot;textColor&quot;:&quot;&quot;},&quot;descriptionlength&quot;:150}" data-sby-flags="checkWPPosts,resizeDisable" data-postid="148" data-sby-supports-lightbox="1" style={{width: '100%'}} data-sby-index="1">
            <div className="sb_youtube_header ">
                <a href={channel.url} target="_blank" rel="noopener" title="@Arise News" className="sby_header_link">
                    <div className="sby_header_text sby_no_bio sby_has_sub">
                        <h3>Arise News</h3>
                        <span className="sby_subscribers">{channel.subscriberCount} subscribers</span>
                    </div>
                    <div className="sby_header_img" data-avatar-url="https://yt3.ggpht.com/ytc/AGIKgqMqqv-9zvynCMkviFKOTpJ_R6QD6jfB23g3cIiuYg=s88-c-k-c0x00ffffff-no-rj">
                        <div className="sby_header_img_hover">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="sby_new_logo svg-inline--fa fa-youtube fa-w-18">
                            <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" className=""></path>
                        </svg>
                        </div>
                        <img src="https://yt3.ggpht.com/ytc/AGIKgqMqqv-9zvynCMkviFKOTpJ_R6QD6jfB23g3cIiuYg=s88-c-k-c0x00ffffff-no-rj" alt="Arise News" width="50" height="50"/>
                    </div>
                </a>
            </div>
            <OwlCarousel {...options} >
                {videos.map((video, index) => (
                        <div key={index} className="sby-owl-item">
                        <div className="sby_item sby_no_margin" style={{padding: '5px'}}>
                            <div className="sby_inner_item">
                                <div className="sby_video_thumbnail_wrap sby_item_video_thumbnail_wrap" style={{paddingTop: 'calc(100% / 1.77)'}}>
                                    <a href={video.url} target="_blank" className="sby_video_thumbnail sby_item_video_thumbnail sby_imgLiquid_bgSize sby_imgLiquid_ready" style={{ width: '100%', height: '100%', position: 'absolute', left: '0px', top: '0px'}}>
                                        <Image src={video.thumbnail} alt={video.description} fill style={{objectFit:'cover'}}/>

                                        <div className="sby_thumbnail_hover sby_item_video_thumbnail_hover">
                                            <div className="sby_thumbnail_hover_inner">
                                                <p className="sby_caption">
                                                    <span dangerouslySetInnerHTML={{ __html: video.description }}/>
                                                    </p>
                                                <p className="sby_stats">
                                                    <span className="sby_likes">
                                                    <svg style={{marginRight: '2px'}} className="svg-inline--fa fa-heart fa-w-18" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="heart" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                        <path fill="currentColor" d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"></path>
                                                    </svg>
                                                    <span className="sby_like_count">{video.likeCount}</span>
                                                    </span>
                                                    <span className="sby_comments">
                                                    <svg style={{marginRight: '2px'}}  className="svg-inline--fa fa-comment fa-w-18" aria-hidden="true" data-fa-processed="" data-prefix="fa" data-icon="comment" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                        <path fill="currentColor" d="M576 240c0 115-129 208-288 208-48.3 0-93.9-8.6-133.9-23.8-40.3 31.2-89.8 50.3-142.4 55.7-5.2.6-10.2-2.8-11.5-7.7-1.3-5 2.7-8.1 6.6-11.8 19.3-18.4 42.7-32.8 51.9-94.6C21.9 330.9 0 287.3 0 240 0 125.1 129 32 288 32s288 93.1 288 208z"></path>
                                                    </svg>
                                                    <span className="sby_comment_count">{video.commentCount}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <span className="sby-screenreader">YouTube Video </span>
                                        <div className="sby_play_btn">
                                            <span className="sby_play_btn_bg"></span>
                                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-youtube fa-w-18">
                                                <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" className=""></path>
                                            </svg>
                                        </div>
                                        <span className="sby_loader sby_hidden" style={{backgroundColor: 'rgb(255, 255, 255)'}}></span>
                                    </a>
                                </div>
                                <div className="sby_info sby_info_item" style={{display: 'block'}}>
                                    <p className="sby_video_title_wrap">
                                    <span className="sby_video_title" dangerouslySetInnerHTML={{ __html: video.title }}/>
                                    </p>
                                    <p className="sby_meta" style={{wordBreak: 'break-all'}}>
                                    <span className="sby_username_wrap">
                                    <span className="sby_username">{video.username}</span>
                                    </span>
                                    <span className="sby_view_count_wrap">
                                    <span className="sby_view_count"> {video.viewCount} views</span>
                                    </span>
                                    <span className="sby_date_wrap">
                                    <span className="sby_date sby_live_broadcast_type_none">{video.date}</span>
                                    </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                        ))}
            </OwlCarousel>
            <div className="sby_footer">
                <span className="sby_follow_btn sby_custom">
                    <a href={channel.url} style={{background: 'rgb(0,0,0)', color: 'rgb(255,255,255)'}} target="_blank" rel="noopener">
                        <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-youtube fa-w-18">
                        <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" className=""></path>
                        </svg>
                        Subscribe
                    </a>
                </span>
            </div>
            <div className="sby_cta_items_wraps sby_cta_wrap">
                <div className="sby_cta_inner_wrap">
                </div>
            </div>
            </div>
        </>
    )
}