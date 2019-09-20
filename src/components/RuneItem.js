import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles(theme => ({
//   card: {
//     display: "flex",
//     margin: 30
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column"
//   },
//   content: {
//     flex: "1 0 auto"
//   },
//   cover: {
//     width: 151
//   },
//   controls: {
//     display: "flex",
//     alignItems: "center",
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1)
//   },
//   playIcon: {
//     height: 38,
//     width: 38
//   }
// }));

// export default function RuneItem(props) {
class RuneItem extends React.Component{

constructor(props){
  super(props)
  this.state ={
    currentRune:{},
    imageLink: ''
  }
}

render(){
  fetch(
    "http://ddragon.leagueoflegends.com/cdn/9.17.1/data/en_US/runesReforged.json"
  )
    .then(res => res.json())
    .then(out => {
        console.log(out)
        for(let j =0; j <5; j++){
              if(this.props.perkStyle == out[j].id){
                for(let m =0; m < 4; m++){
                  for(let n =0; n < 3; n++){
                    
                    if(out[j].slots[m].runes[n].id == this.props.perkNumber){
                      // currentRune = element.slots[m].runes[n]
                      console.log(out[j].slots[m].runes[n])
                      this.setState({
                        currentRune: out[j].slots[m].runes[n],
                        imageLink : "http://ddragon.leagueoflegends.com/cdn/img/" + out[j].slots[m].runes[n].icon
                      })
                      break
                    
                  }                  
                }
              }
            }
        }
    })
    .catch(err => console.error(err));

  return (
    <Card style={{maxWidth: 700, display: 'block', margin: '0 auto', marginTop: 50 }}>
              <CardMedia
        image= {this.state.imageLink}
        title="Live from space album cover"
        style={{
            width:64,
            height:64,
            margin: '0 auto'
        }}
      />
      <div>
        <CardContent style={{flex: '1 0 auto'}}>
          <Typography component="h5" variant="h5" style={{fontFamily: 'Poppins'}}>
            {this.state.currentRune.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" style={{fontFamily: 'Poppins'}}>
            {this.state.currentRune.shortDesc}
          </Typography>
        </CardContent>
      </div>

    </Card>
  );
}
}

export default RuneItem
