import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import poppins from 'typeface-poppins'


class PaperSheet extends React.Component{
  constructor(props){
    super(props)
  }
  
render(){
  const searchBtn = document.getElementById('search-btn')
  searchBtn.onclick  = function(){
    loadData().then(res=> {
      this.setStae = {
        summonerObject: res
      }
    })
  }

  function loadData() {
    const url =
      'https://corsproxy2213.herokuapp.com/?q=https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=RGAPI-77f1c292-674d-4fdd-8ecc-a495a3bdbf01';
    //implement fetch here
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url)

      req.onload = function () {
        if (req.status == 200) {
          console.log(req.response)
          document.getElementById('root').style.display = 'block'
          resolve(req.response)
        } else {

          reject(alert("The summoner you serached for doesn't appear to be in a game"))
        }
      };
      req.send();
    });
  }
  
  return (
    <div>
      <Paper>
        <Typography variant="h5" component="h3" style={{fontFamily:'Poppins' ,fontWeight:'bold', marginTop:50}} >
          Selected Runes
        </Typography>
        <Typography component="p" style={{fontFamily:'Poppins'}}>
          Paper can be used to build surface or other elements for your application.
        </Typography>

      </Paper>
    </div>
  );
}
}

export default PaperSheet