/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../assets/styles/shop/selectionSteps.module.scss";
class ShowResultPackage extends React.Component {
  render() {
    if (this.props.data == null) {
      return (
        <div className={styles.bodyResult} style={{ color: "white" }}>
          صبر کنید ...
        </div>
      );
    } else {
      return (
        <div className={styles.bodyResult}>
          <div className={styles.bodyinResult}>
            <h2 className={styles.detailResult}>از این رسید اسکرین شات بگیرید و بعد پرداخت به پشتیبانی داخل تلگرام بفرستید</h2>
            <div className={styles.selectedResult}>
              <h2>بسته ی انتخابی من :</h2>
              <div>
                <p>{this.props.data.plan}</p>
                <p>{this.props.data.detail.value} گیگ</p>
                {this.props.data.planId == 2 ? <p>بدون محدودیت کاربر</p> : <p>{this.props.data.finalUsers} کاربره</p>}
                {this.props.data.optionPlus ? <p>سرور ویژه</p> : <></>}
              </div>
            </div>
            <div className={styles.priceSelected}>
              <p>ارزش نهایی :</p>
              <p>{this.props.data.price} تومان + کارمزد </p>
              {this.props.data.checkCode ? (
                <div>
                  <p>{this.props.data.codePrice}</p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p className={styles.alertDargah}>
              در مرحله پرداخت درگاه برای تایید هویت شما , شماره تلفن میخواهد در نتیجه شماره ای سمت ما ذخیره نمیشود
            </p>
            {/* <a className={styles.linkPardakht} href={this.props.data.createdLink}>
              پرداخت
            </a> */}
            <p className={styles.dateTime}>{this.props.data.date}</p>
          </div>
        </div>
      );
    }
  }
}

export default ShowResultPackage;
