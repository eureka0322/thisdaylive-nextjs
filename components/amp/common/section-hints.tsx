import Link from "next/link";
import { getAmpUrl, getCategoryLink } from "../../../lib/utils";

export default function AmpSectionHints({prevSection, nextSection}) {
    return (
        <div className="section-hints">
            { prevSection != null &&
                <div className="prev-section section">
                    <Link href={getAmpUrl(prevSection.categorySlug != 'home' ? getCategoryLink(prevSection.categorySlug) : '/')}>
                        <div className="container">
                            <div className="image-wrapper">
                                <amp-img 
                                    width="150"
                                    height="150"
                                    layout="fill"
                                    object-fit="cover"
                                    src={prevSection.imageUrl != '' ? prevSection.imageUrl : '/image.png' }>
                                
                                </amp-img>
                            </div>
                            
                            <div className="text-wrapper">
                                <div className="section-title">
                                    <span className="element-section" >
                                        Previous Section
                                    </span>
                                    <span className="element-title" dangerouslySetInnerHTML={{ __html: prevSection.categoryName}}>
                                    </span>
                                </div>
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"/></svg>
                            </div>
                        </div>
                        
                    </Link>
                </div>
            }
            { nextSection != null &&
                <div className="next-section section">
                    <Link href={getAmpUrl(nextSection.categorySlug != 'home' ? getCategoryLink(nextSection.categorySlug) : '/')}>
                        <div className="container">
                            <div className="image-wrapper">
                                <amp-img 
                                    width="150"
                                    height="150"
                                    layout="fill"
                                    object-fit="cover"
                                    src={nextSection.imageUrl != '' ? nextSection.imageUrl : '/image.png' }>
                                </amp-img>
                            </div>
                            <div className="text-wrapper">
                                <div className="section-title">
                                    <span className="element-section" >
                                        Next Section
                                    </span>
                                    <span className="element-title" dangerouslySetInnerHTML={{ __html: nextSection.categoryName}}>
                                    </span>
                                </div>
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"/></svg>
                            </div>
                        </div>
                        
                    </Link>
                </div>
            }
            <style jsx>{`
                .section-hints {
                    display: flex;
                    justify-content: space-between;
                    margin: 26px 0;
                    gap: 3px;
                }
                .section {
                    flex: 1
                }
                .prev-section {

                }
                .next-section {

                }
                .container {
                    display: grid;
                    grid-template: 'nextElement';
                    grid-template-rows: 150px;
                }
                .image-wrapper {
                    width:100%;
                    background-color: #f0f0f0;
                    grid-area: nextElement;
                    position: relative;
                }
                .image-wrapper:after {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    background-image: linear-gradient(right, rgba(0,0,0,0.6) 100%, transparent 100%);
                    left: 0;
                    content: "";
                    pointer-events: none;
                }
                .prev-section .text-wrapper {
                    text-align: end;
                    flex-direction: row-reverse;
                }
                .text-wrapper {
                    grid-area: nextElement;
                    display: flex;
                    align-items: center;
                    font-size: 14.4px;
                    color: #fff;
                    letter-spacing: 1px;
                }
                .section-title{
                    display: flex;
                    flex-direction: column;
                    padding: 8px;
                    position: relative;
                }
                .element-section{
                    font-family: "SecondaryFontMedium",system-ui;
                    font-weight: 500;
                }
                .element-title{
                    font-family: "SecondaryFont",system-ui;
                }
                .icon {
                    display: inline-block;
                    fill:  #fff;
                    height: 24px;
                    width: 24px;
                    vertical-align: middle;
                    z-index:1;
                }
            `}</style>
            
        </div>
    );
}