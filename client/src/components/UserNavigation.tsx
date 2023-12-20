import { NavLink } from 'react-router-dom'
import '../styles/user.css'

const UserNavigation = () => {
	return (
		<section className="userNavigation">
			<div className="userCard__container">
				<div className="userNavigation__box">
					<div className="userNavigation__search-box"></div>

					<div className="userNavigation__tabBtn-box">
						<NavLink to="new-deposit">
							<div className="userNavigation__tabBtn">Депозит</div>
						</NavLink>
						<NavLink to="/start-staking">
							<div className="userNavigation__tabBtn">Стейкинг</div>
						</NavLink>
						<NavLink to="/staking">
							<div className="userNavigation__tabBtn">Активные стейкинги</div>
						</NavLink>
						<NavLink to="transactions">
							<div className="userNavigation__tabBtn">Транзакции</div>
						</NavLink>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UserNavigation
