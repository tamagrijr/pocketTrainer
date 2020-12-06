import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles({
  root: {
    maxWidth: '20em',
  },
  stared: {
    color: '#FFE031',
  },
});

export default function RoutineCard({ routine, editable, stared }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} raised>
      <CardActionArea>
        <CardContent>
          <Grid container wrap='nowrap' justify='space-between' alignItems='center' alignContent='center'>
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                {routine.name}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems='center' alignContent='center'>
                <Grid item>
                  {stared ? <StarRateIcon className={classes.stared} /> : <StarRateIcon />}
                </Grid>
                <Grid item>
                  <Typography variant='caption'>{routine.upvotes.length}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="body2" color="textSecondary" component="p">
            {routine.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {routine.tags.map((tag, i) => {
          return (
            <Button key={`${routine.name} tag ${i}`} size="small" color="secondary">
              {tag.name}
            </Button>
          )
        })}
      </CardActions>
    </Card>
  )
}
