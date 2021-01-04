import React from "react";
import { useDispatch } from "react-redux";
import {
  withStyles,
} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import {Button, TextField} from "@material-ui/core";
import {addMarker} from "../../redux/actions";
import {useState} from "react";

const PopupInput = ({closePopup, latitude, longitude, alerts}) => {
  const popupDispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const staticData = {
    title: 'Title',
    description: 'Description',
    addMarker: 'Add marker'
  };
  const onTextTitleChange = (m) => {
    setTitle(m.target.value);
  };
  const onTextDescriptionChange = (m) => {
    setDescription(m.target.value);
  };
  const submitFormHandler = (m) => {
    m.preventDefault()
      popupDispatch(addMarker(
        {
          title,
          description,
          latitude,
          longitude
        }));
      setTitle('')
      setDescription('')
      closePopup()
      alerts.success("You add marker!");
  }
  return (
    <form className="popup-form" onSubmit={submitFormHandler}>
      <TextField
        id="outlined-basic"
        label={staticData.title}
        value={title}
        variant="outlined"
        onChange={onTextTitleChange}
      />
      <TextField
        id="outlined-basic"
        label={staticData.description}
        value={description}
        variant="outlined"
        onChange={onTextDescriptionChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="success"
        startIcon={<SaveIcon />}
      >
        {staticData.addMarker}
      </Button>
    </form>
  )
}
export default PopupInput;