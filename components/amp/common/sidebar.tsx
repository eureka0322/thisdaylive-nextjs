import Link from 'next/link';
import { categoriesMenuForMobile, getAmpUrl, getCategoryLink } from '../../../lib/utils';
import AmpScript from '../AmpScript';
interface Props {
    activeCategory: string, 
}

export default function AmpSideBar({activeCategory}: Props)  {
    return (
        <div>
        <amp-sidebar id="sidebar" className="sidebar" layout="nodisplay">
                <AmpScript
                    id="sidebar-searchform-script"
                    layout="container"
                    script="
                    const btnshowsearchform = document.getElementById('show-searchform-btn');
                    btnshowsearchform.addEventListener('click', () => {
                        const form = document.getElementById('searchForm');
                        form.classList.add('active');
                    });
                    const btnhidesearchform = document.getElementById('hide-searchform-btn');
                    btnhidesearchform.addEventListener('click', () => {
                        const form = document.getElementById('searchForm');
                        form.classList.remove('active');
                    });
                    const btnsearch = document.getElementById('search-btn');
                    btnsearch.addEventListener('click', () => {
                        const value = document.getElementById('search-value').value;
                        console.log(value);
                        window.location.href='/asdf';
                    });
                    "
                >
                    <>
                    <div className="logo-container">
                        <amp-img
                        width="103"
                        height="25"
                            src="/this-day-live-logo-dark.png"
                        >
                        </amp-img>
                        <button id="show-searchform-btn" className="search-btn button">
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                        </button>
                    </div>
                    <div id="searchForm" className="searchForm">
                        {/* <button id="search-btn" className="search-btn button">
                            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                        </button>
                        <input id="search-value" className="search-input" type="text" name="s" placeholder="Search"/>
                        <button id="hide-searchform-btn" className="back-btn button" on="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                        </button> */}
                        <form method="GET" action="/search" target="_top" className="form-container">
                            <button className="search-btn button" type="submit">
                                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                            </button>
                            <input type="text" id="srchInput" name="s"/>
                            <button id="hide-searchform-btn" className="back-btn button" on="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                            </button>
                        </form>
                    </div>
                    </>
                    
                </AmpScript>

            {/* <div className="logo-container">
                <amp-img
                width="103"
                height="25"
                    src="/this-day-live-logo-dark.png"
                >
                </amp-img>
                <button className="search-btn button">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                </button>
            </div>
            <div className="searchForm">
                <button className="search-btn button">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"/></svg>
                </button>
                <input className="search-input" type="text" name="s" placeholder="Search"/>
                <button className="back-btn button" on="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
                </button>
            </div> */}

            <ul className="menu">
                {categoriesMenuForMobile.map(cat => {
                    return (
                        <li key={cat.slug} className={activeCategory == cat.slug ? "active" : ""}>
                        <Link href={getAmpUrl(cat.slug != 'home' ? getCategoryLink(cat.slug) : '/')} className="link">
                            <div className="title">
                                <span>{cat.title}</span>
                            </div>
                        </Link>
                        </li>
                    );
                })}
            </ul>
        </amp-sidebar>
        <style jsx global>{`
            .sidebar {
                background-color:rgb(18, 18, 18)
            }
            .sidebar .menu {
                list-style: none;
                position: relative;
                padding: 0;
                margin: 0;
            }
            .sidebar .menu .link {
                text-decoration: none;
                -webkit-appearance: none;
                border: 0;
                box-sizing: content-box;
                font-family: inherit;
                font-size: 100%;
                padding: 0;
                text-align: inherit;
                text-decoration: none;
                text-transform: inherit;
            }
            .sidebar .menu li {
                border: 0;
                text-transform: uppercase;
                overflow: hidden;
            }
            
            .sidebar .menu .title {
                box-sizing: border-box;
                color: #5C5B5B;
                padding: 15px;
                margin: 0;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                letter-spacing: 1px;
                font: 300 0.875em "SecondaryFont",system-ui;
            }

            .sidebar .menu li.active .title {
                background: #a20909;
                color: white;
                font-weight: bold;
            }

            .sidebar .logo-container {
                width: 280px;
                height: 50px;
                box-sizing: border-box;
                border-bottom: 1px solid transparent;
                padding: 15px;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .search-icon{
                color:white;
            }
            

            .searchForm {
                background-color: #121212;
                height: 50px;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                pointer-events: auto;
                display: grid;
                grid-template-columns: auto 1fr auto;
                align-items: center;
                visibility: hidden;
            }

            .button {
                -webkit-appearance: none;
                background: none;
                border: 0;
                box-sizing: content-box;
                color: inherit;
                font-family: inherit;
                font-size: 100%;
                text-align: inherit;
                text-decoration: none;
                text-transform: inherit;
                padding: 0px;
            }

            .searchForm  .button {
                padding: 8px;
            }

            .searchFrom .search-input {
                font: 300 16px "SecondaryFont",system-ui;
                box-sizing: border-box;
                border: 0;
                -webkit-appearance: none;
                outline: none;
                width: 100%;
            }
            .searchForm.active{
                visibility: visible;
            }
            .form-container {
                display: grid;
                grid-template-columns: auto 1fr auto;
                -webkit-box-align: center;
                -webkit-align-items: center;
                align-items: center;
            }
            
        `}</style>
        </div>
        
    );
};
