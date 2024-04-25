import React from "react";
import SelectPlan from "./SelectPlan";
import SelectPackage from "./SelectPackage";
import SelectTerm from "./SelectTerm";
import ShowResultPackage from "./ShowResultPackage";
import styles from "../../assets/styles/shop/selectionSteps.module.scss";
import logo from "../../assets/images/shop/mainlog.png";
import arrowIcon from "../../assets/images/shop/arrow.svg";
import axios from "axios";
class HandleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.btnBack = React.createRef();
    this.btnNext = React.createRef();
    this.stepSelector = React.createRef();
    this.pointer1 = React.createRef();
    this.pointer2 = React.createRef();
    this.pointer3 = React.createRef();
    this.pointer4 = React.createRef();
    this.state = {
      whereLocate: 1,
      selectPlan: null,
      selectPackage: null,
      option1: false,
      option2: 0,
      option3: "",
      dataFromMrswap: null,
    };
  }

  handleSelectPlan = (data) => {
    this.setState({
      selectPlan: data,
    });
  };

  handleSelectPackage = (data) => {
    this.setState({
      selectPackage: data,
    });
  };



  handleSelectTerm = (op1, op2, op3) => {
    this.setState({
      option1: op1,
      option2: op2,
      option3: op3,
    });
  };

  showStatusbarNext = () => {
    const loc = this.state.whereLocate;
    const targetElement = this.stepSelector.current.children[loc - 1];
    // show top statusbar
    targetElement.classList.add(`${styles.stepin}`);
    targetElement.classList.remove(`${styles.stepout}`);
  };

  showStatusbarBack = () => {
    const loc = this.state.whereLocate;
    const targetElement = this.stepSelector.current.children[loc];
    targetElement.classList.add(`${styles.stepout}`);
    targetElement.classList.remove(`${styles.stepin}`);
  };

  render() {
    const { whereLocate, selectPlan, selectPackage } = this.state;

    const clickWherePage = (e) => {
      const btn = e.target.dataset.click;
      if (btn == "next") {
        if (whereLocate > 3) {
          window.location.replace(this.state.dataFromMrswap.createdLink);
          return;
        } else {
          // logic select plan
          if (whereLocate == 1) {
            if (selectPlan == null) {
              return;
            }
          } else if (whereLocate == 2) {
            if (selectPackage == null) {
              return;
            }
          } else if (whereLocate == 3) {
            this.setState({
              dataFromMrswap: null,
            });
            this.btnNext.current.innerHTML = `پرداخت <img src=${arrowIcon} />`;
            const sub = async () => {
              try {
                const res = await axios.post(`${process.env.API_URL}/buy`, {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  },
                  plan: this.state.selectPlan,
                  packs: this.state.selectPackage,
                  op1: this.state.option1,
                  op2: this.state.option2,
                  op3: this.state.option3,
                });
                this.setState({
                  dataFromMrswap: res.data,
                });
              } catch (eror) {
                alert(eror);
              }
            };
            sub();
          }
          this.btnBack.current.style.display = "flex";
          this.setState(
            (prevState) => ({
              whereLocate: prevState.whereLocate + 1,
            }),
            () => this.showStatusbarNext()
          );
        }
      } else if (btn == "back") {
        this.btnNext.current.innerHTML = `مرحله بعدی <img src=${arrowIcon} />`;
        if (whereLocate == 2) {
          this.btnBack.current.style.display = "none";
          this.setState(
            (prevState) => ({
              whereLocate: prevState.whereLocate - 1,
            }),
            () => this.showStatusbarBack()
          );
          return;
        }
        this.setState(
          (prevState) => ({
            whereLocate: prevState.whereLocate - 1,
          }),
          () => this.showStatusbarBack()
        );
      }
    };

    return (
      <div className={styles.bodySelection}>
        <img src={logo} alt="فروش vpn" />
        <a href="https://telegram.me/tocowo" className={styles.poshtibaniTel}>
          پشتیبانی تلگرام
        </a>
        <div className={styles.stepSelector} ref={this.stepSelector}>
          <div ref={this.pointer1} className={styles.step1}>
            <p>1</p>
          </div>
          <div ref={this.pointer2} className={styles.step2}>
            <p>2</p>
          </div>
          <div ref={this.pointer3} className={styles.step3}>
            <p>3</p>
          </div>
          <div ref={this.pointer4} className={styles.step4}>
            <p>4</p>
          </div>
        </div>
        <div>
          {whereLocate == 1 ? <SelectPlan check={this.handleSelectPlan} /> : <></>}
          {whereLocate == 2 ? <SelectPackage check={this.handleSelectPackage} id={selectPlan} /> : <></>}
          {whereLocate == 3 ? <SelectTerm check={this.handleSelectTerm} /> : <></>}
          {whereLocate > 3 ? <ShowResultPackage data={this.state.dataFromMrswap} /> : <></>}
          <div className={styles.buttons}>
            <button ref={this.btnNext} data-click="next" onClick={clickWherePage} className={styles.nextButton}>
              مرحله بعدی
              <img src={arrowIcon} />
            </button>
            <button style={{ display: "none" }} ref={this.btnBack} data-click="back" onClick={clickWherePage} className={styles.backButton}>
              مرحله قبلی
              <img src={arrowIcon} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default HandleSelection;
