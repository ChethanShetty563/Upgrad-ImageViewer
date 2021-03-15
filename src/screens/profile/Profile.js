import React, { Component } from "react";
import Header from "../../common/header/Header";
import profileImg from "../../assets/images/upgrad.svg";
import "./Profile.css";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";


function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


  const styles = (theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: "20px",
      outline: "none",
      borderRadius: "5px",
      borderColor: "gray",
      borderStyle: "solid",
    },
  
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "95%",
      height: 750,
      cursor: "pointer",
      overflow: "hidden",
    },
  });
  
class Profile extends Component {

    constructor() {
        super();
        this.state = {
          profilePic: profileImg,
          endpoint1: [],
          username: "",
          totalPostCount: 0,
          NumOfUsersFollowed: Math.floor(Math.random() * 100),
          NumOfFollowers: Math.floor(Math.random() * 100),
          fullName: "Chethan Shetty",
          editModal: false,
          nameRequired: "dispNone",
          name: "",
          postList: [],
          postModal: false,
          imageUrl: "",
          caption: "",
          tags: [],
          postComments: [],
          likeIcon: "",
          likedIcon: "",
          likesCount: 0,
          postId: 0,
          comment: "",
        };
      }
    
      // Invoking APIs when component mounts
      componentDidMount() {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let accessToken = window.sessionStorage.getItem("access-token");
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            that.setState({
              endpoint1: JSON.parse(this.responseText).data,
            });
            that.setState({
              totalPostCount: that.state.endpoint1 && that.state.endpoint1.length,
            });
            //Calling 2nd API only if we get response from 1st API
            that.state.endpoint1 &&
              that.state.endpoint1.map((info) => {
                return that.getImages(info);
              });
          }
        });
    
        // https://graph.instagram.com/me/media?fields=id,caption&access_token=YourAccessToken
    
        xhr.open(
          "GET",
          this.props.baseUrl +
            "me/media?fields=id,caption&access_token=" +
            accessToken
        );
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
      }

      getImages(info) {
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        let accessToken = window.sessionStorage.getItem("access-token");
        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
            let parsedData = JSON.parse(this.responseText);
            let newStateArray;
            let post = {};
            post.id = parsedData.id;
            post.caption = info.caption || "This is default caption";
            post.media_url = parsedData.media_url;
            post.profilePic = that.state.profilePic;
            post.username = parsedData.username;
            post.likeIcon = "dispBlock";
            post.likedIcon = "dispNone";
            post.likesCount = Math.floor(Math.random() * 10);
            post.clear = "";
            post.tags = post.caption.match(/#\S+/g);
            post.postComments = [];
            post.timestamp = new Date(parsedData.timestamp);
            newStateArray = that.state.postList.slice();
            newStateArray.push(post);
            that.setState({
              postList: newStateArray,
            });
          }
        });
    
        //graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=YourAccessToken
        xhr.open(
          "GET",
          this.props.baseUrl +
            info.id +
            "?fields=id,media_type,media_url,username,timestamp&access_token=" +
            accessToken
        );
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
      }

    render() {
        const { classes } = this.props;
        return (
            <div>

            </div>

);
}
}

export default withStyles(styles)(Profile);
