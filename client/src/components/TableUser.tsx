import { useEffect, useState } from 'react'
import { instance } from '../api/axios.api'
import '../styles/user.css'
import { IWallets } from '../types/types'

const TableUser = () => {
	const [wallet, setWallet] = useState<IWallets[]>([])

	const walletLoader = async () => {
		try {
			const response = await instance.get<IWallets[]>('/wallets')
			return response.data
		} catch (error) {
			console.error('Error loading wallets:', error)
			return []
		}
	}

	useEffect(() => {
		walletLoader().then((wallets) => {
			setWallet(wallets)
			console.log(wallets)
		})
	}, [])

	return (
		<section className="tableUser">
			<div className="userCard__container">
				<div className="tableUser__box">
					<div className="tableUser__wrapper">
						<div className="tableUser__names">
							<div className="tableUser__name tableUser__name-coin">Валюта</div>
							<div className="tableUser__name tableUser__name-balance">
								Баланс
							</div>
							<div className="tableUser__name tableUser__name-equivalent">
								Эквивалент
							</div>
						</div>
						<div className="tableUser__items">
							{wallet.map((walletItem) => (
								<div className="tableUser__item" key={walletItem.id}>
									<div className="tableUser__item-coin">
										<div className="tableUser__item-icon">
											<img
												className="rounded-full"
												src={walletItem.imgURL}
												alt={walletItem.type}
											/>
										</div>
										{walletItem.name} <span>{walletItem.type}</span>
									</div>
									<div className="tableUser__item-balance balance_amount_hide">
										<span className="search_my_balance">
											{walletItem.balance}
										</span>{' '}
										{walletItem.type}
									</div>
									<div className="tableUser__item-equivalent balance_usd_hide">
										{walletItem.balance * walletItem.equivalent} USD
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default TableUser
