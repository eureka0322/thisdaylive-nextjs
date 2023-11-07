import { DateTimeFormatOptions } from 'intl';
import { ICategoryInfo } from './types';
import moment from 'moment';
export const decodeBase64 = (str: string):string => Buffer.from(str, 'base64').toString('binary');
export const encodeBase64 = (str: string):string => Buffer.from(str, 'binary').toString('base64');

export function getCategoryIdFromSlug(collection: ICategoryInfo[], slug : string) : number{
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].slug == slug)
        {
            return collection[i].id;
        }
    }
    return 0;
}

export function getCategoryFromSlug(collection: ICategoryInfo[], slug : string): ICategoryInfo{
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].slug == slug)
        {
            return collection[i];
        }
    }
    return null;
}

export function getCategoryFromId(collection: ICategoryInfo[], id : number): ICategoryInfo{
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].id == id)
        {
            return collection[i];
        }
    }
    return null;
}

export function getCategoryNameFromId(collection: ICategoryInfo[], id : number) : string{
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].id == id)
        {
            return collection[i].name;
        }
    }
    return "";
}

export function getCategoryNameFromSlug(collection: ICategoryInfo[], slug : string) : string{
    for(let i = 0; i < collection.length; i++) {
        if(collection[i].slug == slug)
        {
            return collection[i].name;
        }
    }
    return "";
}

export function getAuthorLink(slug : string) : string{
    return `/author/${slug}`;
}

export function getCategoryLink(slug : string) : string{
    return `/category/${slug}`;
}

export function getBlogLink(slug:string, year: string, month: string, day: string): string {
    return `/index.php/${year}/${month}/${day}/${slug}`;
}

export function getNowDateString() : string {
    const currentDate = new Date();
    const options : DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    return formattedDate;
}

export function getDateString(dateString: string): string {

    const now = moment(dateString);
    const formattedDate = now.format('hh:mm, Do MMM, YYYY');
    return formattedDate;
}

export function setThemeDarkToBody(darkMode: boolean): void {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log("system dark mode");
        if(darkMode)
            document.body.classList.remove("light-mode");
        else
            document.body.classList.add("light-mode");
    }
    else{
        console.log("system light mode");
        if(darkMode)
            document.body.classList.add("dark-mode");
        else
            document.body.classList.remove("dark-mode");
    }

}

export function getString(value: string | string[]): string {
    if (Array.isArray(value)) {
        return value.join(", ");
    } else {
        return value;
    }
}

export function getAmpUrl(url: string) : string {
    return `${url}?amp=1`;
}

export function getNextCategorySlugs(category: string): string[] {
    const categoryList = [
        "business",
        "politics",
        "nigeria",
        "health",
        "education",
        "lifestyle",
        "sport",
        "editorial",
        "backpage"
    ];

    const catIndex = categoryList.indexOf(category);
    var result =[];
    if(catIndex + 1 < categoryList.length){
        result.push(categoryList[catIndex + 1]);
    }
    if(catIndex + 2 < categoryList.length){
        result.push(categoryList[catIndex + 2]);
    }
    return result;
}

export const categoriesMenuForMobile = [
    {slug:"home", title:"Home"},
    {slug:"business", title:"Business"},
    {slug:"politics", title:"Politics"},
    {slug:"nigeria", title:"Nigeria"},
    {slug:"health", title:"Health & Wellbeing"},
    {slug:"education", title:"Education"},
    {slug:"lifestyle", title:"Life & Style"},
    {slug:"sport", title:"Sport"},
    {slug:"editorial", title:"Editorial"},
    {slug:"backpage", title:"Backpage"},
];

export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
} 