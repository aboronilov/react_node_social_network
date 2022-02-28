import React from 'react';
import './closefriend.css'


export default function CloseFriend({user}) {
    return (
        <div>
            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={user.profilePicture} alt="avatar"></img>
                <span className='sidebarFriendName'>{user.username}</span>
            </li>
        </div>
    );
}

