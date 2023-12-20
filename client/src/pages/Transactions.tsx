import {useEffect, useState} from 'react'
import {instance} from '../api/axios.api.ts'
import Footer from '../components/Footer.tsx'
import {useAdmin} from '../hooks/useAdmin.ts'
import {ITransaction} from '../types/types.ts'

const Transactions = () => {
    const isAdmin = useAdmin()

    const [transactions, setTransactions] = useState<ITransaction[]>([])
    const [transactionStatus, setTransactionStatus] = useState<{ [key: number]: string }>(
        {} // Объект для отслеживания статуса для каждой транзакции
    );

    const fetchTransactions = async () => {
        try {
            const response = await instance.get('/transactions')
            setTransactions(response.data)
            console.log(response.data)
            const updatedTransactionStatus: { [key: number]: string } = {};

            response.data.forEach((transaction: ITransaction) => {
                updatedTransactionStatus[transaction.id] = transaction.type;
            });

            setTransactionStatus(updatedTransactionStatus);
            setTransactions(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error)
        }
    }

    const updateTransactionStatus = async (transactionId: number, type: string) => {
        try {
            // Отправляем запрос на обновление статуса транзакции
            await instance.patch(`/transactions/${transactionId}`, {type: type});
            if (type === 'Успешно') {
                setTransactionStatus((prevStatus) => ({
                    ...prevStatus,
                    [transactionId]: 'Успешно', // Устанавливаем статус в "Успешно" после успешного обновления
                }));
            } else {
                setTransactionStatus((prevStatus) => ({
                    ...prevStatus,
                    [transactionId]: 'Отменено', // Устанавливаем статус в "Отменено" после успешного обновления
                }));
            }
        } catch (error) {
            console.log(error)
        }
    };

    const updateWalletBalance = async (walletId: number, transactionId: number, newBalance: number) => {
        try {
            await instance.patch(`/wallets/update-balance/${walletId}`, {balance: newBalance});

            // После успешного обновления баланса, вызываем функцию для обновления статуса транзакции
            const transactionIdToUpdate = transactionId/* здесь получите ID транзакции, которую нужно обновить */;
            const newTransactionStatus = 'Успешно'; // Замените на фактический статус
            updateTransactionStatus(transactionIdToUpdate, newTransactionStatus);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);
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
                            ID Транзакции
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Дата и время
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white"
                        >
                            Тип
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
                            Статус
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.map((transaction: ITransaction) => (
                        <tr
                            className="bg-black-gradient-2 text-gray-400"
                            key={transaction.id}
                        >
                            {isAdmin ? (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {transaction.id * 12345} (userID: <span>{transaction.wallet.userId}</span>)
                                </td>
                            ) : (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {transaction.id * 12345}
                                </td>
                            )}
                            <td className="whitespace-nowrap px-6 py-4">
                                {transaction.createdAt}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {transaction.wallet.type}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                {transaction.amount}
                            </td>
                            {isAdmin ? (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {transactionStatus[transaction.id] !== "Рассматривается" ? ( // Проверяем наличие статуса для данной транзакции
                                        <span>{transactionStatus[transaction.id]}</span>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    updateWalletBalance(
                                                        transaction.wallet.id,
                                                        transaction.id,
                                                        transaction.amount
                                                    )
                                                }
                                                className="mr-3 rounded bg-green-400 p-2 text-white"
                                            >
                                                Подтвердить
                                            </button>
                                            <button onClick={() => updateTransactionStatus(transaction.id, 'Отменено')}
                                                    className="rounded bg-rose-600 p-2 text-white"
                                            >
                                                Отменить
                                            </button>
                                        </>
                                    )}
                                </td>
                            ) : (
                                <td className="whitespace-nowrap px-6 py-4">
                                    {transaction.type}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    )
}

export default Transactions
