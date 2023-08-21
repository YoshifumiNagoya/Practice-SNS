import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import { Link } from "react-router-dom";
import "./Friend.css";

export const Friend = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [friend, setFriend] = useState({});
  const [friendInfo, setFriendInfo] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`/users?userId=${user._id}`);
      setFriend(response.data);
      //console.log(response.data.followings);
    };
    fetchUsers(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchFriend = async () => {
      if (friend.followings) {
        const response = await Promise.all(
          friend.followings.map(async (followingId) => {
            const res = await axios.get(`/users?userId=${followingId}`);
            return res.data;
          })
        );
        setFriendInfo(response);
      }
    };
    fetchFriend();
  }, [friend.followings]);

  return (
    <div className="sidebarTop">
      {friendInfo.map((friendData) => (
        <li className="sidebarFriend" key={friendData._id}>
          <Link to={`/profile/${friendData.username}`} className="sideLink">
            <img
              src={
                friendData.profilePicture
                  ? PUBLIC_FOLDER + friendData.profilePicture
                  : `${PUBLIC_FOLDER}/person/noAvatar.png`
              }
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">{friendData.username}</span>
          </Link>
        </li>
      ))}
    </div>
  );
};
