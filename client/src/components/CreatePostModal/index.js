import { Button, Modal, TextareaAutosize, TextField, Box } from "@material-ui/core";
import Alert from '@mui/material/Alert';
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../redux/selectors";
import useStyles from "./styles";
import FileBase64 from "react-file-base64";
import { hideModal, createPost } from "../../redux/actions";
import * as api from '../../api'

export default function CreatePostModal() {
  const [data, setData] = React.useState({
    title: "",
    content: "",
    attachment: "",
  });
  const [currentState, setCurrentState] = React.useState({
    isLoading: false,
    showErrorMgs: false,
    showSuccessBar: false,
    vertical: 'top',
    horizontal: 'right'
  })

  const { vertical, horizontal, showSuccessBar } = currentState;

  const classes = useStyles();
  const { isShow } = useSelector(modalState$);
  const dispatch = useDispatch();

  const onCloseModal = React.useCallback(() => {
    dispatch(hideModal());
    setData({ title: "", content: "", attachment: "" });
    setCurrentState({ ...currentState, isLoading: false, showSuccessBar: true })
  }, [dispatch, setCurrentState]);

  const onSubmit = React.useCallback(() => {
    setCurrentState({ ...currentState, isLoading: true, showErrorMgs: false })
    // setCurrentState({ ...currentState, showSuccessBar: true })
    api.createPost(data).then(res => {
      dispatch(createPost.createPostSuccess(res.data))
      onCloseModal()
      setCurrentState({ ...currentState, showSuccessBar: true })
    }).catch(ex => {
      setCurrentState({ ...currentState, isLoading: false, showErrorMgs: true })
      dispatch(createPost.createPostFailure())
    })
  }, [data, dispatch, setCurrentState]);

  useEffect(() => {
  })

  const body = (
    <div className={classes.paper}>
      <div className={classes.header}>
        <h2>Create new post</h2>
      </div>
      {currentState.showErrorMgs && <Alert severity="error">Somethings went wrong!</Alert>}
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
          <div className={classes.footerBox}>
            {currentState.isLoading && <Box>
              <CircularProgress />
            </Box>}
          </div>
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

  const successNotify = (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={currentState.showSuccessBar}
        onClose={(() => setCurrentState({ ...currentState, showSuccessBar: false }))}
        key={vertical + horizontal}
        autoHideDuration={3000}
      >
        <Alert onClose={(() => setCurrentState({ ...currentState, showSuccessBar: false }))} severity="success" sx={{ width: '100%' }}>
          !
        </Alert>
      </Snackbar>
    </div>
  )

  return (
    <div>
      <Modal open={isShow} onClose={onCloseModal}>
        {body}
      </Modal>
      {successNotify}
    </div>
  );
}
