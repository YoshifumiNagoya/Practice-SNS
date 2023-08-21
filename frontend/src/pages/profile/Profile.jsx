import axios from "axios";
import React, { useEffect, useState } from "react";

import { RightBar } from "../../components/rightbar/RightBar";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { TimeLine } from "../../components/timeline/TimeLine";
import { Topbar } from "../../components/topbar/Topbar";
import "./Profile.css";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});

  const username = useParams().username;
  //console.log(username);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`/users/?username=${username}`);
      //console.log(response);
      setUser(response.data);
    };
    fetchUsers(); // eslint-disable-next-line
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? `${PUBLIC_FOLDER}${user.coverPicture}`
                    : `${PUBLIC_FOLDER}/post/3.jpeg`
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? `${PUBLIC_FOLDER}${user.profilePicture}`
                    : `${PUBLIC_FOLDER}/person/noAvatar.png`
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>

              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TimeLine username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};
