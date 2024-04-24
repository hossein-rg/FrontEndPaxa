/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import styles from "./PanelStatus.module.scss";
import AnimatedNumber from "react-animated-number";
function PanelStatus({ status, server, money }) {
  const [usgUi, setUsageUi] = useState(0);
  const refRam = useRef(null);
  const refCpu = useRef(null);
  const refDisk = useRef(null);
  const valueForAnime = useRef(null);
  useEffect(() => {
    let convert_mega = 1048576;
    
    let usedVolume = status.up / convert_mega + status.down / convert_mega;
    let fixedVolume = usedVolume.toFixed();
    setUsageUi(fixedVolume);
    let usedForAnimate = Number(((status.up + status.down) / 1073741824).toFixed(2));
    let totalForAnimate = money.money / money.xrange;
    valueForAnime.current.style.width = `${100 - (usedForAnimate / totalForAnimate) * 100}%`;
    // complete animation ram ,cpu ,disk
    refCpu == null ? console.log() : refCpu.current.style.setProperty("--set-cpu", `${server.cpu.toFixed() * 10}%`);
    refDisk == null
      ? console.log()
      : refDisk.current.style.setProperty("--set-disk", `${(server.disk.current / server.disk.total) * 100}%`);
    refRam == null ? console.log() : refRam.current.style.setProperty("--set-ram", `${(server.mem.current / server.mem.total) * 100}%`);
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.usageGiga}>
        <p>
          حجم مصرف شده :
          <span>
            <AnimatedNumber
              component="text"
              value={Number(usgUi)}
              style={{
                transition: "80s ease-out",
                // fontSize:
                transitionProperty: "background-color, color",
              }}
              duration={5000}
              formatValue={(n) => Math.ceil(n)}
            />
          </span>
          مگابایت
        </p>
        <div className={styles.usageProcess}>
          <div ref={valueForAnime}></div>
        </div>
        <p>حجم کل : موجودی شما </p>
      </div>
      <div className={styles.row2on}>
        <div className={styles.cpuram}>
          <div>
            <div className={styles.refCpu} ref={refCpu}></div>
            <p>Cpu</p>
          </div>
          <div>
            <div className={styles.refRam} ref={refRam}></div>
            <p>Ram</p>
          </div>
          <div>
            <div className={styles.refDisk} ref={refDisk}></div>
            <p>Disk</p>
          </div>
        </div>
        <div className={styles.updown}>
          <div>
            <AnimatedNumber
              component="text"
              value={Math.floor(server.netIO.up / 1024)}
              style={{
                transition: "80s ease-out",
                // fontSize:
                transitionProperty: "background-color, color",
              }}
              duration={200}
              formatValue={(n) => Math.ceil(n)}
            />
            <p> kb/s </p>
            <p>: آپلود </p>
          </div>
          <div>
            <AnimatedNumber
              component="text"
              value={Math.floor(server.netIO.down / 1024)}
              style={{
                transition: "80s ease-out",
                // fontSize:
                transitionProperty: "background-color, color",
              }}
              duration={200}
              formatValue={(n) => Math.ceil(n)}
            />
            <p> kb/s </p>
            <p>: دانلود </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelStatus;
