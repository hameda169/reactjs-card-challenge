import React from 'react'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const colors = {
    sport: 'rgba(138,187,135,0.79)',
    fun: 'rgba(216,165,215,0.84)',
    art: 'rgba(177,182,215,0.81)'
};
const classes = {
    textField: {
        width: 200,
    },
};
export default class Picture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEditing: false,
            descEditing: false,
            temp: ''
        }
    }

    _onChange = temp => {
        this.setState({temp: temp.target.value})
    };
    _onFinish = w => {
        if (w === 0) {
            console.log('temp', this.state.temp);
            this.props.titleSubmit(this.state.temp)
        }
        if (w === 1) {
            this.props.descSubmit(this.state.temp)
        }
        this.setState({titleEditing: false, descEditing: false, temp: ''})
    };
    _clicked = w => {
        this.setState({
            titleEditing: w === 0,
            descEditing: w === 1,
            temp: w === 0 ? this.props.title : this.props.desc
        })
    };

    render() {
        const {props} = this;
        return (
            <Card className="card" style={{backgroundColor: colors[props.tag]}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        backgroundSize="cover"
                        alt="Contemplative Reptile"
                        height="200"
                        image={props.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        {this.state.titleEditing ? <>
                            <TextField
                                id="standard-name"
                                label="Title"
                                className={classes.textField}
                                value={this.state.temp}
                                onChange={this._onChange}
                                margin="normal"
                            />
                            <IconButton color="primary" aria-label="edit" className={classes.fab}
                                        onClick={() => this._onFinish(0)}>
                                <Icon>add_circle</Icon>
                            </IconButton>
                        </> : <Typography gutterBottom variant="h5" component="h2">
                            {props.title + "  "}
                            <IconButton color="primary" aria-label="edit" className={classes.fab}
                                        onClick={() => this._clicked(0)}>
                                <Icon>edit_icon</Icon>
                            </IconButton>
                        </Typography>}
                        {this.state.descEditing ? <>
                            <TextField
                                id="standard-name"
                                label="Description"
                                className={classes.textField}
                                value={this.state.temp}
                                onChange={this._onChange}
                                margin="normal"
                            />
                            <IconButton color="primary" aria-label="edit" className={classes.fab}
                                        onClick={() => this._onFinish(1)}>
                                <Icon>add_circle</Icon>
                            </IconButton>
                        </> : <Typography variant="body2" color="textSecondary" component="p">
                            {props.desc + "  "}
                            <IconButton color="primary" aria-label="edit" className={classes.fab}
                                        onClick={() => this._clicked(1)}>
                                <Icon>edit_icon</Icon>
                            </IconButton>

                        </Typography>
                        }
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

}