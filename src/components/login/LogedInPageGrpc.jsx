/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import styles from "../../assets/styles/login/logedin.module.scss";
import ParticlesComponent from "../ParticlesComponent";
import Swal from "sweetalert2";
import Shake from "shake.js";
import Chanell from "../channell/Chanell";
import { Crisp } from "crisp-sdk-web";
function LogedInPageGrpc({ userdata }) {
  // refs
  const refShowAnime = useRef(null);
  const refBoxAnimeUsg = useRef(null);
  const refBoxStauts = useRef(null);
  const refPopMci = useRef(null);
  const refPopIrancell = useRef(null);
  const refPopBackup = useRef(null);
  const refPopHint = useRef(null);
  // states
  const [showChanell, setShowChanell] = useState(null);
  // variables
  const { mongo, sql, sub } = userdata.mainPageAfterSet;
  let Link1 = "",
    qrcode_mci = "",
    Link2 = "",
    qrcode_irancell = "",
    Link3 = "",
    qrcode_back = "",
    status = "",
    expireTime = "",
    totalVpn = "",
    usedVpn = "";
  // handle show popup and open link box
  const handlePopup = (e) => {
    const target = e.target.dataset.clicked;
    const mci = refPopMci.current;
    const irancell = refPopIrancell.current;
    const backup = refPopBackup.current;
    const hint = refPopHint.current;
    if (target == "mci") {
      mci.classList.add(`${styles.popupBox}`);
      mci.classList.remove(`${styles.closePopup}`);
    } else if (target == "close-mci") {
      mci.classList.remove(`${styles.popupBox}`);
      mci.classList.add(`${styles.closePopup}`);
    } else if (target == "irancell") {
      irancell.classList.add(`${styles.popupBox}`);
      irancell.classList.remove(`${styles.closePopup}`);
    } else if (target == "close-irancell") {
      irancell.classList.remove(`${styles.popupBox}`);
      irancell.classList.add(`${styles.closePopup}`);
    } else if (target == "backup") {
      backup.classList.add(`${styles.popupBox}`);
      backup.classList.remove(`${styles.closePopup}`);
    } else if (target == "close-backup") {
      backup.classList.remove(`${styles.popupBox}`);
      backup.classList.add(`${styles.closePopup}`);
    } else if (target == "hint") {
      hint.classList.add(`${styles.popupBox}`);
      hint.classList.remove(`${styles.closePopup}`);
    } else if (target == "close-hint") {
      hint.classList.remove(`${styles.popupBox}`);
      hint.classList.add(`${styles.closePopup}`);
    }
  };
  // all copy buttons for copy links
  const handleCopyBtn = (e) => {
    const targetLink = e.target.previousSibling.innerText;
    const textArea = document.createElement("textarea");
    textArea.value = targetLink;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "لینک شما با موفقیت کپی شد",
    });
  };
  // handle popup chanell
  const openChanell = () => {
    setShowChanell(true);
  };
  const callbackCloseChanell = (status) => {
    setShowChanell(status);
  };

  if (sql == undefined) {
  } else {
    if (sub.status == "true") {
      if (sql.enable === 1) {
        status = "وضعیت سرور شما فعال است 🟢";
      } else if (sql.enable === 0) {
        status = "وضعیت سرور شما غیرفعال است 🔴";
      }
    } else if (sub.status == "false") {
      status = sub.statusMsg;
    }
    if (sql.expiry_time !== 0) {
      const currentDate = new Date();
      const expire = new Date(sql.expiry_time);
      const timeDiff = expire.getTime() - currentDate.getTime();
      const dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      if (dayLeft > 0) {
        expireTime = `${dayLeft} روز  دیگر به اتمام میرسد`;
      } else {
        expireTime = `به اتمام رسید`;
      }
    }
    if (sql.expiry_time === 0) {
      expireTime = "نامحدود است";
    }
    if (sql.total !== 0) {
      const Atotal = sql.total;
      const download = sql.down + sql.up;
      const gigabyteDown = (download / 1073741824).toFixed(1);
      const gigabyteTotal = (Atotal / 1073741824).toFixed(1);
      totalVpn = `${gigabyteTotal} گیگابایت`;
      usedVpn = `${gigabyteDown} گیگابایت`;
    }
    if (sql.total === 0) {
      const download = sql.down + sql.up;
      const gigabyteDown = (download / 1073741824).toFixed(1);
      totalVpn = "نامحدود";
      usedVpn = `${gigabyteDown} گیگابایت`;
    }
  }
  // compoenet rendered
  useEffect(() => {
    Crisp.configure("fd9bf4bc-ad4c-4095-93b5-6123002822cc");
    const sql = userdata.mainPageAfterSet.sql;
    const sub = userdata.mainPageAfterSet.sub;
    const statusElement = refBoxStauts.current;
    if (sql == undefined) {
    } else {
      if (sub.status == "true") {
        if (sql.enable === 1) {
          statusElement.style.backgroundColor = "rgb(183, 255, 75)";
        } else if (sql.enable === 0) {
          statusElement.style.backgroundColor = "rgb(255, 75, 75)";
        }
      } else if (sub.status == "false") {
        statusElement.style.backgroundColor = "rgb(250, 245, 52)";
      }
      // show animation
      let Atotal = sql.total;
      let Adown = sql.down + sql.up;
      const currentDate = new Date();
      const expirenull = sql.expiry_time;
      const expire = new Date(sql.expiry_time);
      const timeDiff = expire.getTime() - currentDate.getTime();
      const dayleft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      let AUsed = Number((Adown / 1073741824).toFixed(1));
      // const showAnim = document.querySelector(".result-usg");
      const showAnim = refShowAnime.current;
      if (Atotal === 0 && expirenull === 0) {
        showAnim.style.width = "100%";
        showAnim.style.backgroundColor = "greenyellow";
      } else if (Atotal === 0 && expirenull !== 0) {
        let widthAnime = 0;
        if (dayleft < 0) {
          widthAnime = 0;
        } else if (dayleft <= 30) {
          widthAnime = (dayleft / 30) * 100;
        } else if (dayleft > 30) {
          widthAnime = 100;
        }
        if (widthAnime > 70) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "greenyellow";
        } else if (widthAnime <= 70 && widthAnime > 30) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "rgb(255, 234, 47)";
        } else if (widthAnime <= 30) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "rgb(255, 63, 63)";
        }
      } else if (Atotal !== 0 && dayleft !== 0) {
        Atotal = Number((Atotal / 1073741824).toFixed(1));
        const widthAnime = ((Atotal - AUsed) / Atotal) * 100;
        if (widthAnime > 70) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "greenyellow";
        } else if (widthAnime <= 70 && widthAnime > 30) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "rgb(255, 234, 47)";
        } else if (widthAnime <= 30) {
          showAnim.style.width = `${widthAnime}%`;
          showAnim.style.backgroundColor = "rgb(255, 63, 63)";
        }
      }
    }

    const shakeEvent = new Shake({
      threshold: 15,
      timeout: 1000,
    });

    shakeEvent.start();
    window.addEventListener(
      "shake",
      () => {
        window.location.replace("https://www.speedtest.net/");
      },
      false
    );
  }, []);

  const setMci = () => {
    if (mongo.mci_status === "on") {
      const lenSub = sub.mci_sub.length;
      const randomSub = Math.floor(Math.random() * lenSub);
      const address = mongo.link;
      const mciLink = address.replace(sub.main_add, sub.mci_add);
      let fmciLink = mciLink.replace(sub.main_sub, sub.mci_sub[randomSub]);
      fmciLink = fmciLink.replace(mongo.email, `Hamrah-Avval`);
      Link1 = decodeURIComponent(fmciLink);
      qrcode_mci = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(Link1)}&chs=150x150&choe=UTF-8&chld=L|2`;
      return (
        <div>
          <button data-clicked="mci" onClick={handlePopup}>
            لینک همراه اول
          </button>
          <div ref={refPopMci} className={styles.defaultPopup}>
            <h2>لینک همراه اول</h2>
            <div className={styles.textLink}>
              <div>
                <div>{Link1}</div>
              </div>
              <button onClick={handleCopyBtn}>کپی</button>
            </div>
            <div className={styles.barcodeLink}>
              <a rel="noflow">
                <img src={qrcode_mci} alt="image QRcode" />
              </a>
              <p>اسکن کنید</p>
            </div>
            <p data-clicked="close-mci" onClick={handlePopup}>
              خروج
            </p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  const setIrancell = () => {
    if (mongo.irancell_status === "on") {
      const address = mongo.link;
      let irancellLink = address;
      irancellLink = irancellLink.replace(mongo.email, "irancell");
      Link2 = decodeURIComponent(irancellLink);
      qrcode_irancell = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(Link2)}&chs=150x150&choe=UTF-8&chld=L|2`;
      return (
        <div>
          <button data-clicked="irancell" onClick={handlePopup}>
            لینک ایرانسل
          </button>
          <div ref={refPopIrancell} className={styles.defaultPopup}>
            <h2>لینک ایرانسل</h2>
            <div className={styles.textLink}>
              <div>
                <div>{Link2}</div>
              </div>
              <button onClick={handleCopyBtn}>کپی</button>
            </div>
            <div className={styles.barcodeLink}>
              <a rel="nofollow">
                <img src={qrcode_irancell} alt="image QRcode" />
              </a>
              <p>اسکن کنید</p>
            </div>
            <p data-clicked="close-irancell" onClick={handlePopup}>
              خروج
            </p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  Link3 = sub.linkbackup;
  qrcode_back = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(Link3)}&chs=150x150&choe=UTF-8&chld=L|2`;
  if (sql == undefined) {
    return (
      <div className={styles.body}>
        <ParticlesComponent />
        <div className={styles.container}>
          <p style={{ marginTop: "2rem", backgroundColor: "yellowgreen" }} ref={refBoxStauts} className={styles.status}>
            اکانت شما به تازگی ساخته شده است و به زودی حجم و تاریخ انقضا قابل مشاهده است
          </p>
          <div className={styles.userLinks}>
            {setMci()}
            {setIrancell()}
            <div>
              <button data-clicked="backup" onClick={handlePopup}>
                لینک پشتیبانی
              </button>
              <div ref={refPopBackup} className={styles.defaultPopup}>
                <h2>لینک پشتیبانی</h2>
                <div className={styles.textLink}>
                  <div>
                    <div>{Link3}</div>
                  </div>
                  <button onClick={handleCopyBtn}>کپی</button>
                </div>
                <div className={styles.barcodeLink}>
                  <a rel="nofollow">
                    <img src={qrcode_back} alt="image QRcode" />
                  </a>
                  <p>اسکن کنید</p>
                </div>
                <p data-clicked="close-backup" onClick={handlePopup}>
                  خروج
                </p>
              </div>
            </div>
            <div>
              <button data-clicked="hint" onClick={handlePopup}>
                دانلود آخرین ورژن برنامه
              </button>
              <div ref={refPopHint} className={styles.defaultPopup}>
                <h2>لینک های دانلود</h2>
                <div className={styles.linksDownload}>
                  <div className={styles.androidVersion}>
                    <p>نسخه مخصوص اندروید</p>
                    <a href="https://github.com/2dust/v2rayNG/releases/download/1.8.6/v2rayNG_1.8.6.apk">v2rayNG</a>
                  </div>
                  <div className={styles.iphoneVersion}>
                    <p>نسخه مخصوص آیفون</p>
                    <div>
                      <a href="https://apps.apple.com/us/app/FoXray/id6448898396">FoXray</a>
                      <a href="https://apps.apple.com/us/app/fair-vpn/id1533873488?platform=iphone">Fair VPN</a>
                      <a href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690">V2box</a>
                    </div>
                  </div>
                  <div className={styles.desktopVersion}>
                    <p>نسخه مخصوص ویندوز</p>
                    <a href="https://github.com/2dust/v2rayN/releases/download/6.23/v2rayN-With-Core.zip">Windows</a>
                  </div>
                </div>
                <p data-clicked="close-hint" onClick={handlePopup}>
                  خروج
                </p>
              </div>
            </div>
          </div>
          <p className={styles.madewithlove}>Made with 🤍</p>
          <p className={styles.versionApp}>v 3.0.0</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.body}>
        <ParticlesComponent />
        <div className={styles.container}>
          <p ref={refBoxStauts} className={styles.status}>
            {status}
          </p>
          <div className={styles.usage}>
            <Chanell view={mongo.watchpost} user={mongo.userpass} />
            <p className={styles.vaziat}>وضعیت بسته شما :‌</p>
            <div className={styles.boxUsg}>
              <div className={styles.exUsg}>
                <p>تاریخ انقضای بسته شما </p>
                <p>{expireTime}</p>
              </div>
              <div ref={refBoxAnimeUsg} className={styles.animeUsg}>
                <div ref={refShowAnime}></div>
              </div>
              <div className={styles.mainUsage}>
                <div className={styles.conUsg}>
                  <p>حجم مصرف شده</p>
                  <p>{usedVpn}</p>
                </div>
                <div className={styles.totUsg}>
                  <p>حجم کل</p>
                  <p>{totalVpn}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.userLinks}>
            {setMci()}
            {setIrancell()}
            <div>
              <button data-clicked="backup" onClick={handlePopup}>
                لینک پشتیبانی
              </button>
              <div ref={refPopBackup} className={styles.defaultPopup}>
                <h2>لینک پشتیبانی</h2>
                <div className={styles.textLink}>
                  <div>
                    <div>{Link3}</div>
                  </div>
                  <button onClick={handleCopyBtn}>کپی</button>
                </div>
                <div className={styles.barcodeLink}>
                  <a rel="nofollow">
                    <img src={qrcode_back} alt="image QRcode" />
                  </a>
                  <p>اسکن کنید</p>
                </div>
                <p data-clicked="close-backup" onClick={handlePopup}>
                  خروج
                </p>
              </div>
            </div>
            <div>
              <button data-clicked="hint" onClick={handlePopup}>
                دانلود آخرین ورژن برنامه
              </button>
              <div ref={refPopHint} className={styles.defaultPopup}>
                <h2>لینک های دانلود</h2>
                <div className={styles.linksDownload}>
                  <div className={styles.androidVersion}>
                    <p>نسخه مخصوص اندروید</p>
                    <a href="https://github.com/2dust/v2rayNG/releases/download/1.8.6/v2rayNG_1.8.6.apk">v2rayNG</a>
                  </div>
                  <div className={styles.iphoneVersion}>
                    <p>نسخه مخصوص آیفون</p>
                    <div>
                      <a href="https://apps.apple.com/us/app/FoXray/id6448898396">FoXray</a>
                      <a href="https://apps.apple.com/us/app/fair-vpn/id1533873488?platform=iphone">Fair VPN</a>
                      <a href="https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690">V2box</a>
                    </div>
                  </div>
                  <div className={styles.desktopVersion}>
                    <p>نسخه مخصوص ویندوز</p>
                    <a href="https://github.com/2dust/v2rayN/releases/download/6.23/v2rayN-With-Core.zip">Windows</a>
                  </div>
                </div>
                <p data-clicked="close-hint" onClick={handlePopup}>
                  خروج
                </p>
              </div>
            </div>
          </div>
          <p className={styles.madewithlove}>Made with 🤍</p>
          <p className={styles.versionApp}>v 3.0.0</p>
        </div>
      </div>
    );
  }
}
export default LogedInPageGrpc;
