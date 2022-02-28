import React, { useState } from 'react';
import './post.css'
import { MoreVert } from '@material-ui/icons';
import { Users } from '../../dummyData'

export default function Post({ post }) {    
    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)
    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className='postProfileImg' src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="avatar" />
                        <span className="postUserName">
                            {Users.filter((u) => u.id === post.userId)[0].username}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="like" />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="heart" />
                        <span className="postLikeCounter">{like} people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <post className="postCommentText">{post.comment} comments</post>
                    </div>
                </div>
            </div>
        </div>
    );
}
