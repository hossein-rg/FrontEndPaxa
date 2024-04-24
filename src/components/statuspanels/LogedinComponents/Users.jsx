/* eslint-disable react/prop-types */
import styles from "./Users.module.scss";
import updownicon from "../../../assets/panel/downup.svg";
import { useState } from "react";
import { useEffect, useRef } from "react";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import Swal from "sweetalert2";
import axios from "axios";
function Users({ users, onlines, adminpaxa }) {
  const [myUsers, setMyUsers] = useState("");
  const [inpSearch, setInpSearch] = useState("");
  const [numberList, setNumberList] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dataFilter, setDataFilter] = useState("تمام کاربران");
  const [realFilter, setRealFilter] = useState(0);
  const [uidSettings, setUidSettings] = useState(0);
  // add
  const [addUserInb, setAddUserInb] = useState(false);
  // delete
  const [delUserInb, setDelUserInb] = useState(false);
  const [emailDelUser, setEmailDelUser] = useState("");
  const [emailUuid, setEmailUuid] = useState("");
  // edit
  const [editUserInb, setEditUserInb] = useState(false);
  const [uuidEdit, setUuidEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [expireEdit, setExpireEdit] = useState("");
  const [totalEdit, setTotalEdit] = useState("");
  const [usageEdit, setUsageEdit] = useState("");
  const [tgidEdit, setTgidEdit] = useState("");
  const [statusEdit, setStatusEdit] = useState("");
  const [subidEdit, setSubIdEdit] = useState("");
  const [readyToedit, setReadyToedit] = useState("");
  const [settingLink, setSettingLink] = useState({});
  // UseEffect
  useEffect(() => {
    setSettingLink(JSON.parse(users[0].streamSettings));
    setUidSettings(JSON.parse(users[0].settings));
    if (inpSearch === "" && realFilter == 0) {
      setMyUsers(users[0].clientStats.sort((a, b) => b.id - a.id));
    }
  }, [users, realFilter]);

  // UseEffect
  useEffect(() => {
    if (editUserInb == false) {
      setUsageEdit("");
      setTgidEdit("");
      setStatusEdit("");
      setSubIdEdit("");
      setReadyToedit("");
      setTotalEdit("");
      setUuidEdit("");
      setEmailEdit("");
      setExpireEdit("");
    }
  }, [editUserInb]);

  // UseEffect
  useEffect(() => {
    setNumberList(myUsers.length);
    console.log(myUsers.length)
    myUsers.length != 0 ? setLoading(true) : setLoading(false);
  }, [loading, myUsers, realFilter]);
  useEffect(() => {
    const searchPattern = new RegExp(inpSearch);
    if (inpSearch === "") {
      setMyUsers([]);
      setLoading(false);
    } else {
      let filteredUsers = myUsers.filter((user) => {
        if (searchPattern.exec(user.email) !== null) {
          return user.email;
        }
      });
      let filteredUid = uidSettings.clients.filter((sett) => {
        if (searchPattern.exec(sett.id) !== null || searchPattern.exec(sett.tgId) !== null) {
          return sett.email;
        }
      });
      if (filteredUsers.length != 0 && filteredUid.length == 0) {
        let convert = filteredUid.filter((index) => {
          let temp = filteredUsers.find((item) => {
            if (item.email != index.email) {
              return item.email;
            }
          });
          return temp;
        });
        filteredUsers.push(...convert);
      } else if (filteredUsers.length != 0 && filteredUid.length != 0) {
        // hehe
        let pough = filteredUid.filter((index) => {
          let temp = filteredUsers.find((item) => {
            if (item.email != index.email) {
              return item.email;
            }
          });
          return temp;
        });
        //
        let convert = users[0].clientStats.filter((item) => {
          let temp = pough.find((index) => {
            if (item.email == index.email) return index.email;
          });
          return temp;
        });
        filteredUsers.push(...convert);
      } else {
        let convert = users[0].clientStats.filter((item) => {
          let temp = filteredUid.find((index) => {
            if (item.email == index.email) return index.email;
          });
          return temp;
        });
        filteredUsers.push(...convert);
      }
      setMyUsers(filteredUsers);
    }
  }, [inpSearch]);

  // Convert Date
  const convertDate = (millis) => {
    // maybe bug
    if (millis <= 0) return 0;
    const date = new Date(millis);
    const options = {
      timeZone: "Asia/Tehran",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const iranianDate = new Intl.DateTimeFormat("fa-IR", options).format(date);
    return iranianDate;
  };
  const toggFilter = useRef(null);
  const handleFilter = () => {
    toggFilter.current.classList.toggle(styles.autoOpentoggle);
  };

  // UseEffect
  useEffect(() => {
    if (inpSearch != "") return;
    if (realFilter == 1) {
      setMyUsers(onlines);
    } else if (realFilter == 2) {
      let active = users[0].clientStats.filter((index) => {
        if (index.enable == true) {
          return index;
        }
      });
      setMyUsers(active);
    } else if (realFilter == 3) {
      let deactive = users[0].clientStats.filter((index) => {
        if (index.enable == false) {
          return index;
        }
      });
      setMyUsers(deactive);
    } else if (realFilter == 4) {
      let infinite = users[0].clientStats.filter((index) => {
        if (index.total == 0 && index.expiryTime == 0) {
          return index;
        }
      });
      setMyUsers(infinite);
    }
  }, [realFilter, onlines]);

  // handle EditUser
  useEffect(() => {
    if (readyToedit == "") return;
    setEditUserInb(!addUserInb);
    let target = readyToedit.dataset;
    setUuidEdit(target.uuid);
    setEmailEdit(target.email);
    setExpireEdit(convertDate(Number(target.expire)));
    // (target.expire);
    setTotalEdit(target.total);
    setUsageEdit(target.usage);
    setTgidEdit(target.tgid);
    setStatusEdit(target.status);
    setSubIdEdit(target.subid);
    setEditUserInb(true);
  }, [readyToedit]);
  // const handleEditUser = (e) => {

  // };

  // handle DeleteUser
  const handelDeleteUser = (e) => {
    setEmailDelUser(e.target.dataset.email);
    setEmailUuid(e.target.dataset.uuid);
    setDelUserInb(true);
  };

  // SelectionFilter
  const selectFilter = (e) => {
    let selection = e.target.dataset.filter;
    if (selection == 0) setDataFilter("تمام کاربران");
    else if (selection == 1) setDataFilter("آنلاین");
    else if (selection == 2) setDataFilter("فعال");
    else if (selection == 3) setDataFilter("غیرفعال");
    else if (selection == 4) setDataFilter("نامحدود");
    setRealFilter(Number(selection));
    setInpSearch("");
    toggFilter.current.classList.toggle(styles.autoOpentoggle);
  };

  // copy link
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
  const handleCopyLink = (e) => {
    var textArea = document.createElement("textarea");
    textArea.value = e.target.dataset.link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    Toast.fire({
      icon: "success",
      title: `لینک با موفقیت کپی شد`,
    });
  };

  // send to paxa panel users
  const sendToPaxaPanel = (e) => {
    setLoading(true);
    let datauser = e.target.dataset;
    if (datauser.tgid == "") {
      Toast.fire({
        icon: "warning",
        title: `تلگرام ایدی برای پسورد وجود ندارد`,
      });
      setLoading(false);
      return;
    }
    let datapost = {
      email: datauser.email,
      link: datauser.link,
      userpass: datauser.tgid,
      admin: adminpaxa.adminTag,
      mci_status: "on",
      irancell_status: "on",
    };
    axios
      .post(`${process.env.API_URL}/admin`, datapost, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        setLoading(false);
        Toast.fire({
          icon: "success",
          title: `${res.data.msg}`,
        });
      })
      .catch((error) =>
        Toast.fire({
          icon: "warning",
          title: `${error.response.data.msg}`,
        })
      );
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.filterbox}>
        <div className={styles.filter}>
          <p>فیلتر</p>
          <img src={updownicon} alt="" />
          <button onClick={handleFilter}>{dataFilter}</button>
          <div ref={toggFilter} className={styles.autoOpen}>
            <button onClick={selectFilter} data-filter={0}>
              تمام کاربران
            </button>
            <button onClick={selectFilter} data-filter={1}>
              آنلاین
            </button>
            <button onClick={selectFilter} data-filter={2}>
              فعال
            </button>
            <button onClick={selectFilter} data-filter={3}>
              غیرفعال
            </button>
            <button onClick={selectFilter} data-filter={4}>
              نامحدود
            </button>
          </div>
        </div>
        <div className={styles.searchbox}>
          <input
            className={styles.search}
            type="text"
            placeholder="جستجو..."
            value={inpSearch}
            onChange={(e) => setInpSearch(e.target.value)}
          />
          <p style={{ opacity: numberList == 0 ? "0" : "1" }}>{numberList == 0 ? "0" : `${numberList} مورد یافت شد`}</p>
        </div>
        <div style={{ display: addUserInb ? "block" : "none" }} className={styles.FatherAddUser}>
          {" "}
          <AddUser
            editUser={false}
            tgidEdit={""}
            gigEdit={0}
            expireEdit={0}
            idInbound={users[0].id}
            backClose={(data) => setAddUserInb(data)}
            status={addUserInb}
            tcpSetting={settingLink.network}
            tcpDirect={settingLink.security}
          />
        </div>
        <div style={{ display: editUserInb ? "block" : "none" }} className={styles.FatherAddUser}>
          {" "}
          <AddUser
            editUser={true}
            uuidEdit={uuidEdit}
            emailEdit={emailEdit}
            expireEdit={expireEdit}
            tgidEdit={tgidEdit}
            gigEdit={totalEdit}
            usageEdit={usageEdit}
            statusEdit={statusEdit}
            subidEdit={subidEdit}
            idInbound={users[0].id}
            backClose={(data) => setEditUserInb(data)}
            status={addUserInb}
            tcpSetting={settingLink.network}
            tcpDirect={settingLink.security}
          />
        </div>
        {delUserInb ? (
          <div className={styles.FatherDelUser}>
            <DeleteUser email={emailDelUser} uuid={emailUuid} inbId={users[0].id} />
          </div>
        ) : (
          <></>
        )}
        <div className={styles.newaccount}>
          <button onClick={() => setAddUserInb(!addUserInb)}>افزودن کاربر جدید</button>
        </div>
      </div>
      {loading ? (
        myUsers.map((config, index) => {
          let emailsam = uidSettings.clients.filter((sett) => {
            if (sett.email == config.email) {
              return sett;
            }
          });
          let usageUsed = Math.floor(config.up + config.down);
          let convertBiteUsed = String(usageUsed).length > 9 ? usageUsed / 1073741824 : usageUsed / 1048576;
          let usageUsedFixed = convertBiteUsed.toFixed(2);
          let convertTotal = String(config.total).length >= 8 ? config.total / 1073741824 : config.total / 1048576;
          let totalUsage = convertTotal.toFixed();
          return (
            <div className={styles.userInb} key={index} data-id={config.id} data-inbid={config.inboundId}>
              <div className={styles.emailuser}>
                <p>
                  ایمیل : <span>{config.email}</span>
                  {/* {console.log(emailsam[0].enable)} */}
                  {/* <span style={{ opacity: !emailsam[0].enable ? "1" : "0" }}>{!emailsam[0].enable ? "متوقف شده" : ""}</span> */}
                </p>
                <div>
                  <p style={{ background: config.enable ? "rgb(171, 255, 87)" : "rgb(255, 87, 87)" }}>
                    {config.enable ? "فعال" : "غیرفعال"}
                  </p>
                  <p
                    data-link={settingLink.security == "none" ? `vless://${emailsam[0].id}@${settingLink.externalProxy[0].dest}:${settingLink.externalProxy[0].port}?type=${settingLink.network}&path=%2F&host=i.stack.imgur.com&headerType=http&security=none#${config.email}` : `vless://${emailsam[0].id}@${settingLink.externalProxy[0].dest}:${settingLink.externalProxy[0].port}?type=${settingLink.network
                      }${settingLink.network == "grpc" ? `&serviceName=${settingLink.grpcSettings.serviceName}` : ""}&security=${settingLink.security
                      }&pbk=${settingLink.realitySettings.settings.publicKey}&fp=${settingLink.realitySettings.settings.fingerprint}&sni=${settingLink.realitySettings.serverNames[0]
                      }&sid=${settingLink.realitySettings.shortIds[0]}&spx=%2F${settingLink.network == "tcp" ? "&flow=xtls-rprx-vision" : ""
                      }#${config.email}`}
                    onClick={handleCopyLink}
                  >
                    کپی
                  </p>
                  {adminpaxa.adminTag != undefined ? (
                    <p
                      onClick={sendToPaxaPanel}
                      className={styles.paxapanel}
                      data-link={`vless://${emailsam[0].id}@${settingLink.externalProxy[0].dest}:${settingLink.externalProxy[0].port
                        }?type=${settingLink.network}${settingLink.network == "grpc" ? `&serviceName=${settingLink.grpcSettings.serviceName}` : ""
                        }&security=${settingLink.security}&pbk=${settingLink.realitySettings.settings.publicKey}&fp=${settingLink.realitySettings.settings.fingerprint
                        }&sni=${settingLink.realitySettings.serverNames[0]}&sid=${settingLink.realitySettings.shortIds[0]}&spx=%2F${settingLink.network == "tcp" ? "&flow=xtls-rprx-vision" : ""
                        }#${config.email}`}
                      data-email={config.email}
                      data-tgid={emailsam[0].tgId}
                    >
                      Paxa
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={styles.usageuser}>
                {String(usageUsed).length > 9 ? (
                  <p>
                    {usageUsedFixed}
                    <span>گیگابایت</span>
                  </p>
                ) : (
                  <p>
                    {usageUsedFixed}
                    <span>مگابایت</span>
                  </p>
                )}
                <p>/</p>
                {totalUsage != 0 ? (
                  <p>
                    {totalUsage}
                    <span>گیگابایت</span>
                  </p>
                ) : (
                  <p>
                    <span>نامحدود</span>
                  </p>
                )}
              </div>
              <div className={styles.expireuser}>
                <p>
                  تاریخ انقضا : <span>{config.expiryTime ? convertDate(config.expiryTime) : "نامحدود"}</span>
                </p>
              </div>
              <div className={styles.emailUuid}>
                {/* {console.log(emailsam)} */}
                <p> {emailsam[0].id}</p>
                <p>{emailsam[0].tgId}</p>
              </div>
              <div className={styles.suboredit}>
                <button
                  data-uuid={emailsam[0].id}
                  data-email={config.email}
                  data-expire={config.expiryTime}
                  data-total={totalUsage}
                  data-usage={usageUsed}
                  data-tgid={emailsam[0].tgId}
                  data-status={emailsam[0].enable}
                  data-subid={emailsam[0].subId}
                  onClick={(e) => setReadyToedit(e.target)}
                >
                  ویرایش
                </button>
                <button data-email={config.email} data-uuid={emailsam[0].id} onClick={handelDeleteUser}>
                  حذف
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <p style={{ textAlign: "center", color: "white", fontSize: "0.9rem" }}>
            {numberList != 0 || users[0].clientStats.length != 0 ? "Loading ..." : "موردی یافت نشد"}
          </p>
        </>
      )}
    </div>
  );
}

export default Users;
