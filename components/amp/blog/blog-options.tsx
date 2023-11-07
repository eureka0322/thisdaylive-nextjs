import Link from "next/link";
import { getAmpUrl } from "../../../lib/utils";

export default function AmpBlogOptions({nextBlogLink}) {
    return (
        <div className="blog-options">
            <div className="content">
                <div className="share-group">
                    <div className="share-button">
                        <amp-social-share layout="fixed-height" height="45" type="facebook" aria-label="Share on Facebook"  className="color-facebook" data-param-app_id="1598453280418648"></amp-social-share>
                    </div>
                    <div className="share-button">
                        <amp-social-share layout="fixed-height" height="45" type="twitter" aria-label="Share on Twitter" className="color-twitter"></amp-social-share>
                    </div>
                    <div className="share-button">
                        <amp-social-share layout="fixed-height" height="45" type="email" aria-label="Share by email" className="color-email"></amp-social-share>
                    </div>
                    <div className="share-button">
                        <amp-social-share layout="fixed-height" height="45" type="whatsapp" aria-label="Share on WhatsApp" className="color-whatsapp"></amp-social-share>
                    </div>
                    <div className="share-button">
                        <amp-social-share layout="fixed-height" height="45" type="system" aria-label="Share" className="color-system"></amp-social-share>
                    </div>
                </div>

                <div className="next-btn">
                    <Link  href={getAmpUrl(nextBlogLink)}>    
                        <div className="btn-wrapper">
                            <span className="text">
                            NEXT ARTICLE
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g id="feArrowRight0" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="feArrowRight1" fill="currentColor"><path id="feArrowRight2" d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"/></g></g></svg>
                        </div>             
                        
                    </Link>
                </div>
            </div>
            
            <style jsx>{`
                .blog-options {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    z-index: 10;
                    max-width: 100vw;
                    padding: 0;
                    left: 0;
                    outline: none;
                    height: auto;
                }
                .content {
                    background-color: #EDEDED;
                    display: flex;
                    padding: 0;
                    align-items: center;
                }
                .share-group {
                    width: 62%;
                    height:45px;
                    display: flex;
                }
                .share-button {
                    flex: 1;
                }
                .next-btn{
                    font-family: "SecondaryFontMedium",system-ui;
                    font-weight: 500;
                    width: 38%;
                    display: flex;
                    font-size: 12.56px;
                    justify-content: flex-end;
                }

                .color-facebook{
                    background-color: #1877F2;
                }
                .color-twitter{
                    background-color: #1DA1F2;
                }
                .color-email{
                    background-color: #90a9b9;
                }
                .color-whatsapp{
                    background-color: #25d366;
                }
                .color-system{
                    background-color: #E48409;
                    background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="%23fff" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"/></svg>');
                }

                .btn-wrapper {
                    color: #363636;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    width: 100%;
                }
                
            `}</style>
            

        </div>
        
    )
}