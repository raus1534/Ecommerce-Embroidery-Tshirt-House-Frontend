export const isValidEmail = (email) => {
  // eslint-disable-next-line
  const emailRegularEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegularEx.test(email);
};

export const isValidName = (name) => {
  const nameRegularEx = /^[a-z A-Z]+$/;
  return nameRegularEx.test(name);
};
