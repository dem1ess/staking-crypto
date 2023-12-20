import Axios from 'axios'
import {useEffect, useState} from 'react'
import {ICryptoData, ICryptoInfo} from "../types/types.ts";
import CryptoInfo from "./CryptoInfo.tsx";

function CryptoData() {
    const [cryptoData, setCryptoData] = useState<ICryptoData>([])

    useEffect(() => {
        // Функция для загрузки данных из API
        const fetchData = async () => {
            try {
                const response = await Axios.get(
                    'https://coinranking1.p.rapidapi.com/coins',
                    {
                        params: {
                            referenceCurrencyUuid: 'yhjMzLPhuIDl',
                            timePeriod: '24h',
                            'tiers[0]': '1',
                            orderBy: 'marketCap',
                            orderDirection: 'desc',
                            limit: '50',
                            offset: '0',
                        },
                        headers: {
                            'X-RapidAPI-Key':
                                '333e0aba1fmsh2c7f4778cf47a34p1f601fjsn28c552d8c06c',
                            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
                        },
                    }
                )

                // Фильтрация данных для вывода только нужных криптовалют
                const filteredData = response.data.data.coins.filter((crypto: ICryptoInfo) =>
                    [
                        'Bitcoin',
                        'Ethereum',
                        'Tether USD',
                        'Litecoin',
                        'XRP',
                        'Cardano',
                        'Polkadot',
                        'Stellar',
                        'Chainlink',
                    ].includes(crypto.name)
                )
                setCryptoData(filteredData)
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="container mx-auto flex flex-wrap justify-center">
            {cryptoData.map((crypto, index) => (
                <CryptoInfo
                    key={index}
                    cryptoData={{
                        name: crypto.name,
                        symbol: crypto.symbol,
                        iconUrl: crypto.iconUrl,
                        price: Math.round(crypto.price * 100) / 100,
                        marketCap: crypto.marketCap,
                        '24hVolume': crypto['24hVolume'],
                        rank: crypto.rank,
                        coinrankingUrl: crypto.coinrankingUrl,
                    }}
                />
            ))}
        </div>
    )
}

export default CryptoData
