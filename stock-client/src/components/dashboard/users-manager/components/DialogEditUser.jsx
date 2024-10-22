import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React,{ useEffect,useState } from "react";
import { updateUser } from "../../../../api/stock-manager";
import { listPermissions } from "../../../../meta-data/permissions";
import { stocks } from "../../../../meta-data/stocks";
import TextError from "../../../common/text-error/TextError";
import FormSelect from "../../../common/form-select/FormSelect";

const STATUS_OPTIONS = [
  { value: "active",label: "Hoạt động" },
  { value: "deactive",label: "Bị Khoá" },
];

export default function DialogEditUser({
  open,
  handleClose,
  selectedUser,
  onEditSuccess,
}) {
  // modal value
  const [email,setEmail] = useState(selectedUser.email);
  const [fullName,setFullName] = useState(selectedUser.full_name);
  const [permission,setPermission] = useState(selectedUser.permission_id);
  const [status,setStatus] = useState(selectedUser.status);
  const [stock,setStock] = useState(selectedUser.stock_id);

  // options state
  const [permissions,setPermissions] = useState([]);
  const [listStocks,setListStocks] = useState([]);

  // error state
  const [emailErr,setEmailErr] = useState(null);
  const [fullNameErr,setFullNameErr] = useState(null);

  // server error state
  const [serverError,setServerError] = useState(null);

  const getListPermissions = async () => {
    const data = await listPermissions();
    setPermissions(data);
  };

  useEffect(() => {
    getListPermissions();
  },[]);

  const getListStocks = async () => {
    const data = await stocks();
    setListStocks(data);
  };

  useEffect(() => {
    getListStocks();
  },[]);

  const handleCheckValidateEmail = () => {
    if (!email) {
      return setEmailErr("Không được bỏ trống");
    }

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailPattern.test(email)) return setEmailErr("Email không hợp lệ");

    setEmailErr(null);
  };

  const handleCheckValidateFullName = () => {
    if (!fullName) {
      return setFullNameErr("Không được bỏ trống họ và tên");
    }
    setFullNameErr(null);
  };

  const handleSubmitForm = () => {
    const payload = {
      id: selectedUser.id,
      email,
      full_name: fullName,
      permission,
      status,
      stock_id: parseInt(stock)
    };

    updateUser(payload)
      .then((res) => {
        if (res.error) return setServerError(res.message);
        onEditSuccess();
        handleClose();
      })
      .catch((err) => {
        setServerError(err.message);
      });
  };

  const errorMessage = serverError ? (
    <TextError>{serverError}</TextError>
  ) : null;

  const disabledSubmitForm = () => {
    let isDisabled = false;

    const errArr = [emailErr,fullNameErr];

    errArr.forEach((err) => {
      if (err !== null) {
        isDisabled = true;
        return;
      }
    });

    return isDisabled;
  };

  return (
    <div className="dialogAddNewItemType">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sửa thông tin</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Email"
              value={email}
              error={emailErr}
              helperText={emailErr}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleCheckValidateEmail}
            />
            <TextField
              fullWidth
              label="Họ và tên"
              value={fullName}
              error={fullNameErr}
              helperText={fullNameErr}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={handleCheckValidateFullName}
            />

            <FormSelect
              label="Bộ phận"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              options={listStocks}
            />
            <FormSelect
              label="Chức danh"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              options={permissions}
            />
            <FormSelect
              label="Trạng thái"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              options={STATUS_OPTIONS}
            />

          </form>
          {errorMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitForm}
            color="primary"
            disabled={disabledSubmitForm()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
