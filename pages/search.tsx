import Head from 'next/head';
import { 
  GetServerSideProps  } from 'next';
import Layout from '../components/common/layout';
import { 
  getCategoryPosts, 
  getCategories,
  getSearchPosts,
  getDefaultSidebarHtml
} from '../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString,
  getString} from '../lib/utils';
import {
    IPostInfo
  } from '../lib/types';
import { CMS_NAME, CMS_SUBNAME } from '../lib/constants';
import SearchContainer from '../components/common/search-container';
import BreakingNews from '../components/common/breaking-news';
import MastHead from '../components/common/masthead';
import SearchPosts from '../components/search/search-posts';
import NProgress from 'nprogress'; //nprogress module
import { Router } from 'next/router';  
import {useEffect} from 'react';
import SideBar from '../components/common/side-bar';
interface Props {
  breakingNews: IPostInfo[];
  query: string;
  nowDateString: string;
  foundPosts: IPostInfo[];
  totalPostsCount: number,
  sidebarHtml: string
}

export default function SearchPage({breakingNews, query , nowDateString, foundPosts, totalPostsCount, sidebarHtml}: Props) {
  const startLoading = () => NProgress.start();
  const endLoading = () => NProgress.done();

  useEffect(() => {
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
        <title>{`Search Results for "${query}" - ${CMS_NAME}`}</title>
      </Head>
        <MastHead nowDateString={nowDateString}/>
        <SearchContainer initQuery={query}/>
        <BreakingNews postsList={breakingNews}/>
        <section className="py-5">
            <div className="wrapper container-fluid typography">
                <hr/>
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                        <SearchPosts query={query} foundPosts={foundPosts} totalPostsCount={totalPostsCount}/>
                    </div>
                    <div className="col-xs-12 col-md-3">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  var query = "";
  if('s' in context.query){
    query = getString(context.query.s);
  }
  
  const categoriesData = await getCategories(); 
  const sidebarHtml = await getDefaultSidebarHtml();
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);

  const nowDateString = getNowDateString();

  const foundPostsResult = await getSearchPosts(query, categoriesData);
  const foundPosts = foundPostsResult.data;
  const totalPostsCount = foundPostsResult.meta.total;
  return {
    props: {
      breakingNews: breakingNews,
      nowDateString: nowDateString,
      query: query,
      foundPosts: foundPosts,
      totalPostsCount: totalPostsCount,
      sidebarHtml:sidebarHtml
    },
  }
}
