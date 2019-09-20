import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import RuneItem from "./RuneItem";

class PaperSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      summonerId: "",
      participantArray: [],
      perks: null,
      perksArr: [],
      perkStyle:'',
      perkSubStyle:''
    };
  }

  render() {
    const searchBtn = document.getElementById("search-btn");
    searchBtn.onclick = () => {
      let jsonObj = null;
      loadData().then(res => {
        jsonObj = JSON.parse(res);
        this.setState({
          summonerId: jsonObj.id
        });
        console.log(jsonObj.id);
        loadIngameData(jsonObj.id).then(res => {
          let jsonObj = JSON.parse(res);
          console.log(jsonObj.participants);

          jsonObj.participants.forEach(participantObj => {
            if (participantObj.summonerId === this.state.summonerId) {
              console.log("found summoner in the list");
              this.setState({
                perks: participantObj.perks,
                perksArr: participantObj.perks.perkIds,
                perkStyle: participantObj.perks.perkStyle,
                perkSubStyle: participantObj.perks.perkSubStyle,
              });
              console.log(participantObj);
            }
          });
        });
      });
    };

    function loadData() {
      const userName = document.getElementById("textField").value;
      const url =
        "https://corsproxy2213.herokuapp.com/?q=https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
        userName +
        "?api_key=RGAPI-992e7fb7-f222-4c20-a153-cb1962f4b99d";
      //implement fetch here
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);

        req.onload = function() {
          if (req.status === 200) {
            console.log(req.response);
            document.getElementById("root").style.display = "block";
            resolve(req.response);
          } else {
            reject(
              alert(
                "The summoner you serached for doesn't appear to be in a game"
              )
            );
          }
        };
        req.send();
      });
    }

    //The summoner has to be in an active game to gather the data
    function loadIngameData(val) {
      const url =
        "https://corsproxy2213.herokuapp.com/?q=https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" +
        val +
        "?api_key=RGAPI-992e7fb7-f222-4c20-a153-cb1962f4b99d";
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open("GET", url);

        req.onload = function() {
          if (req.status === 200) {
            resolve(req.response);
          } else {
            reject(
              alert(
                "The summoner you serached for doesn't appear to be in a game"
              )
            );
          }
        };
        req.send();
      });
    }

    if (this.state.perks == null) {
      return (
        <div>
          <Paper>
            <Typography
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginTop: 50
              }}
            >
              Selected Runes
            </Typography>
            <Typography component="p" style={{ fontFamily: "Poppins" }}>
              {this.state.summonerId}
            </Typography>
          </Paper>
        </div>
      );
    } else {
      return (
        <div>
          <Paper>
            <Typography

              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                marginTop: 50,
                fontSize: 45
              }}
            >
              Selected Runes
            </Typography>
            <Typography component="p" style={{ fontFamily: "Poppins" }}>
              {this.state.perksArr.map(currentPerk => {
                return <RuneItem perkNumber={currentPerk} perkStyle={this.state.perkStyle} perkSubStyle={this.state.perkSubStyle}></RuneItem>;
              })}
            </Typography>
            {}
          </Paper>
        </div>
      );
    }
  }
}

export default PaperSheet;
