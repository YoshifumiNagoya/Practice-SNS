import React from "react";
import { Online } from "../online/Online";
import "./RightBar.css";
import { Users } from "../../dummyData";

export const RightBar = ({ user }) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
      <>
        <div className="eventContainer">
          <img src={`${PUBLIC_FOLDER}/star.png`} alt="" className="startImg" />:
          <span className="eventText">
            <b>フォロワーイベント開催中!</b>
          </span>
        </div>
        <img src={`${PUBLIC_FOLDER}/event.jpeg`} alt="" className="eventImg" />
        <h4 className="rightBarTitle">オンラインの友達</h4>
        {Users.map((user) => (
          <Online user={user} key={user.id} />
        ))}

        <ul className="rightBarFriendList"></ul>
        <p className="promotionTitle">プロモーション広告</p>
        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion1.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">ショッピング</p>

        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion2.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">カーショップ</p>

        <img
          src={`${PUBLIC_FOLDER}/promotion/promotion3.jpeg`}
          alt=""
          className="rightBarPromotionImg"
        />
        <p className="promotionName">ShinCode株式会社</p>
      </>
    );
  };
  // profile関数コンポーネント
  const ProfileRightBar = () => {
    return (
      <>
        <h4 className="">ユーザー情報</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">出身:</span>
            <span className="rightBarInfoKey">福岡:</span>
          </div>
          <h4 className="rightBarTitle">あなたの友達</h4>
          <div className="rightBarFollowings">
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Hanako</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Takeshi</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Yamada</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Satou</span>
            </div>
            <div className="rightBarFollowing">
              <img
                src={`${PUBLIC_FOLDER}/person/1.jpeg`}
                alt=""
                className="rightBarFollowingImg"
              />
              <span className="rightBarFollowingName">Sol</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  // 共通のもの
  return (
    <div className="rightbar">
      <div className="rightBarWrapper">
        {/* userが存在したらProfile画面 */}
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};
