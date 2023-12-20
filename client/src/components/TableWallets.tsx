import {FC, useEffect, useState} from 'react';
import {IAddress,} from "../types/types.ts";
import {instance} from "../api/axios.api.ts";

const TableWallets: FC = () => {
    const [address, setAddress] = useState<IAddress[]>([])
    const [addressAdd, setAddressAdd] = useState<string>('')


    const walletLoader = async () => {
        try {
            const walletAddress = await instance.get<IAddress[]>('/address-wallet')
            return walletAddress.data
        } catch (error) {
            console.error('Error loading wallets:', error)
            return []
        }
    }

    const updateAddress = async (id: number, newAddress: string) => {
        try {
            await instance.patch(`/address-wallet/${id}`, {address: newAddress});
            const updatedAddress = address.map((addressItem) =>
                addressItem.id === id ? {...addressItem, address: newAddress} : addressItem
            );
            setAddress(updatedAddress);
        } catch (error) {
        }
    };


    useEffect(() => {
        walletLoader().then(address => {
            setAddress(address)
            console.log(address)
        })

    }, [])


    return (
        <div className='xl:max-w-[1280px] m-auto bg-primary mt-20'>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-black-gradient">
                <tr>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Название
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Адрес
                    </th>
                    <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                        Действие
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {address.map((addressItem) => (
                    <tr className='bg-black-gradient-2 text-gray-400' key={addressItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{addressItem.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <input
                                type="text"
                                className="border rounded px-2 py-1"
                                placeholder={addressItem.address}
                                onChange={(e) => {
                                    setAddressAdd(e.target.value);
                                }}
                            />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                onClick={() => {
                                    updateAddress(addressItem.id, addressAdd); // Вызывайте функцию обновления при клике
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Обновить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default TableWallets;