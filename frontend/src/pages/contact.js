import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import clsx from "clsx"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Link } from "gatsby"

import address from '../images/address.svg'
import Email from '../images/EmailAdornment.js'
import send from '../images/send.svg'
import nameAdornment from '../images/name-adornment.svg'
import PhoneAdornment from '../images/PhoneAdornment.js'

import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"
//import Seo from "../components/ui/seo"

const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '45rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '10rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '8rem',
      height: '90rem',
    },
  },
  formContainer: {
    height: '100%',
  },
  formWrapper: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: '50%',
      marginTop: '-8rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: '8rem',
    width: '40rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '30rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  titleContainer: {
    marginTop: '-4rem',
  },
  buttonContainer: {
    marginBottom: '-4rem',
    textTransform: 'none',
    borderRadius: '0',
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    }
  },
  sendIcon: {
    marginLeft: '2rem',
  },
  contactInfo: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
  },
  contactIcon: {
    height: '3rem',
    width: '3rem',
  },
  contactEmailIcon: {
    height: '2.25rem',
    width: '3rem',
  },
  infoContainer: {
    height: '21.25rem',
    [theme.breakpoints.down('sm')]: {
      height: '15.25rem',
    },
  },
  middleInfo: {
    borderTop: '2px solid #fff',
    borderBottom: '2px solid #fff',
  },
  iconContainer: {
    borderRight: '2px solid #fff',
    height: '7rem',
    width: '8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      height: '5rem',
      width: '6rem',
    },
  },
  textField: {
    width: '30rem',
    [theme.breakpoints.down('sm')]: {
      width: '20rem',
    },
  },
  input: {
    color: '#fff',
  },
  fieldContainer: {
    marginBottom: '1rem',
  },
  multilineContainer: {
    marginTop: '1rem',
  },
  emailAdornment: {
    height: 17,
    width: 22,
    marginBottom: '10px',
  },
  phoneAdornment: {
    width: 25.173,
    height: 25.122,
  },
  multiline: {
    border: '2px solid #fff',
    borderRadius: 10,
    padding: '1rem',
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`
  },
  buttonDisabled: {
    backgroundColor: theme.palette.grey[500],
  },
  sendMessage: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '2.5rem',
    },
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: '2px solid #fff',
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
  },
}))

const ContactPage = () => {
  const classes = useStyles()
  const theme = useTheme()

  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

  const [values, setValues] = useState({name: "", email: "", phone: "", message: ""})
  const [errors, setErrors] = useState({})

  const fields = {
    name: {
      helperText: "you must enter a name",
      placeholder: "Name",
      adornment: (<img src={nameAdornment} alt="name" />),
    },
    email: {
      helperText: "invalid email",
      placeholder: "Email",
      adornment: (<div className={classes.emailAdornment}>
        <Email color={theme.palette.secondary.main} /></div>),

    },
    phone: {
      helperText: "invalid phone",
      placeholder: "Phone Number",
      adornment: (<div className={classes.phoneAdornment}>
        <PhoneAdornment color={theme.palette.secondary.main} />
      </div>),
    },
    message: {
      helperText: "you must enter a message",
      placeholder: "Message",
      inputClasses: {
        multiline: classes.multiline, 
        error: classes.multilineError
      },
    },
  }

  const disabled = Object.keys(errors).some(error => errors[error] === true) || 
  Object.keys(errors).length !== 4

  return (
    <Layout>
      <Grid 
        container 
        justifyContent="space-around" 
        alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? "column" : "row"}
      >
        {/* Contact Form */}
        <Grid 
          item 
          classes={{ root: classes.formWrapper }}
        >
          <Grid 
            container 
            direction="column" 
            justifyContent="space-between"
            alignItems="center" 
            classes={{ root: classes.formContainer }}
          >
            <Grid 
              item 
              classes={{ root: clsx(classes.titleContainer, classes.blockContainer)}}>
              <Typography variant="h4">
                Contact Us
              </Typography>
            </Grid>

            <Grid item>
              <Grid container direction="column">
                {Object.keys(fields).map(field => {
                  const validateHelper = (event) => {
                    const valid = validate({ [field]: event.target.value })
                        setErrors({ ...errors, [field]: !valid[field] })
                  }

                  return (
                    <Grid item classes={{ root: field === "message" ? 
                      classes.multilineContainer : classes.fieldContainer }}>
                      <TextField 
                        value={values[field]} 
                        onChange={e => {
                          if (errors[field]) {validateHelper(e)}
                          setValues({...values, [field]: e.target.value})
                        }}
                        onBlur={e => {validateHelper(e)}}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        placeholder={fields[field].placeholder} 
                        classes={{ root: classes.textField }}
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        InputProps={{ 
                          classes: { input: classes.input, ...fields[field].inputClasses }, 
                          disableUnderline: field === "message",
                          startAdornment: (
                            <InputAdornment position="start">
                              {fields[field].adornment}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>

            <Grid 
              item 
              component={Button}
              disabled={disabled}
              classes={{ root: clsx(classes.buttonContainer, classes.blockContainer, {
                [classes.buttonDisabled]: disabled,
              })}}
            >
              <Typography variant="h4" classes={{ root: classes.sendMessage}}>
                send message
              </Typography>
              <img src={send} className={classes.sendIcon} alt="send message" />
            </Grid>
          </Grid>
        </Grid>
        {/* Contact Info */}
        <Grid item>
          <Grid 
            container 
            direction="column" 
            justifyContent="space-between" 
            classes={{ root: classes.infoContainer }}
          >
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <img src={address} className={classes.contactIcon} alt="address" />
              </Grid>
              <Grid item>
                <Typography variant="h2" classes={{ root: classes.contactInfo }}>
                  1234 S Example St {matchesXS ? <br /> : null} Wichita, KS 67111
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center" classes={{ root: classes.middleInfo }}>
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactIcon}>
                  <PhoneAdornment color="#fff" />
                </div>
              </Grid>
              <Grid item>
                <Typography variant="h2" classes={{ root: classes.contactInfo }}>
                  (555) 555-5555
                </Typography>
              </Grid>
            </Grid>
            <Grid item container alignItems="center">
              <Grid item classes={{ root: classes.iconContainer }}>
                <div className={classes.contactEmailIcon}>
                  <Email color="#fff"/>
                </div>
              </Grid>
              <Grid item>
                <Typography variant="h2" classes={{ root: classes.contactInfo }}>
                  contact@var-x.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage