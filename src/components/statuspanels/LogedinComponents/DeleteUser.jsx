import Swal from "sweetalert2";
import { useMemo } from "react";
import styles from "./DeleteUser.module.scss";
import { useState } from "react";
import axios from "axios";
function DeleteUser({ email, uuid, inbId }) {
  const [loading, setLoading] = useState(false);
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `${styles.confirmstyle}`,
      cancelButton: `${styles.cancelstyle}`,
      title: `${styles.titlestyle}`,
      htmlContainer: `${styles.containerInside}`,
    },
    buttonsStyling: false,
  });
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useMemo(() => {
    swalWithBootstrapButtons
      .fire({
        backdrop: true,
        title: `<p>ایمیل <span>${email}</span> حذف شود؟ </p>`,
        text: `این اکانت هنوز فعال است`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله , حذف شود",
        cancelButtonText: "نه , بیخیال شدم",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // send request
          setLoading(true);
          const datapost = {
            id: inbId,
            uuid: uuid,
          };
          axios
            .post(`${process.env.API_URL}/deleteuser`, datapost, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              setLoading(false);
              res.data.status.success
                ? Toast.fire({
                    icon: "success",
                    title: `کاربر با موفقیت حذف شد`,
                  })
                : Toast.fire({
                    icon: "warning",
                    title: `مشکلی رخ داد`,
                  });
            });
          //
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      });
  }, [email]);
  return (
    <div className={styles.loadingdeluser} style={{ display: loading ? "flex" : "none" }}>
      <div className={styles.loadingSign}>
        <h1>
          <span>L</span>
          <span>o</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>n</span>
          <span>g</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h1>
      </div>
    </div>
  );
}

export default DeleteUser;
