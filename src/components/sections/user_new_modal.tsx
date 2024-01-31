import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import backend_url from "../../Vars.js"

import { useTranslation } from "react-i18next";


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

export default function User_new_modal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { t } = useTranslation();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else
    {
      var name = document.getElementById("form_new_name").value;
      var email = document.getElementById("form_new_email").value;
      var password = document.getElementById("form_new_password").value;
      var parameters = {
          name: name,
          email: email,
          password: password
      };
      axios.post(backend_url+'/api/userCreate', null, { 
          params:  parameters
      })
      .then(res => {
          setOpen(false);
          withReactContent(Swal).fire({
              icon: 'success',
              title: t("alert_success_text"),
              showCloseButton: true,
              confirmButtonText: 'Ok',
              didClose: () => {
                window.location.reload();;
              }
          });
        })
      .catch(err => console.warn(err));
    }

    setValidated(true);
  };
  
  return (
    <div>
      <button onClick={handleOpen} className="user-create-button">{t("user_module_create_button")}</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("new_user_modal_title")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="form_new_email">
                <Form.Label>{t("form_text_email")}</Form.Label>
                <Form.Control type="email" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  {t("invalid_email_no_data")}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form_new_name">
                <Form.Label>{t("form_text_name")}</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  {t("invalid_name_no_data")}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="form_new_password">
                <Form.Label>{t("form_text_password")}</Form.Label>
                <Form.Control type="password" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  {t("invalid_password_no_data")}
                </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit"  className="user-create-button">{t("button_text_save")}</Button>
            </Form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}