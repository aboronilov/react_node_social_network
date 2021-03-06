import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remome } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const HomeRightBar = () => {
    return (
      <div>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="birthday" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other freinds</b> have a birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };
  const ProfileRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: curentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(curentUser.followings.contains(user?.id));

    useEffect(() => {
      setFollowed(curentUser.followings.contains(user?.id));
    }, [curentUser, user.id]);

    useEffect(() => {
      const getFriends = async () => {
        try {
          const friendList = await axios.get("/users/friends/" + user._id);
          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    }, [user]);

    const handleClick = async () => {
      try {
        if (followed) {
          await axios.put("/users/" + user_id + "/unfollow/", {
            userId: curentUser._id,
          });
          dispatch({type: "UNFOLLOW", payload: user_id});
        } else {
          await axios.put("/users/" + user_id + "/follow/", {
            userId: curentUser._id,
          });
          dispatch({type: "FOLLOW", payload: user_id});
        }
      } catch (err) {
        console.log(err);
      }
      setFollowed(!followed);
    };

    return (
      <>
        {user.username !== curentUser.username && (
          <button className="rightBarFollowButton" onClick={handleClick}>
            {followed ? "Unflollow" : "Flollow"}
            {followed ? <Remome /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Maried"
                : user.relationship === 2
                ? "Single"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            <Link
              to={"profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
              ;
            </Link>;
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
