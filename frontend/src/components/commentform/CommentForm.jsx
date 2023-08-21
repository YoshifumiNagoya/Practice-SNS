import axios from "axios";
import "./CommentForm.css";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";

export default function CommentForm({ post }) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const handlePostSubmit = async () => {
    if (newComment.trim() !== "") {
      try {
        const currentTime = new Date();
        const requestData = {
          username: user.username,
          text: newComment,
          postDate: currentTime.toISOString(),
        };

        await axios.put(`/posts/${post._id}/comment`, requestData);
        setNewComment("");
        fetchComments();
      } catch (error) {
        console.error("Comment Error:", error);
      }
    }
  };

  const fetchComments = async () => {
    try {
      const information = await axios.get(`/posts/comments/${post._id}`);
      setComments(information.data);
      //console.log(information.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        fetchComments();
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost(); // eslint-disable-next-line
  }, [post]);

  return (
    <div className="commentForm">
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="コメントする..."
        />
        <button onClick={handlePostSubmit}>投稿</button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="commentTop">
            <div className="commentBottom">
              <p className="username">{comment.username}</p>
              <p className="date"> {comment.postDate}</p>
            </div>
            <span className="text">
              <hr className="Hr" />
              {comment.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
