import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DialogComponentProps = PropsWithChildren<{
  title?: string;
  actionText?: string;
  open: boolean;
  handleClose: () => void;
}>;

export const DialogComponent = ({
  open,
  handleClose,
  children,
  title,
  actionText,
}: DialogComponentProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {actionText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
