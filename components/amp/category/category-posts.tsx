import Head from 'next/head';
import { CMS_NAME } from '../../../lib/constants';
import AmpMoreCategoryPosts from './more-category-posts';


import {
  ICategoryInfo,
  IPostInfo,
  ISectionHint
} from '../../../lib/types';
import AmpLayout from '../common/layout';
import AmpHeaderBar from '../common/header';
import AmpSideBar from '../common/sidebar';
import AmpFooter from '../common/footer';
import AmpLatestCategoryPosts from './latest-category-posts';
import AmpSectionHints from '../common/section-hints';
import AmpExtraSideWidgets from '../common/extra-side-widgets';
import AmpCategoryShowcaseExtra from '../common/category-showcase-extra';
import AmpLatestPosts from '../frontpage/latest-posts';
import AmpLatestPostsBottom from '../common/latest-posts-bottom';

interface Props {
  categoryName: string, 
  latestCategoryPosts: IPostInfo[], 
  categoryMorePosts: IPostInfo[], 
  category: ICategoryInfo,
  sectionHintsData: ISectionHint,
  latestPosts: IPostInfo[],
  backpagePosts: IPostInfo[],
  columnPosts: IPostInfo[],
  editorialPosts: IPostInfo[],
  sidebarHtml: string,
}

export default function AmpCategoryPosts({
    categoryName, 
    latestCategoryPosts, 
    categoryMorePosts, 
    category,
    sectionHintsData,
    latestPosts,
    backpagePosts,
    columnPosts,
    editorialPosts,
    sidebarHtml}: Props){
    const newcategoryMorePosts = categoryMorePosts.length > 6 ? categoryMorePosts.slice(6) : [];
  return (
    <AmpLayout>
      <Head>
        {<title>{`${categoryName} - ${CMS_NAME}`}</title>}
      </Head>
        <AmpSideBar activeCategory={category.slug}/>
        <AmpHeaderBar activeCategory={category.slug}/>
        <div className="category">
            <AmpLatestCategoryPosts  postsList={latestCategoryPosts} title={categoryName}/>
            <AmpMoreCategoryPosts  category={category} postsList={newcategoryMorePosts}/>
            <AmpExtraSideWidgets html={sidebarHtml}/>
            <AmpLatestPostsBottom postsList={latestPosts}/>
            <AmpCategoryShowcaseExtra postsList={editorialPosts} term="editorial" />
            <AmpCategoryShowcaseExtra postsList={backpagePosts} term="backpage" />
            <AmpCategoryShowcaseExtra postsList={columnPosts} term="column" />


        </div>
        <AmpSectionHints prevSection={sectionHintsData.prevSection} nextSection={sectionHintsData.nextSection}/>
        <AmpFooter/>
        <style jsx>{`
            .category{
                margin-top:84px;
            }
        `}</style>
    </AmpLayout>
  )
}
