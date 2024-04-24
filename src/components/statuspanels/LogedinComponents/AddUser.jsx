/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
import axios from "axios";
import closeicon from "../../../assets/panel/closecircle.svg";
import { v4 as uuid4 } from "uuid";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Swal from "sweetalert2";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import styles from "./AddUser.module.scss";
import { useEffect, useMemo, useState } from "react";
import moment from "moment-jalaali";
import soloreset from "../../../assets/panel/solarrestart.svg";
function AddUser({
  status,
  backClose,
  idInbound,
  editUser,
  uuidEdit,
  emailEdit,
  expireEdit,
  tgidEdit,
  gigEdit,
  usageEdit,
  statusEdit,
  subidEdit,
  tcpSetting,
  tcpDirect
}) {
  const [randEmail, setRandEamil] = useState("");
  const [randUuid, setRandUuid] = useState("");
  const [closeCalender, setCloseCalender] = useState(false);
  const [dateExpire, setDateExpire] = useState(0);
  const [dateForPost, setDateForPost] = useState(0);
  const [gigAddUser, selectGigAddUser] = useState(0);
  const [loading, setLoading] = useState(false);
  const [idTelegram, setIdTelegram] = useState("");
  const [editComeDate, setEditComeDate] = useState("");
  const [howDate, setHowDate] = useState([]);
  const [breakUser, setBrakeUser] = useState("");
  const persianDate = utils("fa").getToday();
  useMemo(() => {
    selectGigAddUser(gigEdit);
    setIdTelegram(tgidEdit);
  }, [gigEdit, tgidEdit]);
  useEffect(() => {
    if (!editUser == true) return;
    if (expireEdit == undefined || expireEdit == 0) {
      setHowDate(0);
      return;
    }
    function convertPersianNumbersToEnglish(inputString) {
      const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";
      const englishNumbers = "0123456789";
      for (let i = 0; i < 10; i++) {
        inputString = inputString.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i]);
      }
      return inputString;
    }
    let converted = convertPersianNumbersToEnglish(expireEdit);
    let components = converted.split(", ");
    let date_parts = components[0].split("/");
    let year = parseInt(date_parts[0]);
    let month = parseInt(date_parts[1]);
    let day = parseInt(date_parts[2]);
    setEditComeDate([year, month, day]);
    setHowDate({ year: year, month: month, day: day });
  }, [expireEdit]);
  // UseEffect
  useEffect(() => {
    if (editUser) {
      // reset enable or somethings ..
      setBrakeUser(statusEdit);
      convertToExpire(howDate);
    }
  }, [howDate]);
  // defvalue date
  const defaultValue = {
    year: persianDate.year,
    month: persianDate.month,
    day: persianDate.day,
  };
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
  const handlePostUser = () => {
    if (editUser == true) {
      setLoading(true);
      const datapost = {
        idInb: idInbound,
        id: uuidEdit,
        email: emailEdit,
        gig: gigAddUser * 1073741824,
        expire: Number(dateForPost) < 0 ? 0 : Number(dateForPost),
        tgid: idTelegram,
        subid: subidEdit,
        status: breakUser,
        flow: tcpDirect?"":tcpSetting,
      };
      axios
        .post(`${process.env.API_URL}/edituser`, datapost, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          backClose(false);
          res.data.status.success
            ? Toast.fire({
                icon: "success",
                title: `بروزرسانی شد ${emailEdit} اکانت`,
              })
            : Toast.fire({
                icon: "warning",
                title: `مشکلی رخ داد`,
              });
        });
    } else if (editUser == false) {
      setLoading(true);
      const datapost = {
        idInb: idInbound,
        id: randUuid,
        email: randEmail,
        gig: gigAddUser * 1073741824,
        expire: Number(dateForPost),
        tgid: idTelegram.length == 0 ? randEmail : idTelegram,
        subid: generateRandomSubId(),
        flow: tcpDirect?"":tcpSetting,
      };
      axios
        .post(`${process.env.API_URL}/addclient`, datapost, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setLoading(false);
          backClose(false);
          res.data.status.success
            ? Toast.fire({
                icon: "success",
                title: `کاربر با موفقیت افزوده شد`,
              })
            : Toast.fire({
                icon: "warning",
                title: `خطایی رخ داد`,
              });
        });
    }
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);
  const convertToExpire = (userDate) => {
    statusEdit == "true" ? setBrakeUser(true) : setBrakeUser(false);
    const currentTime = moment().format("HH:mm:ss");
    const milisecUser = moment(`${userDate.year}/${userDate.month}/${userDate.day} ${currentTime}`, "jYYYY/jM/jD HH:mm:ss").format("x");
    let currentDateMiliSec = new Date().getTime();
    let timeDiff = milisecUser - currentDateMiliSec;
    let remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setDateExpire(remainingDays);
    setDateForPost(milisecUser);
  };

  const generateRandomEmail = () => {
    return Math.random().toString(36).substring(2, 11);
  };
  const generateRandomSubId = () => {
    return Math.random().toString(36).substring(2, 20);
  };
  const generateRandomUuid = () => {
    return uuid4();
  };

  useMemo(() => {
    if (editUser == true) return;
    setRandEamil(generateRandomEmail());
    setRandUuid(generateRandomUuid());
  }, [status]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `${styles.confirmstyle}`,
      cancelButton: `${styles.cancelstyle}`,
      title: `${styles.titlestyle}`,
      htmlContainer: `${styles.containerInside}`,
    },
    buttonsStyling: false,
  });
  // reset usage
  const handleResetUsage = () => {
    swalWithBootstrapButtons
      .fire({
        backdrop: true,
        title: `<p>حجم ایمیل<span>${emailEdit}</span>ریست شود ؟</p>`,
        text: ``,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله , ریست شود",
        cancelButtonText: "نه , بیخیال شدم",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // send request
          setLoading(true);
          const datapost = {
            inbId: idInbound,
            email: emailEdit,
          };
          axios
            .post(`${process.env.API_URL}/resetusage`, datapost, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              setLoading(false);
              backClose(false);
              res.data.status.success
                ? Toast.fire({
                    icon: "success",
                    title: `حجم کاربر ریست شد`,
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
  };

  return (
    <div className={styles.container}>
      <img className={styles.closeIcon} src={closeicon} alt="" onClick={() => backClose(false)} />
      <div className={styles.loadingadduser} style={{ display: loading ? "flex" : "none" }}>
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
      <h3>{editUser ? "ویرایش کاربر" : "افزودن کاربر جدید"}</h3>
      {editUser ? (
        <div
          className={styles.statusUser}
          onClick={() => {
            setBrakeUser(!breakUser);
          }}
        >
          <h4>وضعیت </h4>
          <div
            onClick={(e) => {
              e.target.classList.toggle(`${statusEdit == "true" ? styles.offServer : styles.onServerRev}`);
            }}
            className={statusEdit == "true" ? styles.onServer : styles.offServerRev}
          ></div>
        </div>
      ) : (
        <></>
      )}
      <div>
        <h4>آیدی : </h4>
        <p>{editUser ? uuidEdit : randUuid}</p>
      </div>
      <div>
        <h4>ایمیل : </h4>
        <p>{editUser ? emailEdit : randEmail}</p>
      </div>
      <div className={styles.idTelegram}>
        <h4>آیدی تلگرام : </h4>
        <input
          onChange={(e) => setIdTelegram(e.target.value)}
          value={idTelegram}
          defaultValue={0}
          type="text"
          style={{ width: "7rem", padding: "0.2rem 0.5rem" }}
        />
      </div>
      <div className={styles.totalGigabite}>
        <h4>
          حجم کل <span>(برحسب گیگ)</span>
        </h4>
        <input
          style={{ padding: "0.2rem 0.5rem" }}
          type="number"
          min={0}
          defaultValue={0}
          onChange={(e) => selectGigAddUser(e.target.value)}
          value={gigAddUser}
        />
        {editUser ? (
          <>
            <p className={styles.resetForBreak}>
              <span>مصرف شده:</span>
              {String(usageEdit).length > 9 ? (usageEdit / 1073741824).toFixed(2) : (usageEdit / 1048576).toFixed(2)}
              <span>{String(usageEdit).length > 9 ? "گیگ" : "مگ"}</span>
            </p>
            <img onClick={handleResetUsage} className={styles.resetImg} src={soloreset} alt="reset" />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.datepickerBox}>
        <button onClick={() => setCloseCalender(!closeCalender)}>تاریخ انقضا</button>
        <p>{dateExpire == 0 ? "محدودیت زمانی ندارد" : dateExpire < 0 ? `${Math.abs(dateExpire)} روز گذشته` : `${dateExpire} روز دیگر`}</p>
        <div className={styles.calendarFa} style={{ display: closeCalender ? "block" : "none" }}>
          <Calendar
            value={selectedDay}
            onChange={setSelectedDay}
            locale={"fa"}
            // colorPrimary="#9c88ff"
            DatePickerClassName="custom-calender"
            // calendarTodayClassName="custom-today-day"
            inputPlaceholder="تاریخ انقضا"
            minimumDate={defaultValue}
            customDaysClassName={[
              // here we add some CSS classes
              {
                year: editUser ? howDate.year : 0,
                month: editUser ? howDate.month : 0,
                day: editUser ? howDate.day : 0,
                className: styles.yellowday,
              },
            ]}
            renderFooter={() => (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDay(null);
                    setDateExpire(0);
                    setCloseCalender(false);
                    setDateForPost(0);
                  }}
                  style={{
                    color: "#00595f",
                    border: "2px solid greenyellow",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                  }}
                >
                  نامحدود
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (
                      selectedDay.day == defaultValue.day &&
                      selectedDay.month == defaultValue.month &&
                      selectedDay.year == defaultValue.year
                    ) {
                      setSelectedDay(null);
                      setDateExpire(0);
                      setCloseCalender(false);
                      setDateForPost(0);
                    } else {
                      convertToExpire(selectedDay);
                      setCloseCalender(false);
                    }
                  }}
                  style={{
                    color: "#00595f",
                    border: "2px solid greenyellow",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                  }}
                >
                  تایید
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <div className={styles.submitBtn}>
        <button onClick={handlePostUser}>{editUser ? "ثبت" : "افزودن"}</button>
      </div>
    </div>
  );
}

export default AddUser;
