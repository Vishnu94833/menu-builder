export interface ContactState {
  firstname: "";
  lastname: "";
  telnum: "";
  email: "";
  agree: false;
  contactType: "Tel.";
  message: "";
  touched: {
    firstname: false;
    lastname: false;
    telnum: false;
    email: false;
  };
}
