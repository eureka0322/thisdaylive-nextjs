import Head from 'next/head';
import { GetStaticProps } from 'next';
import Layout from '../components/common/layout';
import { 
  getLatestPosts, 
  getCategoryPosts, 
  getCategories,
  getFrontPageSidebarHtml,
  getYoutubeFeed,
  getSectionHintsData,
  getFrontPageSidebarHtmlAmp,
} from '../lib/api';
import  {
  getAmpUrl,
  getCategoryIdFromSlug, 
  getNowDateString
} from '../lib/utils';
import {
  IPostInfo, ISectionHint, IYoutubeFeedData
} from '../lib/types';
import { CMS_NAME, CMS_SUBNAME } from '../lib/constants';
import { useAmp } from 'next/amp';
import SearchContainer from '../components/common/search-container';
import AriseStream from '../components/frontpage/arise-stream';
import BreakingNews from '../components/common/breaking-news';
import LatestHeadLines from '../components/common/latest-headlines';
import LatestPosts from '../components/common/latest-posts';
import CategoryShowcase from '../components/frontpage/category-showcase';
import MastHead from '../components/common/masthead';
import SideBar from '../components/common/side-bar';
import YoutubeFeed from '../components/frontpage/youtube-feed';
import NProgress from 'nprogress'; //nprogress module
import { Router, useRouter } from 'next/router';  
import {useEffect} from 'react';
import AmpLayout from '../components/amp/common/layout';
import AmpSideBar from '../components/amp/common/sidebar';
import AmpHeaderBar from '../components/amp/common/header';
import AmpBreakingNews from '../components/amp/frontpage/breaking-news';
import AmpLatestHeadLines from '../components/amp/frontpage/latest-headlines';
import AmpLatestPosts from '../components/amp/frontpage/latest-posts';
import AmpCategoryShowcase from '../components/amp/frontpage/category-showcase';
import AmpFooter from '../components/amp/common/footer';
import AmpSectionHints from '../components/amp/common/section-hints';
import AmpExtraSideWidgets from '../components/amp/common/extra-side-widgets';

export const config = { amp: 'hybrid' };

interface Props {
  latestPosts: IPostInfo[],
  breakingNews: IPostInfo[],
  nigeriaPosts: IPostInfo[],
  businessPosts: IPostInfo[],
  politicsPosts: IPostInfo[],
  lifestylePosts: IPostInfo[],
  healthPosts: IPostInfo[],
  sportPosts: IPostInfo[],
  educationPosts: IPostInfo[],
  backpagePosts: IPostInfo[],
  columnPosts: IPostInfo[],
  editorialPosts: IPostInfo[],
  sidebarHtml: string,
  nowDateString: string,
  youtubeFeedVideos: IYoutubeFeedData,
  sectionHintsData: ISectionHint,
  sidebarHtmlAmp: string
}

export default function FrontPage({ 
  latestPosts, 
  breakingNews, 
  nigeriaPosts, 
  businessPosts,
  politicsPosts,
  lifestylePosts,
  healthPosts,
  sportPosts,
  educationPosts,
  backpagePosts,
  columnPosts,
  editorialPosts,
  sidebarHtml, 
  nowDateString,
  youtubeFeedVideos,
  sectionHintsData,
  sidebarHtmlAmp}: Props) {

  const isAmp = useAmp();
  const router = useRouter();
  const startLoading = () => NProgress.start();
  const endLoading = () => NProgress.done();

  useEffect(() => {
    if ("ontouchstart" in document.documentElement)
    {
      const currentUrl = router.asPath;
      const url = `${getAmpUrl(currentUrl)}`;
      window.location.href=url;
    }
      
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', endLoading);
    Router.events.on('routeChangeError', endLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', endLoading);
      Router.events.off('routeChangeError', endLoading);
    };
  }, []);



  return (
    <>
    {!isAmp ?
    (
        <Layout >
            <Head>
              <title>{`${CMS_NAME} - ${CMS_SUBNAME}`}</title>
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3295515171382151"
     crossorigin="anonymous"></script>
               </Head>
              <MastHead nowDateString={nowDateString}/>
              <SearchContainer initQuery=''/>
              <BreakingNews postsList={breakingNews}/>
              <LatestHeadLines postsList={latestPosts.slice(0, 5)}/>
              <section>
                <div className="wrapper container-fluid typography">
                  <hr/>
                  <div className="row">
                    <div className="col-xs-12 col-md-9" >
                        <AriseStream/>
                        <LatestPosts  postsList={latestPosts.slice(0, 5)}/>
                        <CategoryShowcase postsList={nigeriaPosts} term="nigeria" />
                        <CategoryShowcase postsList={businessPosts} term="business" />
                        <CategoryShowcase postsList={politicsPosts} term="politics" />
                        {youtubeFeedVideos != null && <YoutubeFeed feedData={youtubeFeedVideos}/>}
                        <CategoryShowcase postsList={lifestylePosts} term="lifestyle" />
                        <CategoryShowcase postsList={healthPosts} term="health" />
                        <CategoryShowcase postsList={sportPosts} term="sport" />
                        <CategoryShowcase postsList={educationPosts} term="education" />
                        <CategoryShowcase postsList={backpagePosts} term="backpage" />
                        <CategoryShowcase postsList={columnPosts} term="column" />
                    </div>
                    <div className="col-xs-12 col-md-3" >
                      <div id="sidebar">
                        <SideBar html={sidebarHtml}/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        </Layout>
    ) : (
        <AmpLayout>
            <Head>
              <title>{`${CMS_NAME} - ${CMS_SUBNAME}`}</title>
            </Head>
            <AmpSideBar  activeCategory='home'/>
            <AmpHeaderBar activeCategory='home'/>
            <div className="home">
                <AmpBreakingNews postsList={breakingNews}/>
                <AmpLatestHeadLines postsList={latestPosts.slice(0, 4)}/>
                <AmpLatestPosts postsList={latestPosts.slice(4, 11)}/>
                <AmpCategoryShowcase postsList={nigeriaPosts} term="nigeria" />
                <AmpCategoryShowcase postsList={businessPosts} term="business" />
                <AmpCategoryShowcase postsList={politicsPosts} term="politics" />
                <AmpCategoryShowcase postsList={lifestylePosts} term="lifestyle" />
                <AmpCategoryShowcase postsList={healthPosts} term="health" />
                <AmpCategoryShowcase postsList={sportPosts} term="sport" />
                <AmpCategoryShowcase postsList={educationPosts} term="education" />
                <AmpCategoryShowcase postsList={backpagePosts} term="backpage" />
                <AmpCategoryShowcase postsList={columnPosts} term="column" />
                <AmpExtraSideWidgets html={sidebarHtmlAmp}/>
                <AmpCategoryShowcase postsList={editorialPosts.slice(0,6)} term="editorial" />
                
            </div>
            <AmpSectionHints prevSection={sectionHintsData.prevSection} nextSection={sectionHintsData.nextSection}/>
            <AmpFooter/>
            <style jsx>{`
                .home{
                    margin-top:84px;
                }
            `}</style>
        </AmpLayout>
    )
    }
    </>
    
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const nowDateString = getNowDateString();

  const categoriesData = await getCategories(); 
  const sidebarHtml = await getFrontPageSidebarHtml();

  const latestPosts = await getLatestPosts(11, true);
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
  const nigeriaCategoryId = getCategoryIdFromSlug(categoriesData, "nigeria");
  const nigeriaPosts = await getCategoryPosts(nigeriaCategoryId, 9, 1, 9, 0, 0, "medium");
  const businessCategoryId = getCategoryIdFromSlug(categoriesData, "business");
  const businessPosts = await getCategoryPosts(businessCategoryId, 9, 1, 9, 0, 0, "medium");
  const politicsCategoryId = getCategoryIdFromSlug(categoriesData, "politics");
  const politicsPosts = await getCategoryPosts(politicsCategoryId, 9, 1, 9, 0, 0, "medium");
  const lifestyleCategoryId = getCategoryIdFromSlug(categoriesData, "lifestyle");
  const lifestylePosts = await getCategoryPosts(lifestyleCategoryId, 9, 1, 9, 0, 0, "medium");
  const healthCategoryId = getCategoryIdFromSlug(categoriesData, "health");
  const healthPosts = await getCategoryPosts(healthCategoryId, 9, 1, 9, 0, 0, "medium");
  const sportCategoryId = getCategoryIdFromSlug(categoriesData, "sport");
  const sportPosts = await getCategoryPosts(sportCategoryId, 9, 1, 9, 0, 0, "medium");
  const educationCategoryId = getCategoryIdFromSlug(categoriesData, "education");
  const educationPosts = await getCategoryPosts(educationCategoryId, 9, 1, 9, 0, 0, "medium");
  const backpageCategoryId = getCategoryIdFromSlug(categoriesData, "backpage");
  const backpagePosts = await getCategoryPosts(backpageCategoryId, 9, 1, 9, 0, 0, "medium");
  const columnCategoryId = getCategoryIdFromSlug(categoriesData, "column");
  const columnPosts = await getCategoryPosts(columnCategoryId, 9, 1, 9, 0, 0, "medium");
  const editorialCategoryId = getCategoryIdFromSlug(categoriesData, "editorial");
  const editorialPosts = await getCategoryPosts(editorialCategoryId, 9, 1, 9, 0, 0, "medium");

  const youtubeFeedVideos= await getYoutubeFeed();
  const sectionHintsData = await getSectionHintsData(categoriesData, "home");

  const sidebarHtmlAmp = await getFrontPageSidebarHtmlAmp();

  return {
    props: { 
      latestPosts: latestPosts,
      breakingNews: breakingNews,
      nigeriaPosts: nigeriaPosts,
      businessPosts: businessPosts,
      politicsPosts: politicsPosts,
      lifestylePosts: lifestylePosts,
      healthPosts: healthPosts,
      sportPosts: sportPosts,
      educationPosts: educationPosts,
      backpagePosts: backpagePosts,
      columnPosts: columnPosts,
      editorialPosts: editorialPosts,
      sidebarHtml: sidebarHtml,
      nowDateString: nowDateString,
      youtubeFeedVideos: youtubeFeedVideos,
      sectionHintsData:sectionHintsData,
      sidebarHtmlAmp: sidebarHtmlAmp,
    },
    revalidate: parseInt(process.env.BUILD_REVALIDATE_INTERVAL),
  }
}
