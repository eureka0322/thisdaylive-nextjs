import {
    encodeBase64, 
    } from './utils';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const API_URL = `${publicRuntimeConfig.WORDPRESS_SITE_URL}/index.php/wp-json/`;
const WORDPRESS_ADMIN_NAME = publicRuntimeConfig.WORDPRESS_ADMIN_NAME;
const WORDPRESS_ADMIN_APP_PASSWORD = publicRuntimeConfig.WORDPRESS_ADMIN_APP_PASSWORD;

async function postAPI(url = '', { variables }: Record<string, any> = {}) {
    const headers = { 'Content-Type': 'application/json' }
    if (WORDPRESS_ADMIN_NAME) {
      const basicAuth = encodeBase64(`${WORDPRESS_ADMIN_NAME}:${WORDPRESS_ADMIN_APP_PASSWORD}`)
  
      headers[
        'Authorization'
      ] = `Basic ${basicAuth}`
      // console.log(`${WORDPRESS_ADMIN_NAME}:${WORDPRESS_ADMIN_APP_PASSWORD}`);
    }
  
    // WPGraphQL Plugin must be enabled
    const res = await fetch(`${API_URL}${url}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        ...variables
      })
    })
    console.log(`POST ${API_URL}${url}`);
  
    
    try {
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
      }
      // console.log(json);
      else{
        return json
      }
  
    } catch (error) {
      if (error instanceof SyntaxError && error.message.includes("Unexpected token <")) {
        console.error("Invalid JSON data");
      } else {
        console.error(error);
      }
      throw new Error('Invalid Json from fetch API')
    }
  }


  
export async function postContactUsForm(firstname, lastname, email, message) {
    const formData = {
      form_id:17,
      "1.3": firstname,
      "1.6": lastname,
      "2": email,
      "3": message
    }
    const result = await postAPI(`/gf/v2/entries`, {variables: formData});
    return result;
  }

    
export async function postNewsletterSignUpForm(firstname, lastname, email, phonenumber) {
  //TODO
  const formData = {
    FNAME: firstname,
    LNAME: lastname,
    EMAIL: email,
    PHONE: phonenumber,
    _mc4wp_honeypot: '',
    _mc4wp_timestamp: Date.now(),
    _mc4wp_form_id: '858247',
    _mc4wp_form_element_id: 'mc4wp-form-1'
  }

  const headers = { 'Content-Type': 'application/json' }
    if (WORDPRESS_ADMIN_NAME) {
      const basicAuth = encodeBase64(`${WORDPRESS_ADMIN_NAME}:${WORDPRESS_ADMIN_APP_PASSWORD}`)
  
      headers[
        'Authorization'
      ] = `Basic ${basicAuth}`
      // console.log(`${WORDPRESS_ADMIN_NAME}:${WORDPRESS_ADMIN_APP_PASSWORD}`);
    }
    headers['Content-Type'] = "application/x-www-form-urlencoded";
  
    var urlencoded = new URLSearchParams();
    urlencoded.append("FNAME", firstname);
    urlencoded.append("LNAME", lastname);
    urlencoded.append("PHONE", phonenumber);
    urlencoded.append("EMAIL", email);
    urlencoded.append("_mc4wp_honeypot", "");
    urlencoded.append("_mc4wp_timestamp", "1687364736");
    urlencoded.append("_mc4wp_form_id", "858247");
    urlencoded.append("_mc4wp_form_element_id", "mc4wp-form-1");

    // WPGraphQL Plugin must be enabled
    const res = await fetch(`${API_URL}/mc4wp/v1/form`, {
      headers,
      method: 'POST',
      body: urlencoded
    })
  
    
    try {
      const json = await res.json()
      if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
      }
      // console.log(json);
      else{
        return json
      }
  
    } catch (error) {
      if (error instanceof SyntaxError && error.message.includes("Unexpected token <")) {
        console.error("Invalid JSON data");
      } else {
        console.error(error);
      }
      throw new Error('Invalid Json from fetch API')
    }


  const result = await postAPI(`/mc4wp/v1/form`, {variables: formData});
  return result;
}
  