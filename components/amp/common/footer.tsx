export default function AmpFooter() {

    return (
        <>
            <footer id="amp-mobile-footer">
                <div className="content">
                    <amp-img  src="/this-day-live-logo.png" width="121" height="29" className="image"> </amp-img>
                    <div className="text">
                        <p>
                        Founded on January 22, 1995, THISDAY is published by THISDAY NEWSPAPERS LTD., 35 Creek Road Apapa, Lagos, Nigeria with offices in 36 states of Nigeria , the Federal Capital Territory and around the world. It is Nigeria's most authoritative news media available on all platforms for the political, business, professional and diplomatic elite and broader middle classes while serving as the meeting point of new ideas, culture and technology for the aspirationals and millennials. The newspaper is a public trust dedicated to the pursuit of truth and reason covering a range of issues from breaking news to politics, business, the markets, the arts, sports and community to the crossroads of people and society.
                        </p>
                    </div>
                </div>
                
            </footer>
            <style jsx>{`
                #amp-mobile-footer {
                    height: auto;
                    box-sizing: border-box;
                    position: relative;
                    border: 0;
                    border-bottom: 4px solid;
                    border-image: linear-gradient(to right, #ff991f 0%, #94d042 100%) 1;
                }
                .content {
                    padding: 30px 15px;
                    background: #A00E0E;
                    margin-top: 26px;
                    text-align: center;
                }
                .image {

                }
                .text {
                    text-align: center;
                }
                .text p {
                    font-size: .8em;
                    color: #fff;
                }
            `}</style>
        </>
        
    );
};
