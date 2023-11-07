import {
  encodeBase64, 
  getBlogLink, 
  getCategoryFromId,
  getCategoryFromSlug,
  getCategoryIdFromSlug} from './utils';
import {
  IPostInfo,
  IPostData,
  ICategoryInfo,
  IAuthorInfo,
  IPostAuthorInfo,
  IPostInfoWithMeta,
  IYoutubeFeedData,
  IPostPathInfo,
  ISectionHint,
  IPageInfo
} from './types';

import moment from 'moment';
import numeral from 'numeral';
import {categoriesMenuForMobile} from './utils';

const API_URL = `${process.env.WORDPRESS_SITE_URL}/index.php/wp-json/`
const SITE_URL = `${process.env.SITE_URL}`


async function fetchAPI(url = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (process.env.WORDPRESS_ADMIN_NAME) {
    const basicAuth = encodeBase64(`${process.env.WORDPRESS_ADMIN_NAME}:${process.env.WORDPRESS_ADMIN_APP_PASSWORD}`)

    headers[
      'Authorization'
    ] = `Basic ${basicAuth}`
    // console.log(`${process.env.WORDPRESS_ADMIN_NAME}:${process.env.WORDPRESS_ADMIN_APP_PASSWORD}`);
  }

  const res = await fetch(`${API_URL}${url}`, {
    headers,
    method: 'GET',
  })

  const now = moment();
  const nowDateString = now.format('hh:mm:ss, YYYY/MM/DD');

  console.log(`${nowDateString}: ${API_URL}${url}`);

  
  try {
    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    // console.log(json);
    if (variables && 'getTotalPageHeader' in variables && variables.getTotalPageHeader){
      return {
        data: json,
        meta: {
          total: parseInt(res.headers.get('X-WP-Total')),
          totalPages: parseInt(res.headers.get('X-WP-TotalPages'))
        }
      }
    }
    else{
      return json
    }

  } catch (error) {
    console.log(res.status);
    if (error instanceof SyntaxError && error.message.includes("Unexpected token <")) {
      console.error("Invalid JSON data");
    } else {
      console.error(error);
    }
    throw new Error('Invalid Json from fetch API')
  }
}



async function fetchJson(url){
  const res = await fetch(url)
  const result = await res.json()
  if (result.errors) {
    console.error(result.errors)
    throw new Error('Failed to fetch Json')
  }
  return result;
}


export async function getPostBySlug(slug: string) : Promise<IPostData> {
  const data = await fetchAPI(`/wp/v2/posts?slug=${slug}`);
  if(data.length == 0)
    return null;
  
  const post = data[0];

  const featuredMedia = post['featured_media'];
  var thumbnail = '';
  if(featuredMedia != 0){
    const mediaData = await fetchAPI(`/wp/v2/media/${featuredMedia}`);
    if('source_url' in mediaData)
      thumbnail = mediaData.source_url;
  }

  const dateParts = post.date.split(/[-T]/);

  const postYear = dateParts[0];
  const postMonth = dateParts[1];
  const postDay = dateParts[2];

  const postUrl = getBlogLink(post.slug, postYear, postMonth, postDay);

  const result:IPostData = {
    id: post['id'],
    title: post['title']['rendered'],
    slug: post['slug'],
    date: post['date'],
    agoDate: moment(post['date']).fromNow(),
    content: post['content']['rendered'],
    categoryId: post['categories'].length > 0 ? post['categories'][0] : 0,
    thumbnail: thumbnail,
    url: postUrl,
    tags: post['tags']
  }
  return result;
}

export async function preparePosts(data: any[], thumbCount : number, authorCount : number, excerptCount : number, categoriesData : ICategoryInfo[], imageSizeOptions: Array<object>) : Promise<IPostInfo[]> {
  var mediaIdList : number[] = [];
  
  if(thumbCount > 0){
    for(let i = 0; i < Math.min(data.length, thumbCount); i++){
      const post = data[i];
      const featuredMedia = post['featured_media'];
      if(featuredMedia != 0){
        mediaIdList.push(featuredMedia);
      }
    }
  }
  
  var mediaData = [];
  if(mediaIdList.length > 0){
    mediaData = await fetchAPI(`/wp/v2/media?per_page=100&include=${mediaIdList.join(",")}`);
  }

  var authorIdList : number[] = [];
  if(authorCount > 0){
    for(let i = 0; i < Math.min(data.length, authorCount); i++){
      const post = data[i];
      const authorId = post['author'];
      if(authorId != 0){
        authorIdList.push(authorId);
      }
    }
  }

  var authorData = [];
  if(authorIdList.length > 0){
    authorData = await fetchAPI(`/wp/v2/users?per_page=100&include=${authorIdList.join(",")}`);
  }
  


  const imageSizeList = imageSizeOptions.flatMap(obj => Object.entries(obj).flatMap(([key, value]) => Array(value).fill(key)));

  const result: IPostInfo[] = [];
  for(let i = 0; i < data.length; i++){
    const post = data[i];
    var thumbnail = '';
    var thumbnail_small = '';
    var thumbnail_medium = '';
    var thumbnail_full = '';
    if(i < thumbCount) {
      const featuredMedia = post['featured_media'];
      if(featuredMedia != 0){
        for(let j = 0; j < mediaData.length;j++){
          if(mediaData[j].id == featuredMedia){
            if(i < imageSizeList.length){
              const imageSize = imageSizeList[i];
              if (imageSize == "thumbnail"){
                if(Object.keys(mediaData[j].media_details.sizes).length == 0 || !Object.keys(mediaData[j].media_details.sizes).includes("thumbnail")){
                  thumbnail = mediaData[j].source_url;
                }
                else{
                  thumbnail = mediaData[j].media_details.sizes.thumbnail.source_url;
                }
              }
              else if (imageSize == "medium"){
                if(Object.keys(mediaData[j].media_details.sizes).length == 0 || !Object.keys(mediaData[j].media_details.sizes).includes("medium")){
                  thumbnail = mediaData[j].source_url;
                }
                else{
                  thumbnail = mediaData[j].media_details.sizes.medium.source_url;
                }
              }
              else if (imageSize == "thumbnail-full"){
                if(Object.keys(mediaData[j].media_details.sizes).length == 0 || !Object.keys(mediaData[j].media_details.sizes).includes("thumbnail")){
                  thumbnail = mediaData[j].source_url;
                }
                else{
                  thumbnail = mediaData[j].media_details.sizes.thumbnail.source_url;
                }
                thumbnail_full = mediaData[j].source_url;
              }
              else{ //full
                thumbnail = mediaData[j].source_url;
              }
            }
            else{
              thumbnail = mediaData[j].source_url;
              
            }
            //Fill small, medium, full image for mobile amp
            if(Object.keys(mediaData[j].media_details.sizes).length == 0 || !Object.keys(mediaData[j].media_details.sizes).includes("thumbnail")){
              thumbnail_small = '';
            }
            else{
              thumbnail_small = mediaData[j].media_details.sizes.thumbnail.source_url;
            }
            if(Object.keys(mediaData[j].media_details.sizes).length == 0 || !Object.keys(mediaData[j].media_details.sizes).includes("medium")){
              thumbnail_medium = '';
            }
            else{
              thumbnail_medium = mediaData[j].media_details.sizes.medium.source_url;
            }
            thumbnail_full = mediaData[j].source_url;
          }
        }
      }
    }

    var excerpt = '';
    if(i < excerptCount){
      excerpt = post['excerpt']['rendered'];
    }

    var author: IPostAuthorInfo = null;
    if(i < authorCount)
    {
      const authorId = post['author'];
      if(authorId != 0){
        for(let j = 0; j < authorData.length;j++){
          if(authorData[j].id == authorId)
            author = {
              id:authorId,
              slug:authorData[j].slug,
              name:authorData[j].name,
            }
        }
      }
    }

    var category: ICategoryInfo = null;
    if(categoriesData != null){
      if(post['categories'].length > 0){
        const categoryId = post['categories'][0];
        category = getCategoryFromId(categoriesData, categoryId)
      }
    }

    const dateParts = post.date.split(/[-T]/);

    const postYear = dateParts[0];
    const postMonth = dateParts[1];
    const postDay = dateParts[2];
  
    const postUrl = getBlogLink(post.slug, postYear, postMonth, postDay);

    result.push({
      title: post['title']['rendered'],
      slug: post['slug'],
      date: post['date'],
      agoDate: moment(post['date']).fromNow(),
      thumbnail: thumbnail,
      thumbnail_small: thumbnail_small,
      thumbnail_medium: thumbnail_medium,
      thumbnail_full: thumbnail_full,
      excerpt: excerpt,
      author: author,
      category: category,
      url: postUrl
    });
  }

  return result;
}

export async function getLatestPosts(count: number, imageFeatured: boolean=false) : Promise<IPostInfo[]> {
  const data = await fetchAPI(`/wp/v2/posts?per_page=${count}`);
  const thumbCount = data.length;
  const authorCount = 0;
  const excerptCount = 1;

  var imageSizeOptions = [];
  if(imageFeatured){
    imageSizeOptions = [
      {'thumbnail-full': 1},
      {'thumbnail': thumbCount - 1}
    ];
  }
  else{
    imageSizeOptions = [
      {'thumbnail': thumbCount}
    ];
  }
  
  const result = await preparePosts(data, thumbCount, authorCount, excerptCount, null, imageSizeOptions);
  return result;
}

export async function getCategoryPosts(categoryId: number, pageCount: number, pageNum: number = 1, thumbCount: number = 0, excerptCount: number = 0, authorCount: number = 0, imageSize: ("thumbnail" | "medium" | "full") ="thumbnail", imageFeatured: boolean=false) : Promise<IPostInfo[]>{
  const data = await fetchAPI(`/wp/v2/posts?page=${pageNum}&per_page=${pageCount}&categories=${categoryId}`);
  var imageSizeOptions = [];
  if(thumbCount != 0){
    
    if(imageSize == "thumbnail"){
      if(imageFeatured){
        imageSizeOptions = [
          {'full': 1},
          {'thumbnail': thumbCount - 1}
        ];
      }
      else{
        imageSizeOptions = [
          {'thumbnail': thumbCount}
        ];
      }

    }
    else if(imageSize == "medium"){
      imageSizeOptions = [
       {'medium': thumbCount}
      ];
    } 
    else {
      imageSizeOptions = [
       {'full': thumbCount}
      ];
    } 
    
  }

  const result = await preparePosts(data, thumbCount, authorCount, excerptCount, null, imageSizeOptions);
  return result;
}

export async function getCategories() : Promise<ICategoryInfo[]>{
  const data = await fetchAPI(`/wp/v2/categories?per_page=100`);
  const result: ICategoryInfo[] = [];
  for(let i = 0; i < data.length; i++){
    result.push({
      id: data[i].id,
      slug: data[i].slug,
      name: data[i].name,
      count: data[i].count
    })
  }
  return result;
}

async function getSidebarHtml(sidebarSlug): Promise<string>{
  const widgets = await fetchAPI(`/wp/v2/widgets?sidebar=${sidebarSlug}`);
  var result : string = "";
  for(let i = 0; i < widgets.length; i++){
    const widget = widgets[i];
    const regex = new RegExp(`href="${process.env.WORDPRESS_SITE_URL}/index.php/(\\d{4})/(\\d{2})/(\\d{2})/(.+?)/"`, 'g');
    const newString = widget['rendered'].replace(regex, 'href="/index.php/$1/$2/$3/$4/"');
    const newString1 = newString.replace("https://www.thisdaylive.com/index.php/newsletter-sign-up", "/newsletter-sign-up");
    result += newString1;
  }
  return result;
}

async function getSidebarHtmlAmp(sidebarSlug): Promise<string>{
  const widgets = await fetchAPI(`/wp/v2/widgets?sidebar=${sidebarSlug}`);
  var result : string = "";
  for(let i = 0; i < widgets.length; i++){
    if(i > 0 && i < widgets.length - 4){
      const widget = widgets[i];
      const regex = new RegExp(`href="${process.env.WORDPRESS_SITE_URL}/index.php/(\\d{4})/(\\d{2})/(\\d{2})/(.+?)/"`, 'g');
      const newString = widget['rendered'].replace(regex, 'href="/index.php/$1/$2/$3/$4/"');
      const newString1 = newString.replace("https://www.thisdaylive.com/index.php/newsletter-sign-up", "/newsletter-sign-up");
      result += newString1;
    }
    
  }
  return result;
}

export async function getFrontPageSidebarHtml() : Promise<string>{
  return getSidebarHtml("front_page_sidebar");
}
export async function getFrontPageSidebarHtmlAmp() : Promise<string>{
  return getSidebarHtmlAmp("front_page_sidebar");
}

export async function getDefaultSidebarHtml() : Promise<string>{
  return getSidebarHtml("default_sidebar");
}

export async function getSingleArticleSidebarHtml() : Promise<string>{
  return getSidebarHtml("single_article_sidebar");
}

export async function getPageSidebarHtml() : Promise<string>{
  return getSidebarHtml("page_sidebar");
}

export async function getYoutubeFeed() : Promise<IYoutubeFeedData> {
  const apiKey = process.env.YOUTUBUE_FEED_API_KEY;
  const channelId = process.env.YOUTUBUE_FEED_CHANNEL_ID;
  const channelUrl = `https://www.youtube.com/channel/${channelId}`;
  const channelResult = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apiKey}`);
  if ( "error" in channelResult){
    return null;
  }
  const subscriberCount = numeral(parseInt(channelResult.items[0].statistics.subscriberCount)).format('0a');
  const channelName = channelResult.items[0].snippet.title;

  const maxResults = 6;
  const result = await fetchJson(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`);
  if ( "error" in result){
    return null;
  }
  var videos = [];
  for(let i = 0; i < result.items.length; i++){
    const item = result.items[i];
    const videoId = item.id.videoId;
    const statistics = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=statistics`);
    if ( "error" in statistics){
      return null;
    }
    const commentCount = parseInt(statistics.items[0].statistics.commentCount);
    const likeCount = parseInt(statistics.items[0].statistics.likeCount);
    const viewCount = parseInt(statistics.items[0].statistics.viewCount);
    videos.push({
      id: videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      date: moment(item.snippet.publishedAt).fromNow(),
      username: item.snippet.channelTitle,
      commentCount : commentCount >= 1000 ? numeral(parseInt(statistics.items[0].statistics.commentCount)).format('0.0a') : commentCount,
      likeCount: likeCount >= 1000 ? numeral(parseInt(statistics.items[0].statistics.likeCount)).format('0.0a') : likeCount,
      viewCount: viewCount >= 1000 ? numeral(parseInt(statistics.items[0].statistics.viewCount)).format('0.0a') : viewCount,
    })
  }

  return {
    channel: {
      name:channelName,
      url:channelUrl,
      subscriberCount: subscriberCount
    },
    videos: videos
  };
}

export async function getLatestCategoryPosts(categoryId: number): Promise<IPostInfo[]>
{
  return getCategoryPosts(categoryId, 6, 1, 6, 1, 0, "thumbnail", true);
}

export async function getCategoryTopPosts(categoryId: number, pageNum: number): Promise<IPostInfo[]>
{
  if(pageNum < 2)
    pageNum = 2;
  return getCategoryPosts(categoryId, 6, pageNum, 6, 0, 6, "medium");
}

export async function getCategoryMorePosts(categoryId: number, pageNum: number): Promise<IPostInfo[]>
{
  return getCategoryPosts(categoryId, 50, pageNum, 50, 0, 0, "thumbnail");
}

export async function getAuthor(authorSlug: string): Promise<IAuthorInfo>
{
  const data = await fetchAPI(`/wp/v2/users?slug=${authorSlug}`);
  if(data.length > 0){
    const result: IAuthorInfo = {
      id: data[0].id,
      name: data[0].name,
      description: data[0].description,
      avatar: data[0].avatar_urls["48"],
      slug: data[0].slug
    }
    return result;
  }
  else{
    return null;
  }
  
}

export async function getAuthorPosts(authorId : number, pageCount : number, pageNum : number, categoriesData :ICategoryInfo []): Promise<IPostInfoWithMeta>
{
  const dataWithCounts = await fetchAPI(`/wp/v2/posts?page=${pageNum}&per_page=${pageCount}&author=${authorId}`, {variables: {getTotalPageHeader: true}});
  const data = dataWithCounts.data;
  const meta = dataWithCounts.meta;
  const thumbCount = data.length;
  const authorCount = data.length;
  const excerptCount = 0;
  const imageSizeOptions = [
    {'medium': thumbCount}
  ];
  const result = await preparePosts(data, thumbCount, authorCount, excerptCount, categoriesData, imageSizeOptions);
  
  return {
    data: result,
    meta: meta
  }
}

export async function getSearchPosts(query: string, categoriesData :ICategoryInfo []): Promise<IPostInfoWithMeta> {
  const pageCount = 25;
  const dataWithCounts = await fetchAPI(`/relevanssi/v1/search?keyword=${query}&per_page=${pageCount}`, {variables: {getTotalPageHeader: true}});
  const data = dataWithCounts.data;
  const meta = dataWithCounts.meta;
  const thumbCount = data.length;
  const authorCount = data.length;
  const excerptCount = data.length;
  const imageSizeOptions = [
    {'medium': thumbCount}
  ];
  const result = await preparePosts(data, thumbCount, authorCount, excerptCount, categoriesData, imageSizeOptions);
  return {
    data: result,
    meta: meta
  }
}

export async function getAllAuthorsList(): Promise<string[]> {
  var result: string[] =[];
  const pageCount = 100;

  var curPage = 1;
  var totalPagesCount = 1;
  do {
    
    const dataWithCounts = await fetchAPI(`/wp/v2/users?who=authors&has_published_posts=true&per_page=${pageCount}&page=${curPage}`, {variables: {getTotalPageHeader: true}});
    const data = dataWithCounts.data;
    const meta = dataWithCounts.meta;
    data.forEach(element => {
      result.push(element.slug);
    });
    totalPagesCount = meta.totalPages;
    curPage++;
  } while (curPage <= totalPagesCount);
  
  return result;
}

export async function getLatestPostSlugs(count: number): Promise<IPostPathInfo[]> {
  const data = await fetchAPI(`/wp/v2/posts?per_page=${count}`);
  const result = data.map((post) => {
    const dateParts = post.date.split(/[-T]/);

    const postYear = dateParts[0];
    const postMonth = dateParts[1];
    const postDay = dateParts[2];
    return {
      year: postYear,
      month: postMonth,
      day: postDay,
      slug: post.slug
    }
  });
  return result;
}


export async function getNextPostsInCagetory(categoryId: number, count: number,  date: string) : Promise<IPostInfo[]>{
  const data = await fetchAPI(`/wp/v2/posts?per_page=${count}&categories=${categoryId}&before=${date}`);
  const result = await preparePosts(data, count, 0, 0, null, []);
  return result;
}


export async function getRelatedPosts(post: IPostData, count: number, categoriesData: ICategoryInfo[]) : Promise<IPostInfo[]> {
  const tagString = post.tags.join(",");
  if(tagString == ''){
    return [];
  }
  const data = await fetchAPI(`/wp/v2/posts?tags=${tagString}&per_page=${count}&exclude=${post.id}`);
  const imageSizeOptions = [
    {'medium': count}
   ];
  const result = await preparePosts(data, count, count, 0, categoriesData, imageSizeOptions);
  return result;
}

export async function getSectionHintsData(categoriesData: ICategoryInfo[], categorySlug: string): Promise<ISectionHint> {
  var result: ISectionHint = {
    nextSection: null,
    prevSection: null
  }
  var prevCatSlug = '';
  var nextCatSlug = '';
  for(let i = 0; i < categoriesMenuForMobile.length; i++){
    const item = categoriesMenuForMobile[i];
    if(item.slug == categorySlug){
      if(i - 1 >= 0){
        prevCatSlug = categoriesMenuForMobile[i - 1].slug;
      }
      if(i + 1 < categoriesMenuForMobile.length){
        nextCatSlug = categoriesMenuForMobile[i + 1].slug;
      }
    }
  }
  if(prevCatSlug != ''){
    if(prevCatSlug == "home"){
      const data = await getLatestPosts(1, false);
      var imageUrl = '';
      if(data.length > 0 ){
        imageUrl = data[0].thumbnail_medium;
        if(imageUrl == '') {
          imageUrl = data[0].thumbnail_full;
        }
      }
      result.prevSection = {
        categorySlug: "home", 
        categoryName: "Home",
        imageUrl: imageUrl
      }
    }
    else{
      const prevCategory = getCategoryFromSlug(categoriesData, prevCatSlug);
      const data = await getCategoryPosts(prevCategory.id, 1, 1, 1, 0, 0, "thumbnail", false);
      var imageUrl = '';
      if(data.length > 0 ){
        imageUrl = data[0].thumbnail_medium;
        if(imageUrl == '') {
          imageUrl = data[0].thumbnail_full;
        }
      }
      result.prevSection = {
        categorySlug: prevCatSlug, 
        categoryName: prevCategory.name,
        imageUrl: imageUrl
      }
    }
    

  }
  if(nextCatSlug != ''){
    const nextCategory = getCategoryFromSlug(categoriesData, nextCatSlug);
    const data = await getCategoryPosts(nextCategory.id, 1, 1, 1, 0, 0, "thumbnail", false);
    var imageUrl = '';
    if(data.length > 0 ){
      imageUrl = data[0].thumbnail_medium;
      if(imageUrl == '') {
        imageUrl = data[0].thumbnail_full;
      }
    }
    result.nextSection = {
      categorySlug: nextCatSlug, 
      categoryName: nextCategory.name,
      imageUrl: imageUrl
    }

  }

  return result;
}

export async function getCommentsCount(blogUrl): Promise<number> {
  const result = await fetchJson(`https://tdaylive.disqus.com/count-data.json?url=${SITE_URL}${blogUrl}`);
  if(result.items.length > 0){
    return result.items[0].comments;
  }
  return 0;
}

export async function getRssFeed(): Promise<string> {

  const res = await fetch(`${process.env.WORDPRESS_SITE_URL}/index.php/rss`);

  var result = await res.text();
  result = result.replaceAll(`${process.env.WORDPRESS_SITE_URL}`,SITE_URL);
  result = result.replaceAll('/index.php/feed/', '/index.php?feed=rss');
  return result;

}

export async function getCustomPage(slug: string) : Promise<IPageInfo>{
  ;
  const data = await fetchAPI(`/wp/v2/pages?slug=${slug}`);
  if(data != null && data.length > 0){
    const page = data[0];
    if(page.status == "publish"){
      var result: IPageInfo = {
        title: page.title.rendered,
        content : page.content.rendered
      }
      return result;
    }
  }
  return null;
}
