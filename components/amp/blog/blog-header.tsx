export default function AmpBlogHeader() {
    return (
        <header className="blog-detail-header">
            <button on="tap:sidebar.toggle" className="sidebar-trigger button">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14"/></svg>
            </button>
            <button className="back-btn button" on="tap:AMP.goBack(navigate=true)">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
            </button>
            <style jsx>{`
                .blog-detail-header {
                    transition-delay: 0.25s;
                    height: 75px;
                    width: 100%;
                    outline: none;
                    -webkit-tap-highlight-color: rgba(0,0,0,0);
                    position: fixed;
                    top: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
                    z-index:10;
                }
                .button {
                    -webkit-appearance: none;
                    background: none;
                    border: 0;
                    box-sizing: content-box;
                    color: white;
                    font-size: 100%;
                    padding: 8px;
                    text-decoration: none;
                    display:flex;
                    border-radius: 24px;
                    -webkit-transition: background-color 300ms linear;
                    margin-top: 2px;
                    position: absolute;
                }
                .blog-detail-header.collapsed .button {
                    background-color: rgba(255,255,255,0.9);
                }
                .blog-detail-header.collapsed svg {
                    color:black;
                }
                .sidebar-trigger {
                    top: 0;
                    left: 5px;
                }
                .back-btn {
                    top: 0;
                    right: 0;
                    margin-right: 5px;
                }
            `}</style>
        </header>
    )
}