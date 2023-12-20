import React from 'react'

interface CryptoInfoProps {
	cryptoData: {
		name: string
		symbol: string
		iconUrl: string
		price: number
		marketCap: string
		'24hVolume': string
		rank: number
		coinrankingUrl: string
	}
}

const CryptoInfo: React.FC<CryptoInfoProps> = ({ cryptoData }) => {
	return (
		<div className="bg-black-gradient m-6 rounded-md p-10 text-sky-100 shadow-md">
			<h2 className="text-xl font-semibold">{cryptoData.name}</h2>
			<div className="mt-2 flex items-center">
				<img
					src={cryptoData.iconUrl}
					alt={cryptoData.name}
					className="mr-2 h-8 w-8"
				/>
				<p className="text-sm text-gray-500">{cryptoData.symbol}</p>
			</div>
			<p className="mt-2 text-sm text-gray-500">Цена: ${cryptoData.price}</p>
		</div>
	)
}

export default CryptoInfo
