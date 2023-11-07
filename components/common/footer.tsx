import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div id="site_footer" className="typography">
      <div className="wrapper container-fluid">
        <div className="row py-7 between-sm">
          <div className="col-xs-12 col-sm-4">
            <div className="footer-widget">
              <Image width={545} height={121} src="https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/2022/02/f15e7f8e-this-day-live-logo.png" className="image wp-image-606049 this-day-logo attachment-full size-full" alt="ThisDayLive" />
            </div>
            <div className="footer-widget">			
              <div className="textwidget">
                <p>Founded on January 22, 1995, THISDAY is published by THISDAY NEWSPAPERS LTD., 35 Creek Road Apapa, Lagos, Nigeria with offices in 36 states of Nigeria , the Federal Capital Territory and around the world. It is Nigeria’s most authoritative news media available on all platforms for the political, business, professional and diplomatic elite and broader middle classes while serving as the meeting point of new ideas, culture and technology for the aspirationals and millennials. The newspaper is a public trust dedicated to the pursuit of truth and reason covering a range of issues from breaking news to politics, business, the markets, the arts, sports and community to the crossroads of people and society.</p>
              </div>
          </div>
          </div>

          <div className="col-xs-6 col-sm-3">
          </div>

          <div className="col-xs-6 col-sm-3">
          </div>

          <div className="col-xs-6 col-sm-2">
            <div className="footer-widget">
              <div className="section-heading">
                <h4 className="title"><span>Helpful Links</span></h4>
              </div>
              <div className="menu-helpful-links-container">
                <ul id="menu-helpful-links" className="menu">
                  <li id="menu-item-606050" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-148 current_page_item menu-item-606050">
                    <Link href="/" aria-current="page">Home</Link>
                  </li>
                  <li id="menu-item-606051" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-606051">
                    <Link href="/about-us/">About Us</Link>
                    </li>
                  <li id="menu-item-606052" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-606052">
                    <Link rel="/privacy-policy" href="/privacy-policy/">Privacy Policy</Link>
                    </li>
                  <li id="menu-item-606053" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-606053">
                    <Link href="/terms-conditions/">Terms &amp; Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="widget_text footer-widget">
                <div className="section-heading">
                  <h4 className="title"><span>Contact Us</span></h4>
                </div>
                <div className="textwidget custom-html-widget">
                  <p>You can email us at: hello@thisdaylive.com or visit our <Link href="/contact-us/">contact us</Link> page.</p>
                  <p className="mb-3"><Link className="has-white-color" target="_blank" href="http://www.facebook.com/thisdaylive" rel="noopener"><i className="fab fa-facebook-f mr-1 fa-2x"></i></Link><Link className="has-white-color" target="_blank" href="http://www.twitter.com/thisdaylive" rel="noopener"><i className="fab fa-twitter mr-1 fa-2x"></i></Link></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
