/* eslint-disable react/prop-types */
import styles from "../../assets/styles/channell/Chanell.module.scss";
import arrowimg from "../../assets/images/login/arrow-left-bold.svg";
import picchannell from "../../assets/images/channell/paxapic.jpg";
import viewimg from "../../assets/images/login/view-filled.svg";
import channellimg from "../../assets/images/login/message-outline.svg";
import { useRef, useState } from "react";
import axios from "axios";
function Chanell({ view, user }) {
  const [afterView, setAfterView] = useState(false);
  const [post1, setPost1] = useState("");
  const [post2, setPost2] = useState("");
  const refShowBox = useRef(null);
  const openChanell = () => {
    // add view if view == 0
    // else , show number view
    axios
      .post(
        "https://paxa.bio/viewchanell",
        {
          email: user,
          password: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setPost1(res.data.post1);
        setPost2(res.data.post2);
      });
    refShowBox.current.classList.add(styles.container_open);
    refShowBox.current.classList.remove(styles.container_close);
  };
  const closeBox = () => {
    setAfterView(true);
    refShowBox.current.classList.add(styles.container_close);
    refShowBox.current.classList.remove(styles.container_open);
  };
  return (
    <>
      <div className={styles.channellbox} onClick={openChanell}>
        <img className={styles.channellimg} src={channellimg} alt="notif" />
        {view == 0 && !afterView ? <span>1</span> : <></>}
      </div>
      <div ref={refShowBox} className={styles.container}>
        <div className={styles.head}>
          <img onClick={closeBox} className={styles.picarrow} src={arrowimg} alt="arrowleft" />
          <img className={styles.picprof} src={picchannell} alt="channel picture" />
          <div className={styles.head_detail}>
            <h2>کانال اطلاع رسانی</h2>
            <p>852 کاربر</p>
          </div>
        </div>
        <div className={styles.body}>
          <div className={styles.messageCreate}>
            <p>October 23, 2022</p>
            <p>Paxa created</p>
          </div>
          <div className={styles.messages}>
            <h2>PAXA</h2>
            <p>
              نسخه ویندوز بروزرسانی شد و میتوانید از قسمت آخرین ورژن برنامه ها آن را دانلود کنید یا روی لینک زیر کلیک کنید
              <a href="https://github.com/2dust/v2rayN/releases/download/6.36/v2rayN-With-Core.zip">
                <span>v2rayN-With-Core.rar</span>
              </a>
            </p>
            <div className={styles.foter_msg}>
              <p>11:11 PM</p>
              <div className={styles.foter_msg_veiw}>
                <p>{post1}</p>
                <img src={viewimg} alt="view" />
              </div>
            </div>
          </div>
          <div className={styles.messages}>
            <h2>PAXA</h2>
            <p>
              برنامه جدید برای آیفون که نسبت به برنامه های قبل پایداری قوی تری دارد
              <a href="https://apps.apple.com/app/id6450534064">
                <span>Streisand</span>
              </a>
            </p>
            <div className={styles.foter_msg}>
              <p>11:12 PM</p>
              <div className={styles.foter_msg_veiw}>
                <p>{post2}</p>
                <img src={viewimg} alt="view" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chanell;
