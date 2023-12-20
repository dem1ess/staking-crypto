import {FC} from 'react';
import {Navbar} from "../components";
import styles from "../style.ts";
import {Outlet} from "react-router-dom";


const Layout: FC = () => {

    return (
        <div className="bg-primary w-full overflow-hidden">
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar/>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default Layout;