import React from 'react';
import './App.css';
import {withStyles} from '@material-ui/core/styles';
import Picture from "./Picture";
import Audio from "./Audio";
import Animated from "./Animated";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {green, purple} from '@material-ui/core/colors';
import {init, loadCards, changeDesc, changeTitle} from './actions/mainActs'
import {connect} from 'react-redux'

const PurpleButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

const GreenButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cur: 0,

        };
        props.init()
    }

    componentDidMount() {
        this.props.load()
    }

    _title = title => {
        this.props.changeTitle(this.state.cur, title)
    };
    _desc = description => {
        this.props.changeDesc(this.state.cur, description);
    };
    _clicked = () => {
        this.setState({cur: (this.state.cur + 1) % this.props.cards.length})
    };

    componentWillReceiveProps(nextProps, nextContext) {

    }

    render() {
        const item = this.props.cards[this.state.cur];
        return (
            <div className="App">
                {item && item.code === 0 &&
                <Picture image={item.image} {...item}
                         title={item.title} desc={item.description} titleSubmit={this._title} descSubmit={this._desc}/>
                }
                {item && item.code === 1 &&
                <Animated {...item}
                          title={item.title} desc={item.description} titleSubmit={this._title} descSubmit={this._desc}/>
                }
                {item && item.code === 2 &&
                <Audio sound={item.sound} {...item}
                       title={item.title} desc={item.description} titleSubmit={this._title} descSubmit={this._desc}/>
                }
                {item && item.tag === 'sport' &&
                <GreenButton variant="contained" color="primary" onClick={this._clicked}>
                    Try
                    <Icon>send</Icon>
                </GreenButton>}
                {item && item.tag === 'fun' &&
                <PurpleButton variant="contained" color="primary" onClick={this._clicked}>
                    Try
                    <Icon>send</Icon>
                </PurpleButton>}
                {item && item.tag === 'art' &&
                <Button variant="contained" color="primary" onClick={this._clicked}>
                    <p style={{color: '#fff'}}>Try</p>
                    <Icon>send</Icon>
                </Button>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.main.cards
});
const mapDispatchToProps = dispatch => ({
    init: () => dispatch(init()),
    load: () => dispatch(loadCards()),
    changeTitle: (idx, title) => dispatch(changeTitle(idx, title)),
    changeDesc: (idx, desc) => dispatch(changeDesc(idx, desc)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
