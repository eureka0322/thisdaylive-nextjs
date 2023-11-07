import Link from 'next/link';
import { categoriesMenuForMobile, getAmpUrl, getCategoryLink } from '../../../lib/utils';
interface Props {
    activeCategory: string, 
}

  
export default function AmpCategorymenu({activeCategory}:Props) {
    return (
        <div>
            <div className="category-menu">
                <ul className="menu">
                    {categoriesMenuForMobile.map(cat => {
                        return (
                            <li key={cat.slug} className={activeCategory == cat.slug ? "active" : ""}>
                            <Link href={getAmpUrl(cat.slug != 'home' ? getCategoryLink(cat.slug) : '/')}  className="link">
                                {cat.title}
                            </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <style jsx global>{`
                .category-menu {           
                    overflow-x: auto;
                }
                .category-menu .menu {
                    display: flex;
                    width: max-content;
                    margin: 0px;
                    padding: 0px;
                }
                .category-menu li {
                    color: #fff;
                    position: relative;
                    display: inline-block;
                    padding: 0 10px;
                    text-transform: uppercase;
                    font-size: 13px;
                    line-height: 34px;
                }
                .category-menu li.active {
                    color: #A00E0E;
                }
                .category-menu .link {
                    -webkit-appearance: none;
                    background: none;
                    border: 0;
                    box-sizing: content-box;
                    color: inherit;
                    font-family: inherit;
                    font-size: 100%;
                    padding: 0;
                    text-align: inherit;
                    text-decoration: none;
                    text-transform: inherit;
                }
            `}</style>
        </div>
        
    );
};
