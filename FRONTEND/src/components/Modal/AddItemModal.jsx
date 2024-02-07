import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Modal, IconButton } from "@mui/material";
import { FormAddItem } from "../FormAddItem/FormAddItem";
import CloseIcon from "@mui/icons-material/Close";
import "./AddItemModal.css";
import { useResourcesContext } from "../Context/ResourcesContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  p: 4,
  border: "none",
};

export default function BasicModal() {
  const { setNeedsReload, open, handleOpen, handleClose } =
    useResourcesContext();

  return (
    <div className="containerOpenModal">
      <h1 className="title">TODOS TUS RECURSOS, EN UN MISMO LUGAR</h1>
      <Button
        onClick={handleOpen}
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
      >
        <div className="buttonAddText">
          AÑADIR
          <input type="submit" value="+" className="buttonAdd" />
        </div>
      </Button>
      <Modal
        setNeedsReload={setNeedsReload}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              position: "absolute",
              top: 60,
              right: 60,
              size: "medium",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <FormAddItem />
        </Box>
      </Modal>
    </div>
  );
}
