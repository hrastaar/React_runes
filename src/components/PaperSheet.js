import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import poppins from 'typeface-poppins'


class PaperSheet extends React.Component{
render(){
  console.log(this.props.summoner)
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