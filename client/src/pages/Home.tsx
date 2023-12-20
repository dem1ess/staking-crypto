import {FC} from 'react';
import styles from "../style";
import {Billing, Business, CardDeal, Clients, CTA, Footer, Hero, Stats, Testimonials} from "../components";
import CryptoData from "../components/cryptoData.tsx";

const Home: FC = () => {
    return (
        <div>
            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero/>
                </div>
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Stats/>
                    <Business/>
                    <CryptoData/>
                    <Billing/>
                    <CardDeal/>
                    <Testimonials/>
                    <Clients/>
                    <CTA/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

export default Home;