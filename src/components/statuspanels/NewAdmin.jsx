import { useState } from "react";
import styles from "./NewAdmin.module.scss";
import axios from "axios";
function NewAdmin() {
  const [iUsername, setIUsername] = useState("");
  const [iPassword, setIPassword] = useState("");
  const [iPort, setIPort] = useState("");
  const [iMoney, setIMoney] = useState("");
  const [iXrange, setIXrange] = useState("");
  const [iSilver, setISilver] = useState("");
  const [iGold, setIgold] = useState("");
  const [iDiamond, setIDiamond] = useState("");
  const [iLegend, setILegend] = useState("");
  const [iSession, setISession] = useState("");
  const [iUrl, setIUrl] = useState("");
  const [iKey, setIKey] = useState("");
  const [uPass, setUpass] = useState("off");
  const [uPort, setUport] = useState("off");
  const [uSession, setUsession] = useState("off");
  const [uUrl, setUurl] = useState("off");
  const [uMoney, setUmoney] = useState("off");
  const [uXrange, setUxrange] = useState("off");

  //   const addQuery = { port: data.port, email: data.email, password: data.password, sessionPanel: data.sessionPanel, urlServer: data.urlServer };

  const handlePost = () => {
    if (iUsername == "") {
      alert("need userName");
      return;
    }
    axios
      .post(`${process.env.API_URL}/postadmin`, {
        email: iUsername,
        password: iPassword,
        port: iPort,
        sessionPanel: iSession,
        urlServer: iUrl,
        keySpecial: iKey,
        money: iMoney,
        xrange: iXrange,
        xsilver: iSilver,
        xgold: iGold,
        xdiamond: iDiamond,
        xlegend: iLegend,
        howUpdate: { pass: uPass, port: uPort, session: uSession, url: uUrl, money: uMoney, xrange: uXrange },
      })
      .then((res) => {
        alert(res.data.status);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <h2>New Admin Or Update</h2>
        <form>
          <div className={styles.user_box}>
            <input onChange={(i) => setIUsername(i.target.value)} type="text" name="" required="" />
            <label>Username</label>
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIPassword(i.target.value)} type="text" name="" required="" />
            <label>Password</label>
            <input type="radio" name="" id="" onChange={(i) => setUpass(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIPort(i.target.value)} type="tel" name="" required="" />
            <label>Port</label>
            <input type="radio" name="" id="" onChange={(i) => setUport(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIMoney(i.target.value)} type="tel" name="" required="" />
            <label>Money</label>
            <input type="radio" name="" id="" onChange={(i) => setUmoney(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIXrange(i.target.value)} type="tel" name="" required="" />
            <label>xRange</label>
            <input type="radio" name="" id="" onChange={(i) => setUxrange(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setISilver(i.target.value)} type="tel" name="" required="" />
            <label>Range Silver</label>
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIgold(i.target.value)} type="tel" name="" required="" />
            <label>Range Gold</label>
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIDiamond(i.target.value)} type="tel" name="" required="" />
            <label>Range Diamond</label>
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setILegend(i.target.value)} type="tel" name="" required="" />
            <label>Range Legend</label>
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setISession(i.target.value)} type="tel" name="" required="" />
            <label>Session</label>
            <input type="radio" name="" id="" onChange={(i) => setUsession(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIUrl(i.target.value)} type="tel" name="" required="" />
            <label>Url without http</label>
            <input type="radio" name="" id="" onChange={(i) => setUurl(i.target.value)} />
          </div>
          <div className={`${styles.user_box} ${styles.pass_box}`}>
            <input onChange={(i) => setIUrl(i.target.value)} type="tel" name="" required="" />
            <label>Key</label>
          </div>
          <a href="#" onClick={handlePost}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </a>
        </form>
      </div>
    </div>
  );
}

export default NewAdmin;
