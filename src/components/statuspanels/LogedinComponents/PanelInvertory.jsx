/* eslint-disable react/prop-types */
import styles from "./PanelInvertory.module.scss";
import icononlnie from "../../../assets/panel/useronline.svg";
import { useState } from "react";
import { useEffect } from "react";
import infoicon from "../../../assets/panel/infofilled.svg";
import Swal from "sweetalert2";
import AnimatedNumber from "react-animated-number";
import { useMemo } from "react";
function PanelInvertory({ online, statusMoney, volume, serverSetting }) {
  const [usedMoney, setUsedMoney] = useState(0);
  const [levelUser, setLevelUser] = useState("");
  const [deactiveUser, setDeactiveUser] = useState(0);
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
  useEffect(() => {
    if (statusMoney == undefined) return;
    // Toast.fire({
    //   icon: "warning",
    //   title: `موجودی حسابتان منفی شده و به زودی سرور شما خاموش میشود`,
    // });
    let deactive = serverSetting[0].clientStats.filter((index) => {
      if (index.enable == false) {
        return index;
      }
    });
    setDeactiveUser(deactive.length);
    switch (statusMoney.xrange) {
      case statusMoney.silver:
        setLevelUser("Silver");
        break;
      case statusMoney.gold:
        setLevelUser("Golden");
        break;
      case statusMoney.diamond:
        setLevelUser("Diamond");
        break;
      case statusMoney.lengend:
        setLevelUser("Lengendary");
        break;
      default:
        setLevelUser("Silver");
        break;
    }
  }, []);
  useEffect(() => {
    let convert_gig = 1073741824;
    let usedVolume = volume.up / convert_gig + volume.down / convert_gig;
    let usedm = Number(statusMoney.xrange) * Number(usedVolume.toFixed(2));
    let forSeprate = statusMoney.money - usedm;
    let seprated = new Intl.NumberFormat("en-US").format(forSeprate);
    setUsedMoney(forSeprate);
  }, [volume]);
  return (
    <div className={styles.container}>
      <div className={styles.headMoney}>
        <p>موجودی شما : </p>
        <h4>
          {" "}
          <AnimatedNumber
            component="text"
            value={Number(usedMoney)}
            style={{
              transition: "80s ease-out",
              // fontSize:
              transitionProperty: "background-color, color",
            }}
            duration={5000}
            formatValue={(n) => new Intl.NumberFormat("en-US").format(Math.ceil(n))}
          />
        </h4>
        <p>تومان</p>
      </div>
      <div className={styles.row2on}>
        <div className={styles.userOnline}>
          <p>آنلاین : </p>
          <h4>
            {" "}
            <AnimatedNumber
              component="text"
              value={Number(online.length)}
              style={{
                transition: "800s ease-out",
                // fontSize:
                transitionProperty: "background-color, color",
              }}
              duration={300}
              formatValue={(n) => Math.ceil(n)}
            />
          </h4>
          <img src={icononlnie} alt="" />
        </div>
        <div className={styles.userServer}>
          <h4>سطح کاربری شما :</h4>
          <p>{levelUser}</p>
          <div>
            <img src={infoicon} alt="info" />
            <div>
              <div className={styles.showDetect}>
                <p>
                  <span>Silver</span>
                  هرگیگ حجم - {statusMoney.silver} تومان
                </p>
                <p>
                  <span>Golden</span>
                  هرگیگ حجم - {statusMoney.gold} تومان
                </p>
                <p>
                  <span>Diamond</span>
                  هرگیگ حجم - {statusMoney.diamond} تومان
                </p>
                <p>
                  <span>Legendary</span>
                  هرگیگ حجم - {statusMoney.legend} تومان
                </p>
              </div>
              <div className={styles.showHinter}>
                <p>
                  <span>Golden</span>
                  دعوت 1 نفر برای خرید پنل
                </p>
                <p>
                  <span>Diamond</span>
                  دعوت 2 نفر برای خرید پنل
                </p>
                <p>
                  <span>Legendary</span>
                  دعوت 3 نفر برای خرید پنل
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row3on}>
        <div className={styles.catchAllusers}>
          <span>port : {serverSetting[0].port}</span>
          <p>
            کل کانفیگ ها : <span>{serverSetting[0].clientStats.length}</span>
          </p>
          <p>
            کانفیگ های منقضی شده : <span>{deactiveUser}</span>
          </p>
          <p>
            کانفیگ های فعال : <span>{serverSetting[0].clientStats.length - deactiveUser}</span>
          </p>
        </div>
      </div>
    </div>
  );
  return <div>ok</div>;
}

export default PanelInvertory;
