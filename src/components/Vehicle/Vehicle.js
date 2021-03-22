import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import { AttachMoney, People } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css';

const Vehicle = (props) => {
    const { id, title, image, capacity, price } = props.vehicle;
    const useStyles = makeStyles({
        root: {
            backgroundColor: "rgb(224, 220, 220)"
        },
        media: {
            height: 250,
            backgroundSize: "80%",
            backgroundPosition: " center",

        },
    });

    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root} lg={4} md={3}>
                <Link to={`/transport/${id}`}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions>
                    <People /> <strong>{capacity}</strong>

                    <AttachMoney style={{ float: "right" }} />
                    <strong>{`${price}`}</strong>

                </CardActions>
            </Card>
        </Grid>

    );
};

export default Vehicle;