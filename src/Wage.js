import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AddCircleOutline from '@material-ui/icons/AddCircleOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        display: 'flex',        
    },
    formControl: {
        margin: theme.spacing(3),
        fontWeight: '500'
    },
    label: {
        fontWeight: '700',
        '& span': {
            fontWeight: '700'
        }
    },
    active: {
        color: 'black'
    },
    muted: {
        color: '#A8A8A8'
    },
    group: {
        margin: theme.spacing(1, 2),
        fontWeight: '700'
    },
    subtitle: {
        textAlign: 'left',
        fontSize: '14px',
        fontWeight: '700',
        color: '#A8A8A8'
    },
    textField: {
        fontWeight: '700',
        [`& fieldset`]: {
            borderRadius: '30px',
          },
        [`& input`]: {
            padding: '10px',
        },
    },   
    bold: {
        fontWeight: '700'
    },
    boldLabel: {
        fontWeight: '700',
        fontSize: '18px'
    },
    button: {
        margin: theme.spacing(0),
      },
    rotated45: {
        transform: 'rotate(45deg)',
        position: 'relative'
    },
    message: {
        clipPath: 'polygon(100% 9%, 100% 100%, 0 100%, 0 0, 5% 9%)',
        backgroundColor: '#5E6CAB',
        color: '#FFFFFF',
        fontWeight: '700',
        maxWidth: '30ch',
        minWidth: '25ch',
        padding: theme.spacing(3,3),
        textAlign: 'left',
        position: 'absolute',
        left: '45%',
        top: '30%',
        zIndex: '1000'
    },
    paper: {
        alignSelf: 'center',
        textAlign: 'left',
        maxWidth: 'max-content',
        padding: theme.spacing(3,3),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#FBF4DA'
    }
  });


class Wage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wageType: 'permonth',
            ndflNotInc: true,
            paperIsVisible: true,
            net: 0,
            ndfl: 0,
            gross: 0,
            sum: 40000,
            mrot: 11280,
            tooltipShow: false,
            tooltipKeep: false,
            mrotMessage: "МРОТ - минимальный размер оплаты труда. Разный для разных регионов" 
        };
    }

    handleChange = (e) => {
        if(e.target.name === 'wageType')
        {
            var paperIsVisible = e.target.value ==='permonth' || e.target.value ==='mrot' ? true : false;
        }
        else {
            paperIsVisible = this.state.paperIsVisible;
        }
        
        if(e.target.name === 'wageType' && e.target.value ==='mrot') {
            var sum = this.state.mrot;
        }
        else {
            sum = this.state.sum;
        }
        this.setState({ [e.target.name]: e.target.value,
                        paperIsVisible,
                        sum}, 
                        this.handleSumChange);
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value}, this.handleSumChange);
    }

    handleSumChange = (e) => {
        var sum = this.state.sum;
        var net =   this.state.ndflNotInc ? (sum*1) : (sum*0.87);
        var ndfl =  this.state.ndflNotInc ? (sum/87*13) : (sum*0.13)  ;
        var gross = this.state.ndflNotInc ? (sum/87*100) : (sum*1) ;
        this.setState({ net, ndfl, gross, sum });
    }

    handleNDFL = (e) => {
        this.setState({ndflNotInc: !this.state.ndflNotInc }, this.handleSumChange);
    }

    handleMrotClick = () => {
        this.setState({tooltipKeep: !this.state.tooltipKeep});
    }

    handleMrotHover = () => {
        this.setState({tooltipShow: !this.state.tooltipShow});
    }

    componentDidMount() {
        this.handleSumChange();
    }

    render() {
        const { wageType, ndflNotInc, sum, gross, net, ndfl, paperIsVisible, mrotMessage, tooltipKeep, tooltipShow } = this.state;
        const { classes }  = this.props;

          const IOSSwitch = withStyles(theme => ({
            root: {
              width: 42,
              height: 26,
              padding: 0,
              margin: theme.spacing(1),
            },
            switchBase: {
              padding: 1,
              '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                  backgroundColor: '#F8A432',
                  opacity: 1,
                  border: 'none',
                },
              },
              '&$focusVisible $thumb': {
                color: '#F8A432',
                border: '6px solid #fff',
              },
            },
            thumb: {
              width: 24,
              height: 24,
            },
            track: {
              borderRadius: 26 / 2,
              border: `1px solid ${theme.palette.grey[400]}`,
              backgroundColor: theme.palette.grey[50],
              opacity: 1,
              transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
          }))(({ classes, ...props }) => {
            return (
              <Switch
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                  root: classes.root,
                  switchBase: classes.switchBase,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
                {...props}
              />
            );
          });
        
        var mrotIcon; 
        if(this.state.tooltipKeep) {
            mrotIcon = <AddCircleOutline className={classes.rotated45}/>;
        }
        else {
            mrotIcon = <InfoIcon />;
        }
        var labelClassNDFL;
        var labelClassNoNDFL;
        if(this.state.ndflNotInc) {
            labelClassNDFL = classes.muted;
            labelClassNoNDFL = classes.active;
        } else {
            labelClassNDFL = classes.active;
            labelClassNoNDFL = classes.muted;
        }

        return (
            <div>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend" className={classes.subtitle}>Сумма</FormLabel>
                    <RadioGroup
                        aria-label="Тип оплаты"
                        name="wageType"
                        className={classes.group}
                        value={wageType}
                        onChange={this.handleChange}
                        >
                        <FormControlLabel value="permonth" control={<Radio color="default"/>} label="Оклад за месяц" className={classes.label}/>
                        <Grid container alignItems="center">
                        <FormControlLabel value="mrot"     control={<Radio color="default"/>} label="МРОТ" className={classes.label}/>
                            <IconButton className={classes.button} size="small" aria-label="Info" onClick={this.handleMrotClick} onMouseOver={this.handleMrotHover} onMouseOut={this.handleMrotHover}>
                                {mrotIcon}
                            </IconButton>
                            {
                                (tooltipShow || tooltipKeep)
                                &&
                                <div className={classes.message}>
                                    {mrotMessage}
                                </div>
                            }
                            
                        </Grid>
                        <FormControlLabel value="perday"   control={<Radio color="default"/>} label="Оплата за день" className={classes.label}/>
                        <FormControlLabel value="perhour"  control={<Radio color="default"/>} label="Оплата за час" className={classes.label}/>
                        </RadioGroup>
                        <Grid component="label" container alignItems="center" spacing={1}>
                            <Grid item>
                                 <Typography component="span" className={labelClassNDFL}>Указать с НДФЛ</Typography>
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    control={
                                    <IOSSwitch
                                        checked={ ndflNotInc }
                                        onChange={ this.handleNDFL }
                                        value={ ndflNotInc }
                                    />
                                    }
                                    className={labelClassNoNDFL}
                                    label="Без НДФЛ"
                                />
                            </Grid>
                        </Grid>
                    <Grid component="label" container alignItems="center" spacing={2}>
                        <Grid item>
                            <TextField
                                id="sum"
                                className={classes.textField}
                                value={sum}
                                margin="normal"
                                variant="outlined"
                                name="sum"
                                onChange={this.handleInputChange}   
                            />
                        </Grid>
                        <Grid item className={classes.boldLabel}>
                            <span >  &#8381; </span>
                        </Grid>
                    </Grid>
                </FormControl>
                {paperIsVisible && 
                    <Paper className={classes.paper}>
                        <Typography component="p">
                            <span className={classes.bold}>{ net.toLocaleString('ru-RU',{maximumFractionDigits: 0}) }  &#8381; </span> сотрудник будет получать на руки
                        </Typography>
                        <Typography component="p">
                            <span className={classes.bold}>{ ndfl.toLocaleString('ru-RU',{maximumFractionDigits: 0}) }  &#8381; </span>НДФЛ, 13% от оклада
                        </Typography>
                        <Typography component="p">
                            <span className={classes.bold}>{ gross.toLocaleString('ru-RU',{maximumFractionDigits: 0}) }  &#8381; </span>за сотрудника в месяц
                        </Typography>
                    </Paper>
                }
            </div>
        )
    }
}

Wage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Wage);
