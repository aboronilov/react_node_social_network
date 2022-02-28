import React from 'react';
import './online.css'

export default function Online({user}) {
    return (
        <div>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgConatainer">
                    <img className="rightbarProfileImg" src={user.profilePicture} alt="avatar" />
                    <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUserName">{user.username}</span>
            </li>
        </div>
    );
}
