

import React, {Fragment, useEffect} from 'react';


import { Button, Dialog, Grid, } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import RSVP from '../RSVP';
import RSVP2 from '../RSVP2/RSVP2';
import RSVPCUSTOM from '../RSVP/custom';
import { useGlobalState } from '../../data/globalState';

const WelcomeModal = ({}) => {
    const {state, dispatch} = useGlobalState();

      const setOpen = (value)=>{
        dispatch({
          type:"OPEN_WELCOME_MODAL",
          payload: value
        })
      }
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const styles = (theme) => ({
        root: {
          margin: 0,
          padding: theme.spacing(2),
        },
        closeButton: {
          position: 'absolute',
          right: theme.spacing(1),
          top: theme.spacing(1),
          color: theme.palette.grey[500],
        },
      });

    const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <i className="ti-close"></i>
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        );
      });


    return (
        <Fragment>
            <Dialog
                open={state.welcomeModal}
                onClose={handleClose}
                className="modalWrapper quickview-dialog "
               maxWidth="lg"
               fullWidth
            >
                <DialogTitle id="customized-dialog-title"  onClose={handleClose}>
                </DialogTitle>
                <Grid className="modalBody modal-body " >
                    <Grid className="modalBody modal-body">
                        <RSVPCUSTOM handleClose />
                    </Grid>
                </Grid>
            </Dialog>
        </Fragment>
    );
}
export default WelcomeModal


