import "./topbar.css"
import {Search, Person, Chat, Notifications} from '@material-ui/icons'

const Topbar = () => {
    return(
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <span className="logo">Coolsite</span>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for friends, posts or video" className="searchinput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/person/1.jpg" alt="avatar" className="topbarImg" />
            </div>
        </div>
    )
}

export default Topbar;

// 25 m