import styles from "../../assets/styles/shop/handlepanel.module.scss";
import logohead from "../../assets/panel/logofuture.png";
function HandlePanel() {
  return (
    <div className={styles.maincontainer}>
      <div className={styles.logo}>
        <img src={logohead} alt="" />
        <p>AXA</p>
      </div>
      <p>برای خرید پنل و همکاری با تیم پاکسا لازمه که ویژگی های پنل ما رو بدونید</p>
      <ol>
        <li>
          هرمقدار حجمی که از ما بخرید , محدودیت زمانی و محدودیت تعداد کانفیگ ندارد و تاریخ انقضای آن وقتی است که تمام حجمی که خریدید تا
          آخرین گیگ به اتمام برسد
        </li>
        <li>پنل ها به صورت اختصاصی توسط تیم پاکسا ایجاد شده اند و انعطاف پذیری جذابی برای شما دارد</li>
        <li>لوکیشن سرویس های ما هلند میباشد و کانفیگ ها به صورت تانل میباشد</li>
      </ol>
      <div className={styles.option}>
        <h4>آپشن های اضافی در صورت نیاز شما به آنها</h4>
        <h5>ارائه پنل اختصاصی برای مشتریان خودتان که شامل : </h5>
        <p>
          سایت اختصاصی باعث برند شدن خودتان و اعتماد مشتری به شماست<span>سایت اختصاصی : </span>
        </p>
        <p>
          درصورت هرقطع شدن احتمالی و موقت توسط دیتاسنتر ایران , لینک های پشتیبانی روی پنل هرمشتری فعال خواهد شد<span>پنل مخصوص : </span>
        </p>
      </div>
      <div className={styles.boxSold}>
        <div>
          <h4>پنل 1</h4>
          <p>500 گیگ حجم + 100 گیگ هدیه</p>
          <p>هر گیگ 1500 تومان</p>
          <button>750,000 هزار تومان</button>
        </div>
        <div>
          <h4>پنل 2</h4>
          <p>1000 گیگ حجم + 300 گیگ هدیه</p>
          <p>هر گیگ 1500 تومان</p>
          <button>1,500,000 هزار تومان</button>
        </div>
        <div>
          <h4>پنل 3</h4>
          <p>2000 گیگ حجم + 500 گیگ هدیه</p>
          <p>هر گیگ 1400 تومان</p>
          <button>2,600,000 هزار تومان</button>
        </div>
      </div>
    </div>
  );
}

export default HandlePanel;
