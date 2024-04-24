/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../assets/styles/shop/selectionSteps.module.scss";
class SelectTerm extends React.Component {
  constructor() {
    super();
    this.checkboxAnten = React.createRef();
    this.userPlus = React.createRef();
    this.codeOff = React.createRef();
  }

  handleChange = () => {
    const checkboxAnten = this.checkboxAnten.current.checked;
    let checkboxPlus = Number(this.userPlus.current.value);
    const checkboxCodeoff = this.codeOff.current.value;
    if (checkboxPlus > 3) {
      checkboxPlus = 3;
    }
    return this.props.check(checkboxAnten, checkboxPlus, checkboxCodeoff);
  };

  componentDidMount = () => {
    this.handleChange();
  };

  render() {
    return (
      <div className={styles.boxBodySelectTerm}>
        <div className={styles.detailSelectTerm}>
          <p>آپشن های اضافی اکانت خود را انتخاب کنید؟</p>
        </div>
        <div className={styles.options}>
          <div>
            <div className={styles.option1}>
              <p style={{ direction: "rtl" }}>سفارشی کردن سرور و ارائه پینگ پایین تر</p>
              <div className={styles.cbx}>
                <input onChange={this.handleChange} ref={this.checkboxAnten} id="cbx" type="checkbox" />
                <label htmlFor="cbx"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <svg style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo">
                    <fegaussianblur in="SourceGraphic" stdDeviation="4" result="blur"></fegaussianblur>
                    <fecolormatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo"
                    ></fecolormatrix>
                    <feblend in="SourceGraphic" in2="goo"></feblend>
                  </filter>
                </defs>
              </svg>
            </div>
            <p className={styles.detailOption1}>با 30 هزارتومان پینگ شما مخصوص انواع بازی ها میشه</p>
          </div>
          <div>
            <div className={styles.option2}>
              <p> افزودن کاربر بیشتر</p>
              <input onChange={this.handleChange} ref={this.userPlus} type="number" min={0} defaultValue={0} max={3} />
            </div>
            <p className={styles.detailOption1}>افزودن هر کاربر اضافی 20+ هزارتومان (نهایت تا سه کاربر اضافه تر)</p>
          </div>
          <div className={styles.option3}>
            <p>اگر کد تخفیفی دارید وارد کنید :</p>
            <input onChange={this.handleChange} ref={this.codeOff} type="text" />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTerm;
