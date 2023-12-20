import styles from "../style";
import Button from "./Button.js";
import {NavLink} from "react-router-dom";

const CTA = () => (
    <section
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
    >
        <div className="flex-1 flex flex-col">
            <h2 className={styles.heading2}>Давайте попробуем наш сервис сейчас!</h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                У блокчейнов Proof-of-Stake есть валидаторы, которые создают, предлагают
                или голосуют за блоки, которые будут добавлены в цепь.
            </p>
        </div>

        <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>

            <NavLink to="/auth"> <Button titleText='Начинаем сейчас'/> </NavLink>
        </div>
    </section>
);

export default CTA;
