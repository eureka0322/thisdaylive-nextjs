import Head from 'next/head';
import { 
  GetStaticProps, 
  GetStaticPaths, 
  GetServerSideProps 
} from 'next';
import Layout from "../../../../../components/common/layout";
import { 
  getLatestPosts, 
  getCategoryPosts, 
  getCategories,
  getSingleArticleSidebarHtml,
  getPostBySlug,
  getLatestPostSlugs,
  getNextPostsInCagetory,
  getRelatedPosts,
  getCommentsCount
} from '../../../../../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString, 
  getCategoryNameFromId,
  getString,
  getNextCategorySlugs,
  getCategoryFromId,
  getCategoryFromSlug,
  getAmpUrl
} from '../../../../../lib/utils';
import SearchContainer from '../../../../../components/common/search-container';
import BreakingNews from '../../../../../components/common/breaking-news';
import LatestHeadLines from '../../../../../components/common/latest-headlines';
import MastHead from '../../../../../components/common/masthead';
import SinglePost from '../../../../../components/blog/single-post';
import { CMS_NAME } from '../../../../../lib/constants';
import SideBar from '../../../../../components/common/side-bar';
import {
  INextCategoryPost,
  IPostData,
  IPostInfo
} from '../../../../../lib/types';
import NProgress from 'nprogress'; //nprogress module
import { Router, useRouter } from 'next/router';  
import {useEffect} from 'react';

import { useAmp } from 'next/amp';
import AmpLayout from '../../../../../components/amp/common/layout';
import AmpSideBar from '../../../../../components/amp/common/sidebar';
import AmpFooter from '../../../../../components/amp/common/footer';
import AmpBlogHeader from '../../../../../components/amp/blog/blog-header';
import AmpSinglePost from '../../../../../components/amp/blog/single-post';
import Article from '../../../../../components/common/article';
// @ts-ignore
import he from 'he';
export const config = { amp: 'hybrid' };

import getConfig from "next/config";
import useSWR from 'swr';

const { publicRuntimeConfig } = getConfig();
const SITE_URL = publicRuntimeConfig.SITE_URL;

interface Props {
  post: IPostData;
  categoryName: string;
  nextPosts: IPostInfo[],
  nextCategoryPosts: INextCategoryPost[],
  relatedPosts: IPostInfo[],
  categorySlug: string,
  commentsCount: number,
  postTitle: string
}

export default function Post({
  post, 
  categoryName, 
  nextPosts, 
  nextCategoryPosts, 
  relatedPosts,
  categorySlug,
  commentsCount,
  postTitle
  }: Props){
  const isAmp = useAmp();
  const router = useRouter();
  
  const startLoading = () => NProgress.start();
  const endLoading = () => NProgress.done();

  const fetcher = (url) => fetch(url).then(res => res.json());
  const sidebarData = useSWR('/api/get-blog-sidebar', fetcher);
  const newsData = useSWR('/api/get-top-news', fetcher);
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

    <Layout ogImage={false}>
      <Head>
        <title>{`${postTitle} - ${CMS_NAME}`}</title>
        <link rel="canonical" href={`${SITE_URL}${router.asPath}`}></link>
        <link rel="amphtml" href={`${SITE_URL}${getAmpUrl(router.asPath)}`}></link>
        {post['thumbnail'] != '' && <meta property="og:image" content={`${post['thumbnail']}`} />}
        
      </Head>
        {
            (!newsData.error && newsData.data && newsData.data.nowDateString) && (
                <MastHead nowDateString={newsData.data.nowDateString}/>
            )
        }
        <SearchContainer initQuery=''/>
        {
            (!newsData.error && newsData.data && newsData.data.breakingNews) && (
              <>
                <BreakingNews postsList={newsData.data.breakingNews}/>
                <LatestHeadLines postsList={newsData.data.latestPosts}/>
              </>

            )
        }


        <section className="py-5">
          <div className="wrapper container-fluid typography">
            <hr/>
            <div className="row">
              <div className="col-xs-12 col-md-8 col-lg-9" >
                  <SinglePost post={post} categoryName={categoryName}/>
              </div>
              <div className="col-xs-12 col-md-4 col-lg-3">
                <div id="sidebar">
                  {
                    (!sidebarData.error && sidebarData.data && sidebarData.data.sidebarHtml) && (<SideBar html={sidebarData.data.sidebarHtml}/>)
                  }                 
                </div>
              </div>
            </div>
            <div className="section-heading">
              <h2 className="title"><span>Related Articles</span></h2>
            </div>
            <div className="row mb-3">
              {relatedPosts.length > 0 ? (
                  relatedPosts.map((post, index) => (
                      <div key={index} className="col-xs-12 col-md-3">
                          <Article  post={post} category={null} options={
                              {
                                  layout :'vertical',
                                  showImage : true,
                                  imageSize: 'medium',
                                  headingSize: 'h6',
                                  showPostMeta: true,
                                  dateStyle: 'ago',
                                  showExcerpt: false
                              }
                          }/>
                      </div>
                  ))
                  ) : (<></>)
              }
            </div>
          </div>
        </section>
    </Layout>
    ): (
      <AmpLayout>
        <Head>
          <title>{`${postTitle} - ${CMS_NAME}`}</title>
        </Head>
        <AmpSideBar activeCategory={categorySlug}/>
        <AmpBlogHeader/>
        <AmpSinglePost post={post} categoryName={categoryName} nextPosts={nextPosts} nextCategoryPosts={nextCategoryPosts} relatedPosts={relatedPosts} commentsCount={commentsCount}/>
        <AmpFooter/>
        <style jsx>{`
            
        `}</style>
      </AmpLayout>
    )
    }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("blog page");

  const paths = [];
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {params} = context;
    const { year, month, day, slug } = params;
    const post = await getPostBySlug(getString(slug));
    if(post == null) {
        return {
            notFound: true
        }
    }

    const dateParts = post.date.split(/[-T]/);

    const postYear = dateParts[0];
    const postMonth = dateParts[1];
    const postDay = dateParts[2];

    if(postYear != year || postMonth != month || postDay != day){
        return {
            notFound: true
        }
    }


    const categoriesData = await getCategories(); 

    const categoryName = getCategoryNameFromId(categoriesData, post['categoryId']);
    const category = getCategoryFromId(categoriesData, post['categoryId']);
    //for amp
    //get 2 next blog in category
    //get next category blog list
    //get related blogs

    const nextPosts = await getNextPostsInCagetory(post['categoryId'], 2, post.date);
    const nextCategorySlugs = getNextCategorySlugs(category.slug);

    var nextCategoryPosts = [];
    for(let i = 0; i < nextCategorySlugs.length; i++){
      const cat = getCategoryFromSlug(categoriesData, nextCategorySlugs[i]);
      const catPosts = await getCategoryPosts(cat.id, 6, 1, 6, 0, 0, "medium");
      nextCategoryPosts.push(
        {
          categoryName: cat.name,
          posts: catPosts
        }
      )
    }

    const relatedPosts = await getRelatedPosts(post, 4, categoriesData);
    const commentsCount = await getCommentsCount(post.url);
    const postTitle = he.decode(post.title);
    
    return {
        props: { 
            post: post,
            categoryName: categoryName,
            //for mobile amp
            nextPosts: nextPosts,
            nextCategoryPosts: nextCategoryPosts,
            relatedPosts: relatedPosts,
            categorySlug:category.slug,
            commentsCount: commentsCount,
            postTitle: postTitle
        },
    }
}


