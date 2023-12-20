import {FC, useState} from 'react'

import {useSelector} from 'react-redux'
import {Link, NavLink, useLocation} from 'react-router-dom'
import {logo} from '../assets'
import userImg from '../assets/fi-ss-user.png'
import {loginLink, navLinks} from '../constants'
import {useAuth} from '../hooks/useAuth.ts'
import Button from './Button.tsx'

const Navbar: FC = () => {
    const [active, setActive] = useState('Home')
    // const [toggle, setToggle] = useState(false)
    const isAuth = useAuth()
    const location = useLocation()
    const currentPath = location.pathname
    // @ts-ignore
    const user = useSelector(state => state.user.user)

    let dynamicNavLinks = [...navLinks] // Создайте копию изначальных navLinks
    if (currentPath === '/account') {
        // Измените navLinks, если вы находитесь на странице /account
        dynamicNavLinks = [
            {id: 'account', title: 'Аккаунт'},
            {id: 'deposit', title: 'Депозит'},
            {id: 'staking', title: 'Стейкинг'},
            {id: 'support', title: 'Поддержка'},
        ]
    }

    return (
        <nav className='navbar flex w-full items-center justify-between py-6'>
            <Link to={'/'}>
                <img src={logo} alt='hoobank' className='h-[32px] w-[124px]'/>
            </Link>

            <ul className='flex-1 list-none items-center justify-start ss:flex hidden'>
                {dynamicNavLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`cursor-pointer font-poppins text-[16px] font-normal ${
                            active === nav.title ? 'text-white' : 'text-dimWhite'
                        } ${index === dynamicNavLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
                        onClick={() => setActive(nav.title)}
                    >
                        {isAuth ? (
                            <a href={`/${nav.id}`}>{nav.title}</a>
                        ) : (
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        )}
                    </li>
                ))}
            </ul>

            {isAuth ? (
                <NavLink to={'/account'} className='text--italic text-blue-400'>
                    <div className='flex items-center justify-center'>
                        <span>{user.email}</span>
                        <img
                            className='ml-2 h-[16px] w-[16px] object-contain'
                            src={userImg}
                            alt='userImg'
                        />
                    </div>
                </NavLink>
            ) : (
                <NavLink to={`/${loginLink[0].id}`}>
                    <Button titleText={loginLink[0].title}/>
                </NavLink>
            )}

            {/*<div className='flex flex-1 items-center justify-end sm:hidden'>*/}
            {/*    <img*/}
            {/*        src={toggle ? close : menu}*/}
            {/*        alt='menu'*/}
            {/*        className='h-[28px] w-[28px] object-contain'*/}
            {/*        onClick={() => setToggle(!toggle)}*/}
            {/*    />*/}

            {/* <div
className={`${
    !toggle ? 'hidden' : 'flex'
} bg-black-gradient sidebar absolute right-0 top-20 mx-4 my-2 min-w-[140px] rounded-xl p-6`}
>
<ul className='flex flex-1 list-none flex-col z-50 items-start justify-end'>
    {dynamicNavLinks.map((nav, index) => (
            <li
                key={nav.id}
                className={`cursor-pointer font-poppins text-[16px] font-medium ${
                    active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === dynamicNavLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
            >
                <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
        ))}
</ul>
</div>  */}
            {/*</div>*/}
        </nav>
    )
}

export default Navbar

