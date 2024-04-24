import { useRef, useState, useEffect } from "react";
import styles from "../../assets/styles/login/login.module.scss";
import imgHead from "../../assets/images/login/headlogin.png";
import logo from "../../assets/panel/logofuture.png";
import eye from "../../assets/images/login/eye.svg";
import eyeSlash from "../../assets/images/login/eye-slash.svg";
import ParticlesComponent from "../ParticlesComponent";
import LogedInPageReality from "./LogedInPageReality";
import LogedInPageGrpc from "./LogedInPageGrpc";
function LoginPage() {
  const eyeSpan = useRef(null);
  const eyeImg = useRef(null);
  const refActive = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const [user, setUser] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  const [clickBtn, setClickBtn] = useState("");
  const [goTo, setGoTo] = useState(false);
  useEffect(() => {
    if (logedIn == true) {
      const timeoutId = setTimeout(() => {
        setGoTo(true);
      }, 6000);
      return () => clearTimeout(timeoutId);
    } else if (clickBtn == true && logedIn == false) {
      const timeoutanime = setTimeout(() => {
        refActive.current.classList.remove(styles.active);
        setClickBtn(false);
      }, 6000);
      return () => clearTimeout(timeoutanime);
    }
  }, [clickBtn]);
  const handleEye = () => {
    const password = document.querySelector("#password");
    // toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.getAttribute("type") === "password" ? (eyeImg.current.src = eye) : (eyeImg.current.src = eyeSlash);
    password.setAttribute("type", type);
  };
  const postInbound = async () => {
    const email = usernameInput.current.value;
    const password = passwordInput.current.value;
    const response = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    // catch response
    const data = await response.json();
    if (response.ok) {
      refActive.current.classList.add(styles.active);
      localStorage.setItem("data", data.mainPageAfterSet.mongo._id);
      setUser({
        user: data,
      });
      setClickBtn(true);
      setLogedIn(true);
    } else {
      refActive.current.classList.add(styles.active);
      setClickBtn(true);
      setLogedIn(false);
    }
  };

  if (goTo) {
    let logicComponent = user.user.mainPageAfterSet.sub.logicComponent;
    if (logicComponent == "grpc") return <LogedInPageGrpc userdata={user.user} />;
    else if (logicComponent == "reality") return <LogedInPageReality userdata={user.user} />;
  } else {
    return (
      <div style={{ overflow: "hidden" }} className={styles.body}>
        {/* <ParticlesComponent /> */}
        <div className={styles.bodyLogin}>
          <div className={styles.headerTop}>
            <img src={logo} alt="head Image" />
            <p>AXA</p>
          </div>
          <div className={styles.headerLogin}>
            <form>
              <div className={styles.uiLogin}>
                <div className={styles.wave_group}>
                  <input
                    required
                    autoComplete="off"
                    type="text"
                    ref={usernameInput}
                    name="username"
                    id="username"
                    className={styles.input}
                  />
                  <span className={styles.bar}></span>
                  <label className={styles.label}>
                    <span className={styles.labelChar} style={{ "--index": 0 }}>
                      U
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 0 }}>
                      s
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 1 }}>
                      e
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 2 }}>
                      r
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 3 }}>
                      n
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 4 }}>
                      a
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 5 }}>
                      m
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 6 }}>
                      e
                    </span>
                  </label>
                </div>
                <div className={styles.wave_group}>
                  <input
                    required
                    autoComplete="off"
                    type="password"
                    ref={passwordInput}
                    name="text"
                    className={styles.input}
                    id="password"
                  />
                  <span className={styles.togglepassword}>
                    <i ref={eyeSpan} onClick={handleEye} className={`${styles.fa} ${styles.faEyeSlash}`}>
                      <img ref={eyeImg} src={eyeSlash} />
                    </i>
                  </span>
                  <span className={styles.bar}></span>
                  <label className={styles.label}>
                    <span className={styles.labelChar} style={{ "--index": 0 }}>
                      P
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 0 }}>
                      a
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 1 }}>
                      s
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 2 }}>
                      s
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 3 }}>
                      w
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 4 }}>
                      o
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 5 }}>
                      r
                    </span>
                    <span className={styles.labelChar} style={{ "--index": 6 }}>
                      d
                    </span>
                  </label>
                </div>
              </div>
              {/* <button className={styles.uiSubmit} type="submit">
                  Login
                </button> */}
              <div ref={refActive} className={styles.container}>
                <div onClick={postInbound}></div>
                <span className={styles.text}>LOGIN</span>
                <svg
                  className={`${styles.fingerprint} ${styles.fingerprint_base}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 100 100"
                >
                  <g className={styles.fingerprint_out} fill="none" strokeWidth="2" strokeLinecap="round">
                    <path
                      className={styles.odd}
                      d="m 25.117139,57.142857 c 0,0 -1.968558,-7.660465 -0.643619,-13.149003 1.324939,-5.488538 4.659682,-8.994751 4.659682,-8.994751"
                    />
                    <path
                      className={styles.odd}
                      d="m 31.925369,31.477584 c 0,0 2.153609,-2.934998 9.074971,-5.105078 6.921362,-2.17008 11.799844,-0.618718 11.799844,-0.618718"
                    />
                    <path
                      className={styles.odd}
                      d="m 57.131213,26.814448 c 0,0 5.127709,1.731228 9.899495,7.513009 4.771786,5.781781 4.772971,12.109204 4.772971,12.109204"
                    />
                    <path className={styles.odd} d="m 72.334009,50.76769 0.09597,2.298098 -0.09597,2.386485" />
                    <path
                      className={styles.even}
                      d="m 27.849282,62.75 c 0,0 1.286086,-1.279223 1.25,-4.25 -0.03609,-2.970777 -1.606117,-7.675266 -0.625,-12.75 0.981117,-5.074734 4.5,-9.5 4.5,-9.5"
                    />
                    <path
                      className={styles.even}
                      d="m 36.224282,33.625 c 0,0 8.821171,-7.174484 19.3125,-2.8125 10.491329,4.361984 11.870558,14.952665 11.870558,14.952665"
                    />
                    <path
                      className={styles.even}
                      d="m 68.349282,49.75 c 0,0 0.500124,3.82939 0.5625,5.8125 0.06238,1.98311 -0.1875,5.9375 -0.1875,5.9375"
                    />
                    <path
                      className={styles.odd}
                      d="m 31.099282,65.625 c 0,0 1.764703,-4.224042 2,-7.375 0.235297,-3.150958 -1.943873,-9.276886 0.426777,-15.441942 2.370649,-6.165056 8.073223,-7.933058 8.073223,-7.933058"
                    />
                    <path
                      className={styles.odd}
                      d="m 45.849282,33.625 c 0,0 12.805566,-1.968622 17,9.9375 4.194434,11.906122 1.125,24.0625 1.125,24.0625"
                    />
                    <path
                      className={styles.even}
                      d="m 59.099282,70.25 c 0,0 0.870577,-2.956221 1.1875,-4.5625 0.316923,-1.606279 0.5625,-5.0625 0.5625,-5.0625"
                    />
                    <path
                      className={styles.even}
                      d="m 60.901059,56.286612 c 0,0 0.903689,-9.415996 -3.801777,-14.849112 -3.03125,-3.5 -7.329245,-4.723939 -11.867187,-3.8125 -5.523438,1.109375 -7.570313,5.75 -7.570313,5.75"
                    />
                    <path
                      className={styles.even}
                      d="m 34.072577,68.846248 c 0,0 2.274231,-4.165782 2.839205,-9.033748 0.443558,-3.821814 -0.49394,-5.649939 -0.714206,-8.05386 -0.220265,-2.403922 0.21421,-4.63364 0.21421,-4.63364"
                    />
                    <path
                      className={styles.odd}
                      d="m 37.774165,70.831845 c 0,0 2.692139,-6.147592 3.223034,-11.251208 0.530895,-5.103616 -2.18372,-7.95562 -0.153491,-13.647655 2.030229,-5.692035 8.108442,-4.538898 8.108442,-4.538898"
                    />
                    <path
                      className={styles.odd}
                      d="m 54.391174,71.715729 c 0,0 2.359472,-5.427681 2.519068,-16.175068 0.159595,-10.747388 -4.375223,-12.993087 -4.375223,-12.993087"
                    />
                    <path
                      className={styles.even}
                      d="m 49.474282,73.625 c 0,0 3.730297,-8.451831 3.577665,-16.493718 -0.152632,-8.041887 -0.364805,-11.869326 -4.765165,-11.756282 -4.400364,0.113044 -3.875,4.875 -3.875,4.875"
                    />
                    <path
                      className={styles.even}
                      d="m 41.132922,72.334447 c 0,0 2.49775,-5.267079 3.181981,-8.883029 0.68423,-3.61595 0.353553,-9.413359 0.353553,-9.413359"
                    />
                    <path
                      className={styles.odd}
                      d="m 45.161782,73.75 c 0,0 1.534894,-3.679847 2.40625,-6.53125 0.871356,-2.851403 1.28125,-7.15625 1.28125,-7.15625"
                    />
                    <path
                      className={styles.odd}
                      d="m 48.801947,56.125 c 0,0 0.234502,-1.809418 0.109835,-3.375 -0.124667,-1.565582 -0.5625,-3.1875 -0.5625,-3.1875"
                    />
                  </g>
                </svg>
                <svg
                  className={`${styles.fingerprint} ${styles.fingerprint_active}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  viewBox="0 0 100 100"
                >
                  <g className={styles.fingerprint_out} fill="none" strokeWidth="2" strokeLinecap="round">
                    <path
                      className={styles.odd}
                      d="m 25.117139,57.142857 c 0,0 -1.968558,-7.660465 -0.643619,-13.149003 1.324939,-5.488538 4.659682,-8.994751 4.659682,-8.994751"
                    />
                    <path
                      className={styles.odd}
                      d="m 31.925369,31.477584 c 0,0 2.153609,-2.934998 9.074971,-5.105078 6.921362,-2.17008 11.799844,-0.618718 11.799844,-0.618718"
                    />
                    <path
                      className={styles.odd}
                      d="m 57.131213,26.814448 c 0,0 5.127709,1.731228 9.899495,7.513009 4.771786,5.781781 4.772971,12.109204 4.772971,12.109204"
                    />
                    <path className={styles.odd} d="m 72.334009,50.76769 0.09597,2.298098 -0.09597,2.386485" />
                    <path
                      className={styles.even}
                      d="m 27.849282,62.75 c 0,0 1.286086,-1.279223 1.25,-4.25 -0.03609,-2.970777 -1.606117,-7.675266 -0.625,-12.75 0.981117,-5.074734 4.5,-9.5 4.5,-9.5"
                    />
                    <path
                      className={styles.even}
                      d="m 36.224282,33.625 c 0,0 8.821171,-7.174484 19.3125,-2.8125 10.491329,4.361984 11.870558,14.952665 11.870558,14.952665"
                    />
                    <path
                      className={styles.even}
                      d="m 68.349282,49.75 c 0,0 0.500124,3.82939 0.5625,5.8125 0.06238,1.98311 -0.1875,5.9375 -0.1875,5.9375"
                    />
                    <path
                      className={styles.odd}
                      d="m 31.099282,65.625 c 0,0 1.764703,-4.224042 2,-7.375 0.235297,-3.150958 -1.943873,-9.276886 0.426777,-15.441942 2.370649,-6.165056 8.073223,-7.933058 8.073223,-7.933058"
                    />
                    <path
                      className={styles.odd}
                      d="m 45.849282,33.625 c 0,0 12.805566,-1.968622 17,9.9375 4.194434,11.906122 1.125,24.0625 1.125,24.0625"
                    />
                    <path
                      className={styles.even}
                      d="m 59.099282,70.25 c 0,0 0.870577,-2.956221 1.1875,-4.5625 0.316923,-1.606279 0.5625,-5.0625 0.5625,-5.0625"
                    />
                    <path
                      className={styles.even}
                      d="m 60.901059,56.286612 c 0,0 0.903689,-9.415996 -3.801777,-14.849112 -3.03125,-3.5 -7.329245,-4.723939 -11.867187,-3.8125 -5.523438,1.109375 -7.570313,5.75 -7.570313,5.75"
                    />
                    <path
                      className={styles.even}
                      d="m 34.072577,68.846248 c 0,0 2.274231,-4.165782 2.839205,-9.033748 0.443558,-3.821814 -0.49394,-5.649939 -0.714206,-8.05386 -0.220265,-2.403922 0.21421,-4.63364 0.21421,-4.63364"
                    />
                    <path
                      className={styles.odd}
                      d="m 37.774165,70.831845 c 0,0 2.692139,-6.147592 3.223034,-11.251208 0.530895,-5.103616 -2.18372,-7.95562 -0.153491,-13.647655 2.030229,-5.692035 8.108442,-4.538898 8.108442,-4.538898"
                    />
                    <path
                      className={styles.odd}
                      d="m 54.391174,71.715729 c 0,0 2.359472,-5.427681 2.519068,-16.175068 0.159595,-10.747388 -4.375223,-12.993087 -4.375223,-12.993087"
                    />
                    <path
                      className={styles.even}
                      d="m 49.474282,73.625 c 0,0 3.730297,-8.451831 3.577665,-16.493718 -0.152632,-8.041887 -0.364805,-11.869326 -4.765165,-11.756282 -4.400364,0.113044 -3.875,4.875 -3.875,4.875"
                    />
                    <path
                      className={styles.even}
                      d="m 41.132922,72.334447 c 0,0 2.49775,-5.267079 3.181981,-8.883029 0.68423,-3.61595 0.353553,-9.413359 0.353553,-9.413359"
                    />
                    <path
                      className={styles.odd}
                      d="m 45.161782,73.75 c 0,0 1.534894,-3.679847 2.40625,-6.53125 0.871356,-2.851403 1.28125,-7.15625 1.28125,-7.15625"
                    />
                    <path
                      className={styles.odd}
                      d="m 48.801947,56.125 c 0,0 0.234502,-1.809418 0.109835,-3.375 -0.124667,-1.565582 -0.5625,-3.1875 -0.5625,-3.1875"
                    />
                  </g>
                </svg>
                <svg className={styles.ok} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
                  {!logedIn ? (
                    <path d="M30 30 L70 70 M70 30 L30 70" fill="none" stroke="#fff" strokeWidth="6" />
                  ) : (
                    <path d="M34.912 50.75l10.89 10.125L67 36.75" fill="none" stroke="#fff" strokeWidth="6" />
                  )}
                </svg>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;
