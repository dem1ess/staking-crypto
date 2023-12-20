import {card} from "../assets";
import styles, {layout} from "../style";
import Button from "./Button.js";
import {NavLink} from "react-router-dom";

const CardDeal = () => (
    <section className={layout.section}>
        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                Все быстро,
                <br className="sm:block hidden"/> прозрачно и легко
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Выводи криптовалюту любым методом которым тебе легко. Инвестируй с
                помощью QR кода. Проверяй все свои активы за любой период времяни.
            </p>

            <NavLink to="/auth">
                <Button titleText={"Начнем сейчас"} styles={`mt-10`}/>
            </NavLink>
        </div>

        <div className={layout.sectionImg}>
            <img src={card} alt="billing" className="w-[100%] h-[100%]"/>
        </div>
    </section>
);

export default CardDeal;
