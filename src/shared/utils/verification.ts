const verifyRegExp = {
  phone:
    /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
};

export const verifyEmail = (email: string) => {
  return verifyRegExp.email.test(email);
};

export const verifyPhone = (phone: number | string) => {
  if(typeof phone === 'number'){
    phone = phone.toString()
  }
  return verifyRegExp.phone.test(phone);
};
