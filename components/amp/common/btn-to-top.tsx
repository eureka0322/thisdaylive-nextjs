import AmpAnimation from "../AmpAnimation";

export default function AmpButtonToTop({anchor}) {
    return (
        <div>
            <a className="target-anchor" id={anchor}></a>
                <amp-position-observer
                on="enter:hideAnim.start; exit:showAnim.start"
                layout="nodisplay">
                </amp-position-observer>
            <AmpAnimation id="showAnim" layout="nodisplay" json = {{
                    "duration": "200ms",
                    "fill": "both",
                    "iterations": "1",
                    "direction": "alternate",
                    "animations": [
                    {
                        "selector": "#scrollToTopButton",
                        "keyframes": [
                        { "opacity": "1", "visibility": "visible" }
                        ]
                    }
                    ]
            }}/>

            <AmpAnimation id="hideAnim" layout="nodisplay" json={{
                "duration": "200ms",
                    "fill": "both",
                    "iterations": "1",
                    "direction": "alternate",
                    "animations": [
                    {
                        "selector": "#scrollToTopButton",
                        "keyframes": [
                        { "opacity": "0", "visibility": "hidden" }
                        ]
                    }
                    ]
            }}/>


            <button id="scrollToTopButton" on={`tap:${anchor}.scrollTo(duration=200)`} className="scrollToTop">
                <svg className="top-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M13 20h-2V8l-5.5 5.5l-1.42-1.42L12 4.16l7.92 7.92l-1.42 1.42L13 8v12Z"/></svg>
            </button>

            <style jsx global>{`
                .scrollToTop {
                    color: #fff;
                    font-size: 1.4em;
                    box-shadow: 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px -1px rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    background: #fff;
                    z-index: 9999;
                    bottom: 50px;
                    right: 8px;
                    position: fixed;
                    opacity: 0;
                    visibility: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .top-icon {
                    color: #b3b3b3;
                    padding: 8px;
                }
            `}</style>
        </div>
    )
}