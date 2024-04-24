/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../assets/styles/login/logedin.module.scss";
import ParticlesComponent from "../ParticlesComponent";
import Swal from "sweetalert2";
import Shake from "shake.js";
import Chanell from "../channell/Chanell";
// import channellimg from "../../assets/images/login/message-outline.svg";
class LogedInPageReality extends React.Component {
  constructor(props) {
    super(props);
    this.refShowAnime = React.createRef();
    this.refBoxAnimeUsg = React.createRef();
    this.refBoxStauts = React.createRef();
    this.refPopReality = React.createRef();
    this.refPopBackup = React.createRef();
    this.refPopHint = React.createRef();
  }

  handlePopup = (e) => {
    const target = e.target.dataset.clicked;
    const reality = this.refPopReality.current;
    const backup = this.refPopBackup.current;
    const hint = this.refPopHint.current;
    if (target == "reality") {
      reality.classList.add(`${styles.popupBox}`);
      reality.classList.remove(`${styles.closePopup}`);
    } else if (target == "close-reality") {
      reality.classList.remove(`${styles.popupBox}`);
      reality.classList.add(`${styles.closePopup}`);
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

  handleCopyBtn = (e) => {
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

  // component didmount

  componentDidMount = () => {
    const sql = this.props.userdata.mainPageAfterSet.sql;
    const sub = this.props.userdata.mainPageAfterSet.sub;
    const statusElement = this.refBoxStauts.current;
    if (Boolean(sql) == false) {
      console.log("loading ...");
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
      const showAnim = this.refShowAnime.current;
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
  };

  render() {
    // app
    const { userdata } = this.props;
    const { mongo, sql, sub } = userdata.mainPageAfterSet;
    let Link1 = "",
      qrcode_mci = "",
      backup1 = "",
      backup2 = "",
      backup3 = "",
      qrcode_back = "",
      status = "",
      expireTime = "",
      totalVpn = "",
      usedVpn = "";
    //

    backup1 = sub.linkbackup;
    backup2 = sub.backupgrpc2;
    backup3 = sub.backupgrpc3;
    // qrcode_back = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(backup1)}&chs=150x150&choe=UTF-8&chld=L|2`;
    // qrcode_back2 = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(backup2)}&chs=150x150&choe=UTF-8&chld=L|2`;
    // qrcode_back3 = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(backup2)}&chs=150x150&choe=UTF-8&chld=L|2`;
    // show logic
    if (Boolean(sql) == false) {
      console.log("loading ...");
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

    const setReality = () => {
      const address = mongo.link;
      const mciLink = address.replace(sub.main_add, sub.address);
      const fmciLink = mciLink.replace(mongo.email, `PAXA-VIP`);
      Link1 = fmciLink;
      qrcode_mci = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(fmciLink)}&chs=150x150&choe=UTF-8&chld=L|2`;
      return (
        <div className={styles.linkBoxR}>
          <button data-clicked="reality" onClick={this.handlePopup}>
            لینک اختصاصی شما
          </button>
          <div ref={this.refPopReality} className={styles.defaultPopup}>
            <h2>لینک مناسب همه خطوط</h2>
            <div className={styles.textLink}>
              <div>
                <div>{Link1}</div>
              </div>
              <button ref={this.refCopyReality} onClick={this.handleCopyBtn}>
                کپی
              </button>
            </div>
            <div className={styles.barcodeLink}>
              <a rel="noflow">
                <img src={qrcode_mci} alt="image QRcode" />
              </a>
              <p>اسکن کنید</p>
            </div>
            <p data-clicked="close-reality" onClick={this.handlePopup}>
              خروج
            </p>
          </div>
        </div>
      );
    };

    if (Boolean(sql) == false) {
      return (
        <div className={styles.body}>
          <ParticlesComponent />
          <div className={styles.container}>
            <p style={{ marginTop: "2rem", backgroundColor: "yellowgreen" }} ref={this.refBoxStauts} className={styles.status}>
              اکانت شما به تازگی ساخته شده است و به زودی حجم و تاریخ انقضا قابل مشاهده است
            </p>
            <div className={styles.userLinksR}>
              {setReality()}
              <div className={styles.linkBoxR}>
                <button data-clicked="backup" onClick={this.handlePopup}>
                  لینک پشتیبانی
                </button>
                <div ref={this.refPopBackup} className={styles.defaultPopup}>
                  <h2>لینک پشتیبانی</h2>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup1}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی
                    </button>
                  </div>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup2}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی
                    </button>
                  </div>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup3}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی
                    </button>
                  </div>
                  {/* <div className={styles.barcodeLink}>
                    <a rel="nofollow">
                      <img src={qrcode_back} alt="image QRcode" />
                    </a>
                    <p>اسکن کنید</p>
                  </div> */}
                  <p data-clicked="close-backup" onClick={this.handlePopup}>
                    بستن
                  </p>
                </div>
              </div>
              <div className={styles.linkBoxR}>
                <button data-clicked="hint" onClick={this.handlePopup}>
                  دانلود آخرین ورژن برنامه
                </button>
                <div ref={this.refPopHint} className={styles.defaultPopup}>
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
                  <p data-clicked="close-hint" onClick={this.handlePopup}>
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
            <p ref={this.refBoxStauts} className={styles.status}>
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
                <div ref={this.refBoxAnimeUsg} className={styles.animeUsg}>
                  <div ref={this.refShowAnime}></div>
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
            <div className={styles.userLinksR}>
              {setReality()}
              <div className={styles.linkBoxR}>
                <button data-clicked="backup" onClick={this.handlePopup}>
                  لینک پشتیبانی
                </button>
                <div ref={this.refPopBackup} className={styles.defaultPopup}>
                  <h2>لینک بکاپ</h2>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup1}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی (مخصوص همه خطوط)
                    </button>
                  </div>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup2}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی (مخصوص ایرانسل)
                    </button>
                  </div>
                  <div className={styles.textLink}>
                    <div>
                      <div>{backup3}</div>
                    </div>
                    <button ref={this.refCopyBackup} onClick={this.handleCopyBtn}>
                      کپی (مخصوص همراه اول)
                    </button>
                  </div>
                  {/* <div className={styles.barcodeLink}>
                    <a rel="nofollow">
                      <img src={qrcode_back} alt="image QRcode" />
                    </a>
                    <p>اسکن کنید</p>
                  </div> */}
                  <p data-clicked="close-backup" onClick={this.handlePopup}>
                    خروج
                  </p>
                </div>
              </div>
              <div className={styles.linkBoxR}>
                <button data-clicked="hint" onClick={this.handlePopup}>
                  دانلود آخرین ورژن برنامه
                </button>
                <div ref={this.refPopHint} className={styles.defaultPopup}>
                  <h2>دانلود آخرین نسخه</h2>
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
                  <p data-clicked="close-hint" onClick={this.handlePopup}>
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
}

export default LogedInPageReality;
