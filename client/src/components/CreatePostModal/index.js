import { Button, Modal, TextareaAutosize, TextField } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";
import { hideModal, createPost } from "../../redux/actions";

export default function CreatePostModal() {
  const [data, setData] = React.useState({
    title: "",
    content: "",
    attachment: "",
  });

  const classes = useStyles();
  const { isShow } = useSelector(modalState$);
  const dispath = useDispatch();

  const onCloseModal = React.useCallback(() => {
    dispath(hideModal());
    setData({ title: "", content: "", attachment: "" });
  }, [dispath]);

  const onSubmit = React.useCallback(() => {
    // React.useEffect
    dispath(createPost.createPostRequest(data));
    onCloseModal()
  }, [data, dispath]);

  const body = (
    <div className={classes.paper}>
      <div className={classes.header}>
        <h2>Create new post</h2>
      </div>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <TextareaAutosize
          className={classes.textarea}
          rowsMin={10}
          rowsMax={10}
          placeholder="Content..."
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        ></TextareaAutosize>
        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          value={data.attachment}
          onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
        />
        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullWidth
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Modal open={isShow} onClose={onCloseModal}>
        {body}
      </Modal>
    </div>
  );
}
