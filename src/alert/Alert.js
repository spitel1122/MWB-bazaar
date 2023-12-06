/** @format */

import Swal from "sweetalert2";

const Alert = (title) => {
  return Swal.fire({
    title: title,
    icon: "success",
    toast: false,
    customClass: {
      popup: "rounded-[20px]",
      title: "text-[22px]",
    }
  });
};
const AlertError = (title) => {
  return Swal.fire({
    icon: "error",
    title: title,
    // text: "Something went wrong!",
    // footer: '<a href="">Why do I have this issue?</a>'
  });
};
export { Alert, AlertError };
