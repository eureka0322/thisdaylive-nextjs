
import Link from 'next/link';
import  {getCategoryLink} from '../../lib/utils';
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { setSearchBarToggle } from "../../store/actions/accountAction";
import {IReduxState} from '../../lib/types';

export default function SlideMenu() {
    const dispatch = useDispatch();
    const accountData = useSelector((state:IReduxState) => state.account);

    const showSubMenu = () => {
        document.getElementById('mm-1').classList.remove("mm-hidden");
        setTimeout(() => {
            document.getElementById('mm-1').classList.add("mm-panel_opened");

            document.getElementById('panel-menu').classList.add("mm-panel_opened-parent");
            document.getElementById('panel-menu').classList.remove("mm-panel_opened");
        }, 10);

        setTimeout(() => {
            document.getElementById('panel-menu').classList.add("mm-hidden");
        }, 1000);

        document.getElementsByClassName('mm-btn_prev')[0].classList.remove("mm-hidden");

        const spanElement = document.querySelector('.mm-navbar__title span');
        spanElement.innerHTML = "International";
    }

    const showMainMenu = () => {
        document.getElementById('panel-menu').classList.remove( "mm-hidden");
        setTimeout(() => {
            document.getElementById('mm-1').classList.remove("mm-panel_opened");

            document.getElementById('panel-menu').classList.remove("mm-panel_opened-parent");
            document.getElementById('panel-menu').classList.add("mm-panel_opened");
        }, 10);


        setTimeout(() => {
            document.getElementById('mm-1').classList.add("mm-hidden");
        }, 1000);

        document.getElementsByClassName('mm-btn_prev')[0].classList.add("mm-hidden");

        const spanElement = document.querySelector('.mm-navbar__title span');
        spanElement.innerHTML = "Menu";
    }

    const toggleSearchBar = () => {
        console.log(accountData.searchbar);
        var nextToggleState: boolean = false;
        if(accountData.searchbar == false)
            nextToggleState = true;
        else
            nextToggleState = false;

        dispatch<any>(setSearchBarToggle(nextToggleState));

    }
    const hideMenu = () => {
        document.body.classList.remove("mm-wrapper_opened","mm-wrapper_blocking","mm-wrapper_background", "mm-wrapper_opening");
        document.getElementById('slide_menu').classList.remove("mm-menu_opened");
        document.getElementById('memenu_trigger').classList.remove("active");
    
      }


    return (
        <div id="slide_menu" style={{zIndex:2}} className="mm-menu mm-menu_offcanvas mm-menu_iconbar-right mm-menu_selected-hover mm-menu_selected-parent mm-menu_border-full mm-menu_pagedim-black mm-menu_shadow-page mm-menu_theme-white mm-menu_fx-menu-slide" aria-hidden="true">
            <div className="mm-navbars_top">
                <div className="mm-navbar">
                <a className="mm-btn mm-btn_prev mm-navbar__btn mm-hidden" aria-hidden="true" onClick={showMainMenu} style={{cursor: 'pointer'}}></a>
                <a className="mm-navbar__title">
                    <span>Menu</span>
                </a>
                </div>
            </div>
            <div className="mm-iconbar mm-iconbar_tabs">
                <div className="mm-iconbar__top">
                    <Link target="_blank" href="/">
                        <i className="fa fa-home fa-1x"></i>
                    </Link>
                </div>
                <div className="mm-iconbar__bottom">
                    <Link target="_blank" href="http://www.facebook.com/thisdaylive">
                        <i className="fab fa-facebook"></i>
                    </Link>
                    <Link target="_blank" href="http://www.twitter.com/thisdaylive">
                        <i className="fab fa-twitter"></i>
                    </Link>
                </div>
            </div>
            <div className="mm-panels">
                <div id="panel-menu" className="mm-panel mm-panel_opened">
                    <ul className="mm-listview">
                        <li onClick={hideMenu} className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-148 current_page_item menu-item-606048 mm-listitem mm-listitem_selected">
                        <Link href="/" className="mm-listitem__text">
                            Home
                        </Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606039 mm-listitem">
                        <Link href={getCategoryLink('business')} className="mm-listitem__text">Business</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606040 mm-listitem">
                        <Link href={getCategoryLink('politics')} className="mm-listitem__text">Politics</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606041 mm-listitem">
                        <Link href={getCategoryLink('nigeria')} className="mm-listitem__text">Nigeria</Link>
                        </li>
                        <li  className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-759831 mm-listitem">
                        <Link onClick={hideMenu} href={getCategoryLink('international')} className="mm-listitem__text">International</Link>
                        <a className="mm-btn mm-btn_next mm-listitem__btn" onClick={showSubMenu} style={{cursor: 'pointer'}}>
                            <span className="mm-counter">2</span>
                            <span className="mm-sronly">Open submenu</span>
                        </a>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606042 mm-listitem">
                        <Link href={getCategoryLink('health')} className="mm-listitem__text">Health &amp; Wellbeing</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606043 mm-listitem">
                        <Link href={getCategoryLink('education')} className="mm-listitem__text">Education</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606044 mm-listitem">
                        <Link href={getCategoryLink('lifestyle')} className="mm-listitem__text">Life &amp; Style</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606045 mm-listitem">
                        <Link href={getCategoryLink('sport')} className="mm-listitem__text">Sport</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606046 mm-listitem">
                        <Link href={getCategoryLink('editorial')} className="mm-listitem__text">Editorial</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606047 mm-listitem">
                        <Link href={getCategoryLink('backpage')} className="mm-listitem__text">Backpage</Link>
                        </li>
                        <li onClick={hideMenu} className="search-toggle menu-item menu-item-type-custom menu-item-object-custom menu-item-606054 mm-listitem">
                        
                        <div className="mm-listitem__text" style={{cursor: 'pointer'}}>
                            <i className="far fa-search" onClick={toggleSearchBar}></i>
                        </div>
                        </li>
                    </ul>
                </div>
                <div id="mm-1" className="mm-panel mm-hidden" aria-hidden="true">

                    <ul className="sub-menu mm-listview">
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-759834 mm-listitem">
                        <Link href={getCategoryLink('africa')} className="mm-listitem__text">Africa</Link>
                        </li>
                        <li onClick={hideMenu} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-759837 mm-listitem">
                        <Link href={getCategoryLink('rest-of-the-world')} className="mm-listitem__text">Rest of the World</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

