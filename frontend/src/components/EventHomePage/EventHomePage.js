import React, { Component } from 'react';
//import {StaticGoogleMap} from 'react-google-static-map';
import Calendar from 'react-calendar';
import styles from './EventHomePage.styles';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { studyIcon, CCNY } from '../../images';
import {

    Typography, Grid, withStyles, Paper, Divider, Toolbar,
    Button, Card, CardContent, CardMedia, CardActionArea

} from '@material-ui/core';

class EventHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            Joined: false,
            notInterested: false,
        }
        //this.handleJoin = this.handleJoin.bind(this);

    }




    render() {
        const { classes, event, eventAttendees, campusInfo } = this.props;
        console.log("This.Props[0]", this.props);


        const bull = <span className={classes.bullet}>•</span>;

        const renderProfileCards = () => {
            let profileCard;
            if (eventAttendees.length > 0) {
                profileCard = eventAttendees.map((student, index) =>
                    <Grid key={index} item sm={3} spacing={16} >
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia className={classes.media} image={studyIcon} />
                                <CardContent>
                                    <Typography align="center" variant="bus">
                                        {student.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            } else {
                profileCard = <Typography variant="subtitle1" color="textSecondary"> No one is attend this event yet </Typography>
            }
            return (profileCard);

        }
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12} spacing={16}>
                    <Grid className={classes.main_grid} container sm={12}>
                        <Grid container sm={2}>
                            <Grid className={classes.item_grid_left} item sm={12}>
                                <Typography className={classes.pos} color="textSecondary">
                                    Google map not yet available
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid container sm={6}>
                            <Grid item sm={12}>
                                <h1>{event.title}</h1>
                            </Grid>

                            <Grid item sm={12}>
                                <Typography className={classes.pos} color="textSecondary">
                                    {`Organizer: ${event.owner}`}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Study Group
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {`Campus: ${campusInfo.name}`}
                                </Typography>
                            </Grid>
                        </Grid>



                        <Grid justify="center" container sm={4}>
                            <Grid item justify="center" sm={12}>
                                <Typography className={classes.pos} color="textSecondary">
                                    Interest in this topic?  {bull} {`${eventAttendees.length} students are going`}
                                </Typography>
                                <Divider />
                                <Button disabled={this.props.Joined} onClick={this.props.handleJoinEvent}>Join</Button>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Grid>


                    <Grid className={classes.main_grid} container row sm={12}>
                        <Grid container sm={2}>
                        </Grid>
                        <Grid container spacing={16} sm={6}>
                            <Grid item sm={12}>
                                <h2>Detials</h2>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography variant="body2">
                                    {event.details}
                                </Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Attending
                                </Typography>
                                <Divider />
                            </Grid>

                            {renderProfileCards()}

                        </Grid>
                        <Grid container className={classes.item_grid_left} sm={4}>
                            <Grid item sm={12}>
                                <Calendar value={event.date} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventHomePage);
