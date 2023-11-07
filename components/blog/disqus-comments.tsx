import {CommentCount, DiscussionEmbed} from "disqus-react"
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const SITE_URL = publicRuntimeConfig.SITE_URL;

const DisqusComments = ({ post }) => {
  const disqusShortname = "tdaylive"
  const disqusConfig = {
    url: `${SITE_URL}${post.url}`,
    identifier: `${SITE_URL}${post.url}`,
    title: post.title 
  }
  return (
    <div>
        <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
        />
    </div>
  )
}
export default DisqusComments;