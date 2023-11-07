import Link from 'next/link';
import {getCategoryLink} from '../../lib/utils';
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { setAccountSettingTheme, setSearchBarToggle } from "../../store/actions/accountAction";
import {IReduxState} from '../../lib/types';

interface Props {
    nowDateString: string
}

export default function MastHead({nowDateString}: Props) {
    const dispatch = useDispatch();
    const accountData = useSelector((state:IReduxState) => state.account);
    const toggleTheme = () => {
        var nextTheme :string = "";
        if(accountData.theme == "light")
            nextTheme = "dark";
        else
            nextTheme = "light";

        dispatch<any>(setAccountSettingTheme(nextTheme));
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
    const toggleMenu = () => {
        document.body.classList.add("mm-wrapper_opened","mm-wrapper_blocking","mm-wrapper_background", "mm-wrapper_opening");
        document.getElementById('slide_menu').classList.add("mm-menu_opened");
        document.getElementById('memenu_trigger').classList.add("active");
    }
    return (
        <div id="masthead" className="header-height">
            <div id="masthead_main_wrapper">
                <div className="wrapper container-fluid">
                    <div className="flex-container">
                        <div className="flex-item">
                            <ul className="align-left">
                                <li>
                                    <a href="#" id="memenu_trigger" className="menu-button-container overlayTrigger" onClick={toggleMenu}>
                                        <span className="top"></span>
                                        <span className="middle"></span>
                                        <span className="bottom"></span>
                                    </a>
                                </li>
                                <li>
                                    <span className="todays-date hide-for-sm-down">{nowDateString}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-spacer"></div>
                        <div className="flex-item logo-cont">
                            <Link  href="/" className="site-logo">
                            </Link>
                        </div>
                        <div className="flex-spacer"></div>
                        <div className="flex-item end-xs">
                            <ul className="align-right">
                                <li className="social">
                                    <Link target="_blank" href="http://www.facebook.com/thisdaylive">
                                        <i className="fa-brands fa-facebook-square"></i>
                                    </Link>
                                </li>
                                <li className="social">
                                    <Link target="_blank" href="http://www.twitter.com/thisdaylive">
                                        <i className="fa-brands fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                <a href="#" className="theme-switch" onClick={toggleTheme}></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="masthead_menu_wrapper">
                <div className="wrapper container-fluid">
                    <ul className="main-menu">
                    <li id="menu-item-606048" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item menu-item-606048">
                        <Link href="/">Home</Link>
                    </li>
                    <li id="menu-item-606039" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606039">
                        <Link href={getCategoryLink('business')}>Business</Link>
                    </li>
                    <li id="menu-item-606040" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606040">
                        <Link href={getCategoryLink('politics')}>Politics</Link>
                    </li>
                    <li id="menu-item-606041" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606041">
                        <Link href={getCategoryLink('nigeria')}>Nigeria</Link>
                    </li>
                    <li id="menu-item-759831" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children menu-item-759831">
                        <Link href={getCategoryLink('international')}>International</Link>
                        <ul className="sub-menu">
                        <li id="menu-item-759834" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-759834">
                            <Link href={getCategoryLink('africa')}>Africa</Link>
                        </li>
                        <li id="menu-item-759837" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-759837">
                            <Link href={getCategoryLink('rest-of-the-world')}>Rest of the World</Link>
                        </li>
                        </ul>
                    </li>
                    <li id="menu-item-606042" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606042">
                        <Link href={getCategoryLink('health')}>Health &amp; Wellbeing</Link>
                    </li>
                    <li id="menu-item-606043" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606043">
                        <Link href={getCategoryLink('education')}>Education</Link>
                    </li>
                    <li id="menu-item-606044" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606044">
                        <Link href={getCategoryLink('lifestyle')}>Life &amp; Style</Link>
                    </li>
                    <li id="menu-item-606045" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606045">
                        <Link href={getCategoryLink('sport')}>Sport</Link>
                    </li>
                    <li id="menu-item-606046" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606046">
                        <Link href={getCategoryLink('editorial')}>Editorial</Link>
                    </li>
                    <li id="menu-item-606047" className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-606047">
                        <Link href={getCategoryLink('backpage')}>Backpage</Link>
                    </li>
                    <li id="menu-item-606054" className="search-toggle menu-item menu-item-type-custom menu-item-object-custom menu-item-606054">
                        {/* <Link href="#" > */}
                            <i style={{cursor:'pointer'}} className="far fa-search" onClick={toggleSearchBar}></i>
                        {/* </Link> */}
                    </li>
                    </ul>
                </div>
                </div>
        </div>
    )
}
  