
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { 
  TextField, Button, Grid,
  Select, MenuItem, FormControl,
  InputLabel, withStyles, Typography,
  Paper,
} from '@material-ui/core';
// import Select from 'react-select';
import propTypes from 'prop-types'

const styles = theme => ({
  main_form: { textAlign: 'center' }
}) 

const eventNameField = ({
  input, label, children, id,
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      required
      id={id}
      label={label}
      fullWidth
      type='text'
      children={children}
      {...input}
      />
  </FormControl>
)

const eventLocationField = ({
  input, children, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
    select
  >
    <InputLabel>{label}</InputLabel>
    <Select
      fullWidth
      {...input}
      children={children} />
  </FormControl>
)

const eventLimitField = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      {...input}
      fullWidth
      id={id}
      label={label}
      children={children}
      type='number'
      />
  </FormControl>
)

const eventDescriptionField = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      {...input}
      id={id}
      label={label}
      multiline
      rows='3'
      children={children}
      type='number'
      />
  </FormControl>
)

const eventDate = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField
      {...input}
      InputLabelProps={{ shrink: true}}
      id={id}
      children={children}
      type='date'
      label={label}
    />
  </FormControl>
)

const eventTime = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField
      {...input}
      InputLabelProps={{ shrink: true}}
      id={id}
      children={children}
      type='time'
      label={label}
    />
  </FormControl>
)

const EventForm = props => {
  const { onSubmit, classes, newEvent } = props;
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(newEvent);
  }

  return ( 
    <form onSubmit={handleSubmit}
      className={classes.main_form}>
      <Typography 
        variant='display1'
        children="Create An Event"
      />
      <Grid container justify='center' >
        <Grid container item xs='6' direction='column' >
          <Grid item>
            <Field 
              name='eventName'
              component={eventNameField}
              label='Event Name' />
          </Grid>

          <Grid container item spacing='16'>
            <Grid item xs='6'>
              <Field
                name='eventLocation' 
                component={eventLocationField}
                label='School' >
                <MenuItem value='city'> city </MenuItem>
                <MenuItem value='hunter'> hunter </MenuItem>
                <MenuItem value='bmcc'> bmcc </MenuItem>
              </Field>
            </Grid>

            <Grid item xs='6'>
              <Field
                name='eventLimit'
                component={eventLimitField}
                label='Limit' />
            </Grid>
          </Grid>

          <Grid container item spacing='16'>
            <Grid item xs='6' >
              <Field
                name='eventDate'
                component={eventDate}
                label='Date'
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='eventTime'
                component={eventTime}
                label='Time'
              />
            </Grid>
          </Grid>

            <Field
              name='eventDescription'
              component={eventDescriptionField}
              label="Event Description" />

          <Grid>
            <Button
              type='submit'
              fullWidth
              children='Create Event'
              color='primary'
            />
          </Grid>   
        </Grid>
      </Grid>
    </form>
  )
}

EventForm.propTypes = {
  newEvent: propTypes.object,
  onSubmit: propTypes.func.isRequired,
}

EventForm.defaultProps = {
  newEvent: '',
}

export default reduxForm({
  form: 'eventForm',
})(withStyles(styles)(EventForm))