import { IAuthorInfo } from "../../lib/types";

interface Props {
    author: IAuthorInfo
}

export default function AuthorInfo({author}: Props){
    return (
        <>
            <div className="author-information">
                <div className="gravatar">
                    <img alt="" src={author.avatar} className="avatar avatar-50 photo" height="50" width="50" loading="lazy" decoding="async"/>
                </div>
                <div className="name">
                    <h5 className="mt-0 font-weight-bold">{author.name}</h5>
                </div>
            </div>
            <p>{author.description}</p>
        </>
    );
}