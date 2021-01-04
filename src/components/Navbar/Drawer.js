import React from "react";
import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AboutIcon from '@material-ui/icons/Satellite';
import {withRouter} from "react-router-dom";

const Drawer = (props) => {
  const { history } = props;
  const itemsList = [
    {
      text: "Map",
      icon: <HomeIcon />,
      onClick: () => history.push('/')
    },
    {
      text: "Text",
      icon: <InboxIcon />,
      onClick: () => history.push('/text')
    },
    {
      text: "About",
      icon: <AboutIcon />,
      onClick: () => history.push('/about')
    },
    {
      text: "Contacts",
      icon: <MailIcon />,
      onClick:() => history.push('/contacts')
    },
  ];
  return (
    <MUIDrawer variant="permanent" >
      <List>
        {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
                {icon &&  <ListItemIcon>{icon}</ListItemIcon> }
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
