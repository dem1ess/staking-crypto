import React, {useEffect, useState} from 'react';
import {instance} from '../api/axios.api.ts';
import {IWallets} from '../types/types.ts';
import {NavLink} from 'react-router-dom';
// @ts-ignore
import Select, {OptionTypeBase} from 'react-select';
import Footer from "../components/Footer.tsx";

interface IWalletOption {
    value: number;
    label: string;
    image: string;
}


function DepositCreationPage() {
    const [selectedWallet, setSelectedWallet] = useState<IWallets>();
    const [amount, setAmount] = useState<number>(0);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [wallets, setWallets] = useState<IWallets[]>([]);
    const [depositCreated, setDepositCreated] = useState<boolean>(false);


    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#1a202c', // dark background
            borderColor: '#4a5568', // dark border
            color: 'white',
        }),
        option: (provided: any) => ({
            ...provided,
            backgroundColor: '#2d3748',
            color: 'white',
            '&:hover': {
                backgroundColor: '#4a5568',
            }
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
        }),
    };


    const walletLoader = async (): Promise<IWallets[]> => {
        try {
            const response = await instance.get<IWallets[]>('/wallets');
            return response.data;
        } catch (error) {
            console.error('Error loading wallets:', error);
            return [];
        }
    };

    useEffect(() => {
        walletLoader().then((wallets) => {
            setWallets(wallets);
        });
    }, []);

    const handleWalletChange = (option: OptionTypeBase) => {
        const selectedWallet = wallets.find((wallet) => wallet.id === option.value);
        console.log(selectedWallet)
        setSelectedWallet(selectedWallet);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setAmount(+e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const dateDifference = Math.floor(
        (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (selectedWallet) {
                const depositAmount = amount;
                if (depositAmount <= selectedWallet.balance) {
                    const createDepositDto = {
                        amount: depositAmount,
                        interestRate: 0.016,
                        startDate: new Date().toISOString().split('T')[0],
                        endDate: endDate,
                        wallet: selectedWallet,
                    };
                    console.log('createDepositDto:', createDepositDto);
                    await instance.post(`/deposits`, createDepositDto);
                    setDepositCreated(true);
                    updateWalletBalance(selectedWallet.id, selectedWallet.balance - depositAmount);
                } else {
                    console.log('Недостаточно средств')
                }
            } else {
                console.error('Selected wallet not found');
            }
        } catch (error) {
            console.error('Error creating deposit:', error);
        }
    };

    const updateWalletBalance = async (walletId: number, newBalance: number) => {
        try {
            await instance.patch(`/wallets/update-balance/${walletId}`, {balance: newBalance});
        } catch (error) {
        }
    };

    const precent = (amount * 0.016) * dateDifference
    const options: IWalletOption[] = wallets.map((wallet) => ({
        value: wallet.id,
        label: `${wallet.name} - ${wallet.balance}`,
        image: wallet.imgURL,
    }));
    const selectedOption = options.find((option) => option.value === selectedWallet?.id);

    return (
        <div className='xl:max-w-[1280px] m-auto min-h-screen bg-primary'>
            <div className={`box-width`}>
                <div className="sm:w-2/3 w-full">
                    <h2 className={``}>
                        <h1 className={`flex-1 font-poppins text-[52px] font-semibold leading-[75px] text-white ss:text-[72px] ss:leading-[100.8px] text-gradient`}>Важная
                            информация</h1>
                        <h2 className={` font-semibold text-white `}>
                            Вы можете сделать ставку на любой доступный вам инвестиционный план. После внесения монет на
                            любой из планов, прибыль будет автоматически переведена на ваш баланс по истечении срока
                            действия выбранного плана.
                            Прибыль рассчитывается в режиме реального времени, для этого нужно обновить страницу.
                            Если вы вернете средства обратно до инвестиционного плана, ваш заработок будет потерян
                            Вы можете использовать BTC, ETH и LTC, которые есть в вашем портфеле.
                        </h2>
                    </h2>
                </div>
                <div className={`flex pt-20`}>
                    {depositCreated ? (
                        <div
                            className='bg-black-gradient h-96 w-full rounded-lg flex flex-col items-center justify-evenly shadow-lg'>
                            <h2 className='text-[36px] font-semibold leading-[75px] text-white ss:text-[44px] ss:leading-[100.8px]'>
                                Депозит успешно создан
                            </h2>
                            <NavLink
                                className="py-4 text-xl px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none bg-blue-gradient"
                                to="/account">Вернуться</NavLink>
                        </div>
                    ) : (
                        <div
                            className='bg-black-gradient sm:mx-0 mx-4 p-6 w-full rounded-lg flex sm:flex-row flex-col items-center justify-evenly shadow-lg'>
                            <div
                                className='bg-[#B88FDF] rounded-2xl sm:w-2/4 w-full flex justify-center items-center p-12 mx-12'>
                                <form onSubmit={handleSubmit}>
                                    <div
                                        className='bg-purple-500 mb-4 w-full rounded-lg pl-4 shadow-2xl flex flex-col justify-center p-2'>
                                        <p className='text-xl'>Ставка</p>
                                        <p className='text-lg font-bold'>1.6% в день</p>
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor='wallet' className='block text-lg mb-2 font-medium'>
                                            Выберите кошелек:
                                        </label>
                                        <Select
                                            value={selectedOption}
                                            onChange={handleWalletChange}
                                            options={options}
                                            styles={customStyles}
                                            formatOptionLabel={({label, image}) => (
                                                <div>
                                                    <img src={image} alt={label} className='w-5 h-5 inline-block mr-2'/>
                                                    <span>{label}</span>
                                                </div>
                                            )}
                                        />
                                        <p className='mt-2 text-lg font-medium'>{dateDifference > 1 && selectedWallet ? `Будет начислено  ${precent.toFixed(2)} ${selectedWallet?.type} ` : ''}</p>

                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='amount' className='block text-lg font-medium'>
                                            Введите сумму:
                                        </label>
                                        <input
                                            id='amount'
                                            value={amount}
                                            onChange={handleAmountChange}
                                            className='mt-1 block w-full bg-gray-800 border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200'
                                            required
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='date' className='block text-lg font-medium'>
                                            Выберите дату окончания:
                                        </label>
                                        <input
                                            id='date'
                                            type='date'
                                            value={endDate}
                                            onChange={handleDateChange}
                                            className='mt-1 block w-full bg-gray-800 border-gray-700 text-white rounded-md py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-200'
                                            required
                                        />
                                    </div>
                                    <p className='text-lg font-semibold'>{dateDifference > 1 ? `Стейкинг будет длится ${dateDifference} дней` : ''}</p>
                                    <button
                                        type='submit'
                                        className='bg-purple-500 shadow-2xl font-semibold text-xl w-full mt-4 px-6 py-2 rounded-md transition hover:bg-purple-600'
                                    >
                                        Начать стейкинг
                                    </button>
                                </form>
                            </div>
                            <div
                                className='bg-[#B88FDF] rounded-2xl h-full w-full flex sm:flex-row flex-col  p-12 sm:mx-0 mx-6 sm:mr-12 mr-0 '>
                                <div className='mx-2 h-full'>
                                    <div><h2 className="text-2xl font-bold">Что такое Proof of Stake (PoS)?</h2></div>
                                    <div className='flex h-full sm:mt-0 mt-14 '>
                                        <p className='font-semibold text-xl'>Если вы знаете, как работает биткоин,
                                            вероятно,
                                            вы знакомы с Proof of Work
                                            (доказательством выполнения работы). Это механизм, который позволяет
                                            собирать
                                            транзакции в блоки и соединять их вместе для создания блокчейна. Майнеры
                                            соревнуются в решении сложной математической головоломки за право добавить
                                            следующий блок в блокчейн.</p>
                                    </div>
                                </div>
                                <div className='mx-2 h-full'>
                                    <h2 className="text-2xl font-bold ">Как рассчитывается награда за
                                        стейкинг?</h2>
                                    <div className='flex h-96 sm:mt-6 mt-14 items-end'>
                                        <p className='font-semibold text-xl'>На этот вопрос вы не получите четкий и
                                            короткий
                                            ответ, по той простой
                                            причине,
                                            что каждая блокчейн-сеть может использовать свой способ расчета
                                            вознаграждений
                                            за стейкинг.
                                            Некоторые из блокчейнов корректируют награду от блока к блоку, принимая во
                                            внимание множество различных факторов.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DepositCreationPage;
