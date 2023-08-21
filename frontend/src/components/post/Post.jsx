import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./Post.css";
import TimeAgo from "timeago-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export const Post = ({ post }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const id = post._id;

  const moveComment = () => {
    return navigate(`/comment/${id}`);
  };

  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`/users?userId=${post.userId}`);
      setUser(response.data);
    };
    fetchUsers();
  }, [post.userId]);

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? `${PUBLIC_FOLDER}${user.profilePicture}`
                    : `${PUBLIC_FOLDER}/person/noAvatar.png`
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postData">
              <TimeAgo datetime={post.createdAt} locale="ja.ts" />
            </span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PUBLIC_FOLDER}/heart.png`}
              alt=""
              className="likeIcon"
              onClick={() => handleLike()}
            />

            <span className="postLikeCounter">{like}人がいいねしました</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={moveComment}>
              :コメント
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
