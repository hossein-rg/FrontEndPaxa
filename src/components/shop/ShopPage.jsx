import React from "react";
import styles from "../../assets/styles/shop/mainpage.module.scss";
import HandleSelection from "./HandleSelection";
import logo from "../../assets/images/shop/mainlog.png";
import arrowIcon from "../../assets/images/shop/arrow.svg";
import member from "../../assets/images/shop/member.png";
import location from "../../assets/images/shop/loc.png";
import server from "../../assets/images/shop/server.png";
import AnimatedNumber from "react-animated-number";
import HandlePanel from "./HandlePanel";
// import AnimatedNumbers from "react-animated-numbers";
// import HandlePanel from "./HandlePanel";
class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      clickBtn: 0,
      clickPanel: 0,
    };
  }

  handleClickBuy = () => {
    this.setState({
      clickBtn: 1,
    });
  };

  handleClickPanel = () => {
    this.setState({
      clickPanel: 1,
    });
  };

  render() {
    if (this.state.clickBtn == 0 && this.state.clickPanel == 0) {
      return (
        <div className={styles.mainDiv}>
          <img src={logo} alt=" خرید vpn" />
          <div className={styles.divDetail}>
            <h1>خرید اکانت فیلترشکن برای عبور از تحریم ها</h1>
            <div>
              <div>
                <span>🟢</span>
                <p>مناسب اندروید , آیفون و ویندوز</p>
              </div>
              <div>
                <span>🟢</span>
                <p>مناسب ایرانسل , همراه اول و وایفای</p>
              </div>
              <div>
                <span>🟢</span>
                <p>آیپی ثابت و پینگ مناسب مخصوص گیم</p>
              </div>
              <div>
                <span>🟢</span>
                <p>پشتیبانی 24 ساعته داخل تلگرام و پنل کاربر</p>
              </div>
              <div>
                <span>🟢</span>
                <p>دسترسی راحت به تمام سایتهای فیلتر</p>
              </div>
              <div>
                <span>🟢</span>
                <p>عودت وجه در صورت نارضایتی از سرعت</p>
              </div>
            </div>
          </div>
          <div className={styles.boxArrows}>
            <div onClick={this.handleClickBuy} className={styles.buyServiceBtn}>
              <img src={arrowIcon} alt="خرید وی پی ان" />
              <div>خرید سرویس</div>
            </div>
            <div onClick={this.handleClickPanel} className={styles.buyServiceBtn}>
              <img src={arrowIcon} alt="خرید وی پی ان" />
              <div>پنل همکاری </div>
            </div>
          </div>
          <div className={styles.serverLatency}>
            <div>
              <img src={member} alt="خرید فیلترشکن پرسرعت" />
              <div>
                <p>
                  <AnimatedNumber
                    component="text"
                    value={Number(981)}
                    style={{
                      transition: "80s ease-out",
                      // fontSize:
                      transitionProperty: "background-color, color",
                    }}
                    duration={5000}
                    formatValue={(n) => Math.ceil(n)}
                  />
                </p>
                <p>اکانت فعال</p>
              </div>
            </div>
            <div>
              <img src={server} alt="خرید فیلترشکن پرسرعت" />
              <div>
                <p>
                  <AnimatedNumber
                    component="text"
                    value={24}
                    style={{
                      transition: "80s ease-out",
                      // fontSize:
                      transitionProperty: "background-color, color",
                    }}
                    duration={5000}
                    formatValue={(n) => Math.ceil(n)}
                  />
                </p>
                <p>سرور</p>
              </div>
            </div>
            <div>
              <img src={location} alt="خرید فیلترشکن پرسرعت" />
              <div>
                <p>
                  <AnimatedNumber
                    component="text"
                    value={Number(10)}
                    style={{
                      transition: "80s ease-out",
                      // fontSize:
                      transitionProperty: "background-color, color",
                    }}
                    duration={5000}
                    formatValue={(n) => Math.ceil(n)}
                  />
                </p>
                <p>نمایندگی</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.clickPanel == 1) {
      return <HandlePanel />;
    } else return <HandleSelection />;
  }
}
export default ShopPage;
