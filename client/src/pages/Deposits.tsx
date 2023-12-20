import {useEffect, useState} from 'react';
import {instance} from '../api/axios.api.ts';
import {IDeposit} from '../types/types.ts'; // Замените на ваш тип депозитов
import {useAdmin} from '../hooks/useAdmin.ts';
import Footer from "../components/Footer.tsx";

const Deposits = () => {
    const isAdmin = useAdmin();

    // Замените transactions на deposits
    const [deposits, setDeposits] = useState<IDeposit[]>([]);

    const fetchDeposits = async () => {
        try {
            const response = await instance.get('/deposits'); // Замените '/transactions' на '/deposits'
            setDeposits(response.data);
        } catch (error) {
            console.error('Error fetching deposits:', error);
        }
    };

    useEffect(() => {
        console.log()
        fetchDeposits();
    }, []);

    // Измените вывод таблицы в соответствии с вашей структурой депозитов
    return (
        <div className="m-auto mt-20 bg-primary xl:max-w-[1280px]">
            <div className='min-h-screen'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-black-gradient">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            ID Стейкинга
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Дата начала
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Дата окончания
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Количество
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Количество начислений
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {deposits.map((deposit: IDeposit) => (
                        <tr
                            className="bg-black-gradient-2 text-gray-400"
                            key={deposit.id}
                        >
                            {isAdmin ? (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {deposit.id * 12345} (userID: <span>{deposit.user.id}</span>)
                                </td>
                            ) : (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {deposit.id * 12345}
                                </td>
                            )}
                            <td className="whitespace-nowrap px-6 py-4">
                                {deposit.startDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {deposit.endDate}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {deposit.amount}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {deposit.amount * deposit.interestRate}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    )
}

export default Deposits;