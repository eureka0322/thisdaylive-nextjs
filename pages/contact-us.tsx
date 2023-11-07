import Head from 'next/head';
import { 
  GetStaticProps  } from 'next';
import Layout from '../components/common/layout';
import { 
  getCategoryPosts, 
  getCategories,
  getPageSidebarHtml,
  getLatestPosts
} from '../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString
} from '../lib/utils';
import {
    IPostInfo
  } from '../lib/types';
import { CMS_NAME, CMS_SUBNAME } from '../lib/constants';
import SearchContainer from '../components/common/search-container';
import BreakingNews from '../components/common/breaking-news';
import MastHead from '../components/common/masthead';
import SideBar from '../components/common/side-bar';
import LatestHeadLines from '../components/common/latest-headlines';
import ContactUs from '../components/legal/contact-us';

import { useRouter, Router } from 'next/router';

import {useEffect} from 'react';
import NProgress from 'nprogress'; //nprogress module

interface Props {
  nowDateString: string;
  breakingNews: IPostInfo[];
  latestPosts: IPostInfo[];
  sidebarHtml: string;
}

export default function ContactUsPage({nowDateString, breakingNews, latestPosts,  sidebarHtml}: Props) {
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
        <title>{`Contact Us - ${CMS_NAME}`}</title>
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
                        <ContactUs/>
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

export const getStaticProps: GetStaticProps = async (context) => {

  const categoriesData = await getCategories(); 
  const sidebarHtml = await getPageSidebarHtml();
  const latestPosts = await getLatestPosts(5);
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);

  const nowDateString = getNowDateString();

  return {
    props: {
      nowDateString: nowDateString,
      breakingNews: breakingNews,
      latestPosts: latestPosts,
      sidebarHtml: sidebarHtml
    },
  }
}
