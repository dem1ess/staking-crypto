import {FC} from 'react';
import UserCard from "../components/UserCard.tsx";
import UserNavigation from "../components/UserNavigation.tsx";
import TableUser from "../components/TableUser.tsx";
import Footer from "../components/Footer.tsx";
import CryptoData from "../components/cryptoData.tsx";

const Account: FC = () => {
    return (
        <div className='xl:max-w-[1280px] m-auto'>
            <UserCard/>
            <UserNavigation/>
            <CryptoData/>
            <TableUser/>
            
            {/*<Stake/>*/}
            <Footer/>
        </div>
    );
};

export default Account;