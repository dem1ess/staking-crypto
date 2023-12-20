import {FC} from 'react';
import UserCard from "../components/UserCard.tsx";
import Transactions from "./Transactions.tsx";
import TableWallets from "../components/TableWallets.tsx";

const AdminAccount: FC = () => {
    return (
        <div className=' min-h-screen xl:max-w-[1280px] m-auto'>
            <UserCard/>
            <TableWallets/>
            <Transactions/>
        </div>
    );
};

export default AdminAccount