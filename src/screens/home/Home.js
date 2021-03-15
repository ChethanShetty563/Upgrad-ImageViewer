import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import profileImg from "../../assets/images/upgrad.svg";

const useStyles = (theme) => ({
    media: {
      height: 150,
      paddingTop: "56.25%", // 16:9,
    },
  });
  
  class Home extends Component {

    constructor() {
        super();
        this.state = {
          profilePic: profileImg,
          endpoint1: [],
          postListForSearch: [],
          postList: [],
          likeIcon: "dispBlock",
          likedIcon: "dispNone",
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
    

render() {
    const { classes } = this.props;
    return (
      <div>

</div>
    );
}
  
}

export default withStyles(useStyles)(Home);