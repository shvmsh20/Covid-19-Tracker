import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import "./InfoBox.css"

function InfoBox({handleClick, title, cases, active, isRed, total}) {
  return (
    <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}
    onClick={handleClick}>
        <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
            <Typography className="infoBox__total" color="textSecondary">
                {total} Total
            </Typography>
        </CardContent>
    </Card>
  )
}

export default InfoBox;