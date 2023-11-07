import { useEffect } from 'react';
import AmpCategoryMenu from './category-menu';
interface Props {
    activeCategory: string, 
}
export default function AmpHeaderBar({activeCategory}: Props) {

    return (
        <div>
            <header id="amp-mobile-header">
                <div className="topnav">
                    <button on="tap:sidebar.toggle" className="sidebar-trigger"> ☰</button>
                    <div className="logo-container">
                        <amp-img  src="/this-day-live-logo-dark.png" width="107" height="26" className="image"> </amp-img>
                    </div>
                </div>
                <div className="category-menu">
                    <AmpCategoryMenu activeCategory={activeCategory}/>
                </div>
            </header>
            <style jsx>{`
                #amp-mobile-header {
                    display: block;
                    width: 100%;
                    position: fixed;
                    top: 0;
                    z-index: 10;
                    outline: none;
                    background-color: #121212;
                }
                .topnav {
                    height:50px;
                    width:100%;
                    position:relative;
                }
                .category-menu {

                }
                .sidebar-trigger {
                    left: 5px;
                    top: 0px;
                    position: absolute;
                    background: transparent;
                    border: 0;
                    outline: none;
                    padding: 8px;
                    cursor: pointer;
                    font-size: 22px;
                    color: white;
                }
                .logo-container {
                    display:flex;
                    max-width: 70%;
                    margin: 0 auto auto;
                    align-items: center;
                    justify-content: center;
                    padding-top: 12px;
                }
                .image {
                    
                }
            `}</style>
        </div>
        
    );
};
