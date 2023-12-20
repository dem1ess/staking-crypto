import {features} from "../constants";
import styles, {layout} from "../style";
import Button from "./Button";
import {NavLink} from "react-router-dom";

const FeatureCard = ({icon, title, content, index}: any) => (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
            <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain"/>
        </div>
        <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                {content}
            </p>
        </div>
    </div>
);

const Business = () => (
    <section id="featuress" className={layout.section}>
        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                Зарабатывайте деньги<br className="sm:block hidden"/> легко и безопасно!
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Для этого вы можете воспользоваться нашим AirDrop предложением. За формирование новых блоков в нашей
                системе,
                Вы можете получить дополнительно от 7% до 15% вознаграждения от суммы блока, созданного Вами или Вашими
                партнерами.
            </p>

            <NavLink to="/auth"> <Button styles={"mt-10"} titleText='Начинаем сейчас'/> </NavLink>

        </div>

        <div className={`${layout.sectionImg} flex-col`}>
            {features.map((feature, index) => (
                <FeatureCard key={feature.id} {...feature} index={index}/>
            ))}
        </div>
    </section>
);

export default Business;
