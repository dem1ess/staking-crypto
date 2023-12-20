import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import avatar from '../assets/avatar.svg'
import {removeTokenFromLocalStorage} from '../helpers/localstorage.helper.ts'
import {useAppDispatch} from '../store/hooks.ts'
import {logout} from '../store/user/userSlice.ts'
import '../styles/user.css'

const UserCard = () => {
    // @ts-ignore
    const user = useSelector((state) => state.user.user)
    const dispatch = useAppDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
    }

    return (
        <section className="userCard pt-0 sm:mt-28">
            <div className="userCard__container">
                <div className="userCard__box">
                    <div className="userCard__item-left">
                        <div className="userCard__user-data">
                            <div className="userCard__img-box">
                                <img src={avatar} alt="avatar"/>
                            </div>

                            <div className="userCard__user-data-box">
                                <div className="userCard__user-name">id: {user.id * 12332}</div>
                                <div className="userCard__user-email">{user.email}</div>
                                {user.role === 'admin' ? (
                                    <div className="userCard__user-email">{user.role}</div>
                                ) : null}
                                <Link to={'/'}>
                                    <button onClick={logoutHandler} className="userCard__user-id">
                                        <span className="text-rose-700">Выйти</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="userCard__balance">
                            <div className="userCard__balance-title">Баланс</div>
                            <div className="userCard__balance-count">
                                0 <span>USD</span>
                            </div>
                        </div>
                    </div>

                    <div className="userCard__item-right">
                        <div className="userCard__promo-title">
                            Реферальный код <span className="opacity-50">(Скоро)</span>
                        </div>
                        <form>
                            <label>
                                <input
                                    id="promocode"
                                    className="userCard__promo-input unset-global-style"
                                    type="text"
                                    placeholder="234AJKSHD7"
                                    spellCheck="false"
                                    data-ms-editor="true"
                                />
                            </label>
                            <button
                                style={{opacity: '0.5', cursor: 'default'}}
                                className="userCard__promo-btn"
                            >
                                Копировать
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserCard
