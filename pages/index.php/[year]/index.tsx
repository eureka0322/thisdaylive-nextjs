import { 
    GetStaticProps, 
    GetStaticPaths, 
  } from 'next'; 
import { useRouter, Router } from 'next/router';  
import {useEffect} from 'react';
import NProgress from 'nprogress'; //nprogress module
import { getAmpUrl, getCategoryIdFromSlug, getNowDateString, getString } from '../../../lib/utils';
import { getCategories, getCategoryPosts, getCustomPage, getLatestPosts, getPageSidebarHtml } from '../../../lib/api';
import Head from 'next/head';
import Layout from '../../../components/common/layout';
import MastHead from '../../../components/common/masthead';
import SearchContainer from '../../../components/common/search-container';
import BreakingNews from '../../../components/common/breaking-news';
import LatestHeadLines from '../../../components/common/latest-headlines';
import SideBar from '../../../components/common/side-bar';
import { CMS_NAME } from '../../../lib/constants';
import { IPostInfo } from '../../../lib/types';
  
  interface Props {
    slug: string,
    title: string,
    content: string,
    nowDateString: string;
    breakingNews: IPostInfo[];
    latestPosts: IPostInfo[];
    sidebarHtml: string;
  }
  
  export default function CategoryPostsPage({
    slug,
    title,
    content,
    nowDateString, 
    breakingNews, 
    latestPosts,  
    sidebarHtml}: Props){
  
  
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
        <Layout >
        <Head>
          <title>{`${title} - ${CMS_NAME}`}</title>
        </Head>
          <MastHead nowDateString={nowDateString}/>
          <SearchContainer initQuery=''/>
          <BreakingNews postsList={breakingNews}/>
          <LatestHeadLines postsList={latestPosts}/>
          <section>
              <div className="wrapper container-fluid typography">
                  <hr/>
                  <div className="row">
                      <div className="col-xs-12 col-md-8 col-lg-9">
                        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
                        <div dangerouslySetInnerHTML={{ __html: content }}></div>
                      </div>
                      <div className="col-xs-12 col-md-4 col-lg-3">
                          <div id="sidebar">
                              <SideBar html={sidebarHtml}/>
                          </div>
                      </div>
                  </div>
            </div>
          </section>
      </Layout>
    )
  }
  
  export const getStaticPaths: GetStaticPaths = async () => {
      const paths = [];
      return {
        paths,
        fallback: 'blocking'
      }

  }
  
  export const getStaticProps: GetStaticProps = async (context) => {

    const {params} = context;
    const slug = getString(params.year);
    const pageData = await getCustomPage(slug);
    if(pageData == null){
        return {
            notFound: true
        }
    }
    const title = pageData.title;
    const content = pageData.content;

    const categoriesData = await getCategories(); 
    const sidebarHtml = await getPageSidebarHtml();
    const latestPosts = await getLatestPosts(5);
    const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
    const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
  
    const nowDateString = getNowDateString();

    
    return {
      props: { 
        slug:slug,
        title: title,
        content: content,
        nowDateString: nowDateString,
        breakingNews: breakingNews,
        latestPosts: latestPosts,
        sidebarHtml: sidebarHtml
      },
      revalidate: parseInt(process.env.BUILD_REVALIDATE_INTERVAL),
    }
  }
  
  
  