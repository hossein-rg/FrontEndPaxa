import React from "react";
import axios from "axios";
import styles from "../../assets/styles/checkwallet/checkwallet.module.scss";
class CheckWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWallet: null,
    };
  }

  componentDidMount = () => {
    axios
      .post(`${process.env.API_URL}/checkwallet`)
      .then((response) => {
        this.setState({
          dataWallet: response.data.data,
        });
      })
      .catch((error) => {
        this.setState({
          dataWallet: error,
        });
      });
  };
  render() {
    const options = {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    var priceAll = 0;
    var succ = 0;
    var unsucc = 0;
    var succA = 0;
    var unsuccA = 0;
    var sizeData = 0;
    var checkPayed = 0;
    if (this.state.dataWallet == null) {
      return <div className={styles.maindiv}>Loading...</div>;
    } else {
      return (
        <div className={styles.maindiv}>
          {this.state.dataWallet.map((index, i) => {
            sizeData = this.state.dataWallet.length - i;
            let date = new Date(this.state.dataWallet[sizeData - 1].time * 1000);
            priceAll += this.state.dataWallet[sizeData - 1].price;
            if (this.state.dataWallet[sizeData - 1].payed == 1) {
              succ += this.state.dataWallet[sizeData - 1].price;
              succA += 1;
              checkPayed = 1;
            } else {
              unsucc += this.state.dataWallet[sizeData - 1].price;
              unsuccA += 1;
              checkPayed = 0;
            }
            return (
              <div
                style={{ backgroundColor: checkPayed ? "rgb(126, 255, 117)" : "rgb(255, 117, 117)" }}
                className={styles.divtoBox}
                key={i}
              >
                <div>{Math.ceil(this.state.dataWallet[sizeData - 1].price)}</div>
                {/* <div>{this.state.dataWallet[sizeData-1].payed}</div> */}
                <div>{date.toLocaleDateString("fa-IR", options)}</div>
              </div>
            );
          })}
          <div className={styles.detailPrice}>
            <div>
              <p>{Math.ceil(priceAll)} درامد</p>
              <p>{Math.ceil(succ)} موفق</p>
              <p>{Math.ceil(unsucc)} ناموفق</p>
            </div>
            <div>
              <p>{this.state.dataWallet.length} تراکنش</p>
              <p>{succA} موفق</p>
              <p>{unsuccA} ناموفق</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CheckWallet;
