import {useState, useEffect} from 'react';

import React from 'react';

// import { GetStaticProps } from 'next';
import { useAmp } from 'next/amp';
import Head from 'next/head';
import AmpLayout from '../../components/amp/common/layout';
import Byline from '../../components/amp/Byline';
import AmpSideBar from '../../components/amp/common/sidebar';
import AmpHeaderBar from '../../components/amp/common/header';
import AmpBreakingNews from '../../components/amp/frontpage/breaking-news';
import { getCategories, getCategoryPosts, getCommentsCount, getFrontPageSidebarHtml, getFrontPageSidebarHtmlAmp, getLatestPosts, getPostBySlug, getSectionHintsData, getYoutubeFeed } from '../../lib/api';
import { delay, getAmpUrl, getCategoryIdFromSlug, getNowDateString, getString } from '../../lib/utils';

export const config = { amp: 'hybrid' };
import striptags from 'striptags';
import AmpSectionHints from '../../components/amp/common/section-hints';
import AmpExtraSideWidgets from '../../components/amp/common/extra-side-widgets';
import { useRouter } from 'next/router';
import moment from 'moment-timezone';
import Layout from '../../components/common/layout';
import AmpAnimation from '../../components/amp/AmpAnimation';
import AmpButtonToTop from '../../components/amp/common/btn-to-top';
import {CommentCount, DiscussionEmbed} from "disqus-react"
import AmpArticle from '../../components/amp/common/article';
import { GetServerSideProps } from 'next';
import SideBar from '../../components/common/side-bar';
import he from 'he';
import MastHead from '../../components/common/masthead';
function Test({nowDateString, query, d, postDate}) {
  const [test, setTest] = useState<string>("");
  const [ago, setAgo] = useState<string>("");

  useEffect(() => {
    const post_date = `${postDate}+01:00`;
    const d = moment().tz("Africa/Lagos").format();
    setTest(d);
    setAgo(moment(post_date).from(moment().tz("Africa/Lagos").format()));
  }, []);

    const isAmp = useAmp();
    const disqusShortname = "tdaylive"
    const disqusConfig = {
      url: "https://www.thisdaylive.com/2023/05/22/bloodbath-on-the-plateau/",
      identifier: "https://www.thisdaylive.com/2023/05/22/bloodbath-on-the-plateau/", // Single post id
      title: "bloodbath on the plateau" // Single post title
    }
    const post = {
      title: "LOTUS Bank Supports Yaba College of Technology",
      slug: "lotus-bank-supports-yaba-college-of-technology",
      date: "e",
      agoDate: "",
      thumbnail: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/LOTUS-Bank.png",
      thumbnail_small: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/LOTUS-Bank.png",
      thumbnail_medium: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/LOTUS-Bank.png",
      thumbnail_full: "https://global.ariseplay.com/amg/www.thisdaylive.com/uploads/LOTUS-Bank.png",
      excerpt: "",
      author: null,
      category: null,
      url: "/index.php/2023/05/25/lotus-bank-supports-yaba-college-of-technology"
    }

    return (
      <>
      
      {isAmp && (
        <AmpLayout>
        <Head>
          <title>Test</title>
          <link rel="canonical" href="https://www.thisdaylive.com/amptest/test"></link>

        </Head>
          <AmpSideBar activeCategory='query'/>
          <AmpHeaderBar activeCategory='query'/>
          <div style={{paddingTop: '80px'}}></div>
          <h1>{nowDateString}</h1>
          <amp-timeago
            layout="fixed"
            width="160"
            height="20"
            datetime={`${postDate}+01:00`}
            locale="en"
          >
            {postDate}
          </amp-timeago>
          <div style={{paddingTop:"750px"}}></div>
          <div  className="iframe" style={{position:'relative'}}>
                <amp-iframe
                    width="200"
                    height="300"
                    sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                    layout="responsive"
                    frameborder="0"
                    style={{position:'absolute', border:'none', width:'100%', height:'100%', left:0, right:0, top:0, bottom:0}}
                    src="https://e.issuu.com/embed.html?backgroundColor=%23bb1c1c&amp;backgroundColorFullscreen=%23df1515&amp;d=tdla_0608_e965fc927ac928&amp;hideIssuuLogo=true&amp;showOtherPublicationsAsSuggestions=true&amp;u=thisdaylive"
                >
                </amp-iframe>
            </div>
    
          <style jsx>{`
              .home{
                  margin-top:84px;
              }
              .my-element {
                background-color: #fff; /* Default background color */
              }
              .my-element.scrolled {
                background-color: #f00; /* Background color when scrolled */
              }
              #scrollToTopButton {
                position: fixed;
                left:50px;
              }
              .iframe {
                padding-top:700px;
              }
          `}</style>
      </AmpLayout>
      )}
      {!isAmp && (

        <Layout >
          <Head >
            <title>Test</title>
        </Head>
          <h1>{nowDateString}</h1>
          <h2>{d}</h2>
          <h2>2023-06-02T12:20:00</h2>
          <h2>{test}</h2>
          <h2>{ago}</h2>
          <MastHead nowDateString={nowDateString}/>
          <div >
            <CommentCount
            shortname={disqusShortname}
            config={disqusConfig}
            >
              </CommentCount>
            <DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </Layout>
      )}
      </>
        
    );
};


export default Test


// export const getServerSideProps: GetServerSideProps = async (context) => {
//   var query = "";
//   if('s' in context.query){
//     query = getString(context.query.s);
//   }
  
//   const nowDateString = getNowDateString();
//   const d = new Date().toUTCString();
//   return {
//     props: {
//       nowDateString: nowDateString,
//       query: query,
//       d: d
//     },
//   }
// }

export const getStaticProps = async (context) => {

    const now = moment();
    const nowDateString = now.format('hh:mm:ss, YYYY/MM/DD');
    console.log("test page " + nowDateString);
    // await delay(10000);
    const postDate = "2023-06-02T12:49:00";
    const youtubeData = await getYoutubeFeed();
    console.log(youtubeData);
    return {
      props: {
        nowDateString:nowDateString,
        commentsCount: 0,
        d:nowDateString,
        postDate:postDate
      },
    }
}