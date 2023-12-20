import React, {useEffect, useState} from 'react';
import {instance} from "../api/axios.api.ts";
import {IWallets} from "../types/types.ts";
import styles from "../style.ts";
import Footer from "../components/Footer.tsx";
import QRCode from "qrcode.react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {NavLink} from "react-router-dom";

function TransactionForm() {
    const [selectedWalletAddress, setSelectedWalletAddress] = useState('');

    const [selectedType, setSelectedType] = useState<number>();
    const [amount, setAmount] = useState<string>('');
    const [wallets, setWallets] = useState<IWallets[]>([]);
    const [transAccepted, setTransAccepted] = useState<boolean>(false);

    const walletLoader = async (): Promise<IWallets[]> => {
        try {
            const response = await instance.get<IWallets[]>('/wallets');
            return response.data;
        } catch (error) {
            console.error('Error loading wallets:', error);
            return [];
        }
    };

    const handleCopyToClipboard = () => {
    };

    useEffect(() => {
        walletLoader().then((wallets) => {
            setWallets(wallets);
        });

    }, []);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(+e.target.value);

        const selectedWallet = wallets.find((wallet) => wallet.id === +e.target.value);

        if (selectedWallet) {
            // Обновите состояние с адресом выбранного кошелька
            setSelectedWalletAddress(selectedWallet.address);
            // Сбросьте флаг для отображения QR-кода
        }
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Отправка данных на сервер
        try {
            // Найдем объект wallet на основе selectedType
            const selectedWallet = wallets.find((wallet) => wallet.id === selectedType);

            // Проверяем, что selectedWallet существует
            if (selectedWallet) {
                const formData = {
                    amount: parseFloat(amount),
                    type: "Рассматривается",
                    wallet: selectedWallet, // Передаем объект wallet
                };
                console.log('formData:', formData)
                await instance.post('/transactions', formData);

                // Обработка успешной отправки транзакции
                setTransAccepted(true);
            } else {
                console.error('Selected wallet not found');
            }
        } catch (error) {
            // Обработка ошибок
            console.error('Error creating transaction:', error, selectedType);
            console.error('Data', selectedType);
        }
    };

    return (
        <div className={`min-h-screen sm:mx-0 mx-4 bg-primary ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <h1 className="flex-1 font-poppins text-[52px] font-semibold leading-[75px] text-white ss:text-[72px] ss:leading-[100.8px]">
                    <h1 className="text-gradient">Создание транзакции</h1>
                </h1>
                <p className={`${styles.paragraph} max-w-[800px] pt-20`}>
                    Наша команда экспертов управляет узлами для сетей блокчейнов
                    следующего поколения и стремимся поддерживать движение в области
                    децентрализации.
                </p>
                <div className="flex pt-20">

                    {transAccepted ? (<div
                            className='bg-black-gradient h-96 w-full rounded-lg flex flex-col items-center justify-evenly shadow-lg'>
                            <h2 className='text-[36px] font-semibold leading-[75px] text-white ss:text-[44px] ss:leading-[100.8px]'>
                                Спасибо,
                                ожидайте подтвержение транзакции
                            </h2>
                            <NavLink
                                className="py-4 text-xl px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none bg-blue-gradient"
                                to="/account">Вернутся</NavLink>
                        </div>)
                        : (<div
                                className={
                                    'bg-black-gradient py-10 w-full rounded-lg flex sm:flex-row flex-col items-center justify-evenly'
                                }
                            >
                                <div
                                    className="bg-[#B88FDF] rounded-2xl p-14 sm:mb-0 mb-10 flex justify-center items-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="h- mb-4">
                                            <label htmlFor="type" className="block text-lg mb-4 font-medium">
                                                Выбери кошелек:
                                            </label>
                                            <select
                                                id="type"
                                                value={selectedType}
                                                onChange={handleTypeChange}
                                                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                            >
                                                {wallets.map((wallet) => (
                                                    <option key={wallet.id} value={wallet.id}>
                                                        {wallet.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="amount" className=" block text-sm font-medium ">
                                                Введите количество:
                                            </label>
                                            <input
                                                id="amount"
                                                value={amount}
                                                onChange={handleAmountChange}
                                                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-purple-500 text-white mt-4 px-6 py-2 rounded-md transition hover:bg-purple-600"
                                        >
                                            Продолжить
                                        </button>
                                    </form>
                                </div>
                                <div>
                                    <div
                                        className="bg-discount-gradient rounded-2xl p-4 w-full h-full flex justify-center items-center">
                                        {selectedWalletAddress && (
                                            <div className="my-4 flex flex-col items-center">
                                                <p className="text-sm font-medium text-white pb-5">Адрес кошелька:</p>
                                                <div className="flex items-center">
                                                    <QRCode value={selectedWalletAddress}/>
                                                </div>
                                                <p className="text-xl text-white mt-5">
                                                    На этот адрес :
                                                </p>
                                                <p className="text-lg font-semibold text-gradient m-5">
                                                    <CopyToClipboard text={selectedWalletAddress}>
                                                        <p onClick={handleCopyToClipboard} style={{cursor: 'pointer'}}>
                                                            {selectedWalletAddress}
                                                        </p>
                                                    </CopyToClipboard>
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        )}
                </div>
                <Footer/>

            </div>
        </div>

    );
}

export default TransactionForm;
