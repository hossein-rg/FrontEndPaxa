/* eslint-disable react/prop-types */
import React from "react";
import styles from "../../assets/styles/shop/selectionSteps.module.scss";
class SelectPlan extends React.Component {
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
    this.props.check(null);
  };

  render() {
    return (
      <div className={styles.boxBodySelectPlan}>
        <div className={styles.detailSelectPlan}>
          <p>مدت زمان اکانت خود را مشخص کنید؟</p>
        </div>
        <div className={styles.selectplan}>
          <button data-set="0" onClick={this.handleSelect}>
            یک ماهه
          </button>
          <button data-set="1" onClick={this.handleSelect}>
            دو ماهه
          </button>
          <button data-set="2" onClick={this.handleSelect}>
            بدون محدودیت زمانی
          </button>
        </div>
      </div>
    );
  }
}

export default SelectPlan;
