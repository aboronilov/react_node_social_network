const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update an user

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("User has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

// delete an user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

// get an user

router.get("/", async (req, res) => {
  const userId = req.query.userId
  const username = req.query.username
  try {
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({username: username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return User.findById(friendId)
      })
    )
    let friendList = []
    friends.map(friend=>{
      const {_id, username, profilePicture} = friend
      friendList.push({_id, username, profilePicture})
    })
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
})

// follow an user

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if (!userToFollow.followers.includes(req.body.userId)) {
                await userToFollow.updateOne({ $push: { followers: req.body.userId}})
                await currentUser.updateOne({ $push: { following: req.params.id}})
                res.status(200).json('You now follow this user')             
            } else {
                res.status(403).json("You allready follow this user");
            }
            
        } catch (err) {
            return res.status(500).json(err); 
        }    
    } else {
        res.status(403).json("You can't follow yourself");
    }    
});

// unfollow an user

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const userToUnFollow = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId)
            if (userToUnFollow.followers.includes(req.body.userId)) {
                await userToUnFollow.updateOne({ $pull: { followers: req.body.userId}})
                await currentUser.updateOne({ $pull: { following: req.params.id}})
                res.status(200).json("You don't follow this user")             
            } else {
                res.status(403).json("You do not follow this user");
            }
            
        } catch (err) {
            return res.status(500).json(err); 
        }    
    } else {
        res.status(403).json("You can't unfollow yourself");
    }    
});

module.exports = router;
