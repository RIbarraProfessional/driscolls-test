import React from "react";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import axios from 'axios';

import {  NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "../../lang/en.json";
import langES from "../../lang/es.json";

import "../../assets/css/user_module.css";
import { TableHead } from "@mui/material";

import backend_url from "../../Vars.js"

import User_edit_modal from "./user_edit_modal.tsx";
import { Button } from "react-bootstrap";

const resources = {
    en: {
        translation: langEN,
    },
    es: {
        translation: langES,
    },
};
  
i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
  }
  
  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  function createData( id: number, name: string, email: number) {
    return { id, name, email };
  }
  
  

const User_table_contents = () => {
    const { t } = useTranslation();

    
    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setData] = React.useState([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
      fetch(backend_url+"/api/userList")
      .then((res) => res.json())
      .then((data) => {
          setData(data.data)
          console.log(data);
          
      });
    }, []);

    const delete_this_user = (id) =>
    {
      withReactContent(Swal).fire({
        icon: 'warning',
        text: t("delete_user_confirmation_title")+" #"+id,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: t("text_yes"),
        cancelButtonText: t("text_no"),
        didClose: () => 
        {
          
        }
      }).then((value) => {
        
        if (value.isConfirmed) 
        {
          withReactContent(Swal).close();
          var parameters = {
            id: id
          };
          axios.post(backend_url+'/api/userDelete', null, { 
              params:  parameters
          })
          .then(res => {
              withReactContent(Swal).fire({
                  icon: 'success',
                  title: t("alert_success_text"),
                  showCloseButton: true,
                  confirmButtonText: 'Ok',
                  didClose: () => {
                    window.location.reload();
                  }
              });
            })
          .catch(err => console.warn(err));
        }
        else
        {
        }
      });
    }

    const change_password = (id) =>
    {
      var password, password2;
      type LoginFormResult = {
        username: string
        password: string
      }
      
      let usernameInput: HTMLInputElement
      let passwordInput: HTMLInputElement

      withReactContent(Swal).fire<LoginFormResult>({
        title: t("change_password_text"),
        html: `
        <label>`+t("form_text_password")+`</label><br>
        <input type="password" id="password" class="swal2-input" placeholder=""><br>
        <label>`+t("form_text_password_repeat")+`</label><br>
        <input type="password" id="password2" class="swal2-input" placeholder="">
        `,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: t("button_text_save"),
        cancelButtonText: t("button_text_close"),
        focusConfirm: false,
        didOpen: () => {
          const popup = Swal.getPopup()!
        },
        preConfirm: () => {
          const input1 = document.getElementById("password").value;
          const input2 = document.getElementById("password2").value;
          if (!input1 || !input2) {
            Swal.showValidationMessage(t("password_change_empty_field"))
            
          }
          else if(input1 != input2)
          {
            Swal.showValidationMessage(t("password_change_missmatch"))
          }
          else
          {
            var parameters = {
              id: id,
              password: input2
            };
            axios.post(backend_url+'/api/userEditPassword', null, { 
                params:  parameters
            })
            .then(res => {
                withReactContent(Swal).fire({
                    icon: 'success',
                    title: t("alert_success_text"),
                    showCloseButton: true,
                    confirmButtonText: 'Ok',
                    didClose: () => {
                      window.location.reload();
                    }
                });
              })
            .catch(err => console.warn(err));
          }
          return {}
        },
      });
    }

    const Row_data = (row_data) =>
    {
      const [open, setOpen] = React.useState(false);
      var row = row_data["row"];
      return(
      <React.Fragment>
        <TableRow >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          
        <TableCell >
          <NavLink  to={"/users/"+row["id"]}>{row["id"]}</NavLink>
        </TableCell>
        <TableCell >
          {row["name"]}
        </TableCell>
        <TableCell >
          {row["email"]}
        </TableCell>
        <TableCell >
          <User_edit_modal id={row["id"]} data={row}/>
        </TableCell>
        <TableCell >
            <button className="small_button delete_button" onClick={()=>delete_this_user(row["id"])}>{t("delete_button_text")}</button>
        </TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Container>
                <Row>
                  <Col xs="12" sm="12" m="3" lg="3" xl="3">
                    <NavLink  to={"/users/"+row["id"]}>
                      <img className="deployed-image-user" src="/profile.jpg"></img>
                    </NavLink>
                    <button className="small_button delete_button small_button_inner" onClick={()=>change_password(row["id"])}>{t("change_password_text")}</button>
                  </Col>
                  <Col xs="12" sm="12" m="6" lg="6" xl="6">
                    <div className="description-bow">
                      <p><b>{t("form_text_description")}</b></p>
                      <p>{row["description"]}</p>
                    </div>
                  </Col>
                  <Col xs="12" sm="12" m="3" lg="3" xl="3">
                    
                  </Col>
                </Row>
              </Container>
            </Collapse>
          </TableCell>
        </TableRow>
        </React.Fragment>
        );
    }

    return(
        <>
            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>{t("user_table_id_text")}</TableCell>
                        <TableCell>{t("user_table_name_text")}</TableCell>
                        <TableCell>{t("user_table_email_text")}</TableCell>
                        <TableCell>{t("user_table_edit_text")}</TableCell>
                        <TableCell>{t("user_table_delete_text")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <Row_data row={row}></Row_data>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': t('rows_per_page'),
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                    </TableFooter>
                </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default User_table_contents;