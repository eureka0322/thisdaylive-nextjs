import Link from "next/link"
import { getAmpUrl } from "../../../lib/utils"
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const WORDPRESS_SITE_URL = publicRuntimeConfig.WORDPRESS_SITE_URL;

export default function AmpExtraSideWidgets({html})  {
    return (
        <div >
            <div  className="iframe">
                <amp-iframe
                    width="200"
                    height="300"
                    sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                    layout="responsive"
                    frameborder="0"
                    style={{position:'absolute', border:'none', width:'100%', height:'100%', left:0, right:0, top:0, bottom:0}}
                    src="https://e.issuu.com/embed.html?backgroundColor=%23bb1c1c&amp;backgroundColorFullscreen=%23df1515&amp;d=tdla_0608_e965fc927ac928&amp;hideIssuuLogo=true&amp;showOtherPublicationsAsSuggestions=true&amp;u=thisdaylive"
                >
                </amp-iframe>
            </div>
            <div className="dynamic-sidebar-item" dangerouslySetInnerHTML={{ __html: html }}></div>
            {/* <div className="first">
                <Link href={getAmpUrl("/2023/04/21/how-ai-is-changing-the-landscape-of-content-creation")}>
                    <amp-img
                        width="150"
                        height="150"
                        layout="responsive"
                        src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/sidebarPromo_AI.png"
                    >
                    </amp-img>
                </Link>
            </div>
            <div className="second">
                <Link href={`${WORDPRESS_SITE_URL}/wp-content/uploads/EMMY_FULL_PAGE_03_01.mp4`}>
                    <amp-img
                        width="100"
                        height="74"
                        layout="responsive"
                        src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/EMMY_FULL_PAGE_03_01-1024x783.jpg"
                    >
                    </amp-img>
                </Link>
            </div>
            <div className="third">
                <Link href="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/TDSM_0521.pdf">
                    <amp-img
                        width="100"
                        height="150"
                        layout="responsive"
                        src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/TDSM_0521.jpg"
                    >
                    </amp-img>
                </Link>
            </div>
            <div className="fourth">
                <Link href="https://www.ariseplay.com/article-detail/105">
                    <amp-img
                        width="150"
                        height="150"
                        layout="responsive"
                        src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/Arise-Play-Tems.jpeg"
                    >
                    </amp-img>
                </Link>
            </div>
            <div className="fifth">
                <Link href="https://mdx-i.com/contact-us/">
                    <amp-img
                        width="150"
                        height="150"
                        layout="responsive"
                        src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/MainOne-032423.jpeg"
                    >
                    </amp-img>
                </Link>
            </div> */}
            <style jsx global>{`
                .dynamic-sidebar-item img{
                    max-width: 100%;
                    height: auto;
                    margin-bottom: 0;
                    vertical-align: top;
                }
                .dynamic-sidebar-item .sidebar-widget {
                    display: block;
                }
                .dynamic-sidebar-item figure{
                    margin: 0px;
                    padding: 15px;
                    border-top: 1px solid #e4e4e4;
                    text-align:center;
                }
                .iframe {
                    position:relative;
                    height:250px;
                }
            `}</style>
            
        </div>
    )
}