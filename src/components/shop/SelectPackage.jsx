/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../assets/styles/shop/selectionSteps.module.scss";
import axios from "axios";
class SelectPackage extends React.Component {
  constructor() {
    super();
    this.state = {
      packages: null,
    };
  }
  handleSelect = (element) => {
    const selectedElement = element.target.dataset.set;
    const btns = element.target.parentElement.children;
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.remove(`${styles.selectedPlan}`);
    }
    element.target.classList.add(`${styles.selectedPlan}`);
    return this.props.check(selectedElement);
  };

  componentDidMount = () => {
    const sub = async () => {
      try {
        const res = await axios.post(`${process.env.API_URL}/listPack`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
          plan: this.props.id,
        });
        this.setState({
          packages: res.data.data.pack,
        });
      } catch (eror) {
        alert(eror);
      }
    };
    sub();
    this.props.check(null);
  };

  render() {
    if (this.state.packages == null) {
      return (
        <div className={styles.boxBodySelectPackage}>
          <div className={styles.detailSelectPackage}>
            <p>... در حال پردازش</p>
          </div>
        </div>
      );
    } else {
      const dataPackage = this.state.packages;
      return (
        <div className={styles.boxBodySelectPackage}>
          <div className={styles.detailSelectPackage}>
            <p>حجم مورد نظر خودتون رو انتخاب کنید ؟</p>
          </div>
          <div className={styles.selectpackage}>
            {dataPackage.map((index) => {
              return (
                <button data-set={index.id} onClick={this.handleSelect} key={index.id}>
                  {index.title}
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default SelectPackage;
