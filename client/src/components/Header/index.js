import React from 'react'
import Typopgraphy from '@material-ui/core/Typography'
import useStyles from './style';

export default function Header() {
    const classes = useStyles()
    return <Typopgraphy variant="h4" align="center" className={classes.container} >Blog</Typopgraphy>;
}
