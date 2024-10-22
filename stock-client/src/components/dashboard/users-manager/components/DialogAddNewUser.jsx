import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React,{ useEffect,useState } from "react";
import { addUser } from "../../../../api/stock-manager";
import { listPermissions } from "../../../../meta-data/permissions";
import TextError from "../../../common/text-error/TextError";
import FormSelect from "../../../common/form-select/FormSelect";

const STATUS_OPTIONS = [
  { value: "active",label: "Hoạt động" },
  { value: "deactive",label: "Bị Khoá" },
];

export default function DialogAddNewUser({
  open,
  handleClose,
  onAddNewSuccess,
}) {
  // modal value
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [fullName,setFullName] = useState("");
  const [permission,setPermission] = useState("1");
  const [status,setStatus] = useState("active");

  // options state
  const [permissions,setPermissions] = useState([]);

  // error state
  const [emailErr,setEmailErr] = useState(null);
  const [passwordErr,setPasswordErr] = useState(null);
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

  const handleCheckValidateEmail = () => {
    if (!email) {
      return setEmailErr("Không được bỏ trống");
    }

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailPattern.test(email)) return setEmailErr("Email không hợp lệ");

    setEmailErr(null);
  };

  const handleCheckValidatePassword = () => {
    if (!password) {
      return setPasswordErr("Mật khẩu không hợp lệ");
    }

    if (password.length < 6)
      return setPasswordErr("Mật khẩu phải nhiều hơn 6 ký tự");

    setPasswordErr(null);
  };

  const handleCheckValidateFullName = () => {
    if (!fullName) {
      return setFullNameErr("Không được bỏ trống tên");
    }
    setFullNameErr(null);
  };



  const handleSubmitForm = () => {
    const payload = {
      email,
      password,
      full_name: fullName,
      permission,
      status,
    };

    addUser(payload)
      .then((res) => {
        if (res.error) return setServerError(res.message);

        onAddNewSuccess();
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

    const errArr = [emailErr,passwordErr,fullNameErr];

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
        <DialogTitle id="form-dialog-title">Thêm danh mục</DialogTitle>
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
              label="Password"
              value={password}
              type="password"
              error={passwordErr}
              helperText={passwordErr}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handleCheckValidatePassword}
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
