import React from "react";
import {Typography} from "@material-ui/core";

const PopupInfo = ({title, description}) => {
  const staticData = {
    title: 'Title',
    description: 'Description'
  }
  return (
    <div>
      <Typography variant="h6" component="h6">
        {staticData.title}: {title}
      </Typography>
      <Typography variant="p" component="p">
        {staticData.description}: {description}
      </Typography>
    </div>
  )
}
export default PopupInfo;