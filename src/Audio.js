import React, {useState, useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField"
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

const colors = {
    sport: 'rgba(138,187,135,0.79)',
    fun: 'rgba(216,165,215,0.84)',
    art: 'rgba(177,182,215,0.81)'
};

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const toggle = () => setPlaying(!playing);
    audio.onended = () => toggle();

    useEffect(
        () => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    return [playing, toggle];
};

export const withHooksHOC = (Component) => {
    return (props) => {
        const [playing, toggle] = useAudio(props.sound);

        return <Component playing={playing} toggle={toggle} {...props} />;
    };
};

const classes = {
    textField: {
        width: 200,
    },
};

class MAudio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleEditing: false,
            descEditing: false,
            temp: '',
        }
    }

    _onChange = temp => {
        this.setState({temp: temp.target.value})
    };
    _onFinish = w => {
        if (w === 0) {
            console.log('temp', this.state.temp)
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
                <div className={classes.details}>
                </div>
                <CardActionArea>
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
                        <div className={classes.controls}>
                            <IconButton aria-label="play/pause" onClick={this.props.toggle}>
                                {!this.props.playing ? <PlayArrowIcon className={classes.playIcon}/> :
                                    <PauseIcon className={classes.playIcon}/>}
                            </IconButton>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }

}

export default withHooksHOC(MAudio)