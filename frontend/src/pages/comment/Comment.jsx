import React, { useContext, useEffect, useState } from "react";
import "./Comment.css";
import { Topbar } from "../../components/topbar/Topbar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { RightBar } from "../../components/rightbar/RightBar";
import { AuthContext } from "../../state/AuthContext";
import { MoreVert } from "@mui/icons-material";
import TimeAgo from "timeago-react";
import CommentForm from "../../components/commentform/CommentForm";

export default function Comment() {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const id = useParams().id;
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { user: currentUser } = useContext(AuthContext);

  const handleLike = async () => {
    try {
      await axios.put(`/posts/${id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`/posts/${id}`);
        setPost(postResponse.data);
        //console.log(postResponse.data);
        const userResponse = await axios.get(
          `/users?userId=${postResponse.data.userId}`
        );
        setUser(userResponse.data);
        //console.log(userResponse.data);

        // console.log(userResponse.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Topbar />
      <div className="comment">
        <div className="side">
          <Sidebar />
        </div>
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

                <span className="postLikeCounter">
                  {like}人がいいねしました
                </span>
              </div>
              <div className="postBottomRight"></div>
            </div>
          </div>
          <h3 className="commentHead">コメント</h3>
          <CommentForm post={post} />
        </div>
        <div className="right">
          <RightBar />
        </div>
      </div>{" "}
    </>
  );
}
