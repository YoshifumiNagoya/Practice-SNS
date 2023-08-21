import { Analytics, Face, Gif, Image } from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import "./Share.css";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";
import imageCompression from "browser-image-compression";

export const Share = () => {
  const [file, setFile] = useState(null);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const { user } = useContext(AuthContext);

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const compressedFile = await compressImage(file);
      const base64 = await convertToBase64(compressedFile);
      newPost.img = base64;
      try {
        await axios.post("/posts", newPost);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("ファイルが存在しません。");
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 0.1, // 圧縮後の最大ファイルサイズ（1MB以下）
      maxWidthOrHeight: 800, // 圧縮後の最大幅または高さ（800ピクセル以下）
    };
    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
      return file;
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? `${PUBLIC_FOLDER}${user.profilePicture}`
                : `${PUBLIC_FOLDER}/person/noAvatar.png`
            }
            alt=""
            className="sharePersonProfileImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder="いま何してる?"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        <form className="shareButtons" onSubmit={(e) => handleSubmit(e)}>
          <div className="shareOptions">
            <label className="shareOption" htmlFor="file">
              <Image className="shareIcon" htmlColor="blue" />
              <span className="shareOptionText">写真</span>
              <input
                type="file"
                id="file"
                name="file"
                accept=" .png, .jpeg, .jpg"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Gif className="shareIcon" htmlColor="hotpink" />
              <span className="shareOptionText">GIF</span>
            </div>
            <div className="shareOption">
              <Face className="shareIcon" htmlColor="green" />
              <span className="shareOptionText">気持ち</span>
            </div>
            <div className="shareOption">
              <Analytics className="shareIcon" htmlColor="red" />
              <span className="shareOptionText">投票</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
};
