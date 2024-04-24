/* eslint-disable react/prop-types */
import PanelInvertory from "./LogedinComponents/PanelInvertory";
import PanelStatus from "./LogedinComponents/PanelStatus";
import Users from "./LogedinComponents/Users";
import axios from "axios";
import styles from "./LogedInAdmin.module.scss";
import changeicon from "../../assets/panel/change.svg";
import logouticon from "../../assets/panel/logoutpanel.svg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
function LogedInAdmin() {
  const [data, setData] = useState(null);
  const refInvertory = useRef(null);
  const refStatus = useRef(null);
  const usgContainer = useRef(null);
  const navigate = useNavigate();
  const postData = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/protectedata`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(response.data);
    } catch (error) {
      if (error.response.status == 500) {
        alert("مشکل را به ادمین اطلاع بدهید");
        navigate("/gotopanel");
      }
      if (error.response.data.status == "return login") {
        navigate("/gotopanel");
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      postData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const [changeSide, setChangeSide] = useState(false);
  useEffect(() => {
    if (refStatus.current == null) return;
    if (!changeSide) {
      refStatus.current.style.width = "auto";
      refStatus.current.style.overflow = "hidden";
      refInvertory.current.style.width = "none";
      refInvertory.current.style.overflow = "visible";
      usgContainer.current.style.justifyContent = "flex-start";
    } else {
      refStatus.current.style.width = "none";
      refStatus.current.style.overflow = "visible";
      refInvertory.current.style.width = "auto";
      refInvertory.current.style.overflow = "hidden";
      usgContainer.current.style.justifyContent = "flex-end";
    }
  }, [changeSide]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = `${process.env.API_URL}/gotopanel`;
  };

  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div ref={usgContainer} className={styles.usageConatiner}>
            <img onClick={() => setChangeSide(!changeSide)} className={styles.changeicon} src={changeicon} alt="" />
            <img onClick={() => handlelogout()} className={styles.logout} src={logouticon} alt="" />
            <div ref={refInvertory} className={styles.divInvertory}>
              <PanelInvertory
                statusMoney={data.range}
                online={data.dataOnline}
                volume={data.volume.totalVolume}
                serverSetting={data.dataInbound}
              />
            </div>
            <div ref={refStatus} className={styles.divStatus}>
              <PanelStatus status={data.volume.totalVolume} server={data.dataServer.obj} money={data.range} />
            </div>
          </div>
          <div className={styles.divUsers}>
            <Users users={data.dataInbound} onlines={data.dataOnline} adminpaxa={data.range} />
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
}

export default LogedInAdmin;
