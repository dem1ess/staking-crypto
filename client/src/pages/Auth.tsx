import React, {FC, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {logo} from '../assets'
import {authLinks, socialMedia} from '../constants'
import {setTokenToLacalStorage} from '../helpers/localstorage.helper.ts'
import {AuthService} from '../services/auth.services.ts'
import {useAppDispatch} from '../store/hooks.ts'
import {login} from '../store/user/userSlice.ts'
import styles from '../style.ts'

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({email, password})
            if (data) {
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            console.log(error)
        }
    }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login({email, password})

            if (data) {
                setTokenToLacalStorage('token', data.token)
                dispatch(login(data))
                navigate('/account')
            }
        } catch (err: any) {
            const error = err.response?.data.message
            console.log(error)
        }
    }
    return (
        <div className={`min-h-screen bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <h1 className="flex-1 font-poppins text-[52px] font-semibold leading-[75px] text-white ss:text-[72px] ss:leading-[100.8px]">
                    <h1 className="text-gradient">Для клиентов компании</h1>{' '}
                </h1>
                <p className={`${styles.paragraph} max-w-[800px] pt-20`}>
                    Наша команда экспертов управляет узлами для сетей блокчейнов
                    следующего поколения и стремимся поддерживать движение в области
                    децентрализации.
                </p>
                <div className="flex pt-20">
                    <div>
                        <div
                            className={`w-96 rounded-lg bg-white p-8 shadow-lg ${
                                isLogin ? 'hidden' : 'block'
                            }`}
                        >
                            <h2 className="mb-4 text-2xl font-bold">Регистрация</h2>
                            <form onSubmit={registrationHandler}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="example@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Пароль
                                    </label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="Ваш пароль"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Подтвердите пароль
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="Повторите пароль"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        type="submit"
                                        className="bg-blue-gradient bg-blue-gradient mb-4 w-full rounded-[10px] py-2 font-poppins text-[18px] font-medium text-primary outline-none"
                                    >
                                        Зарегистрироваться
                                    </button>
                                    <button
                                        className="w-full rounded-none py-2 font-poppins text-[18px] font-medium text-primary outline-none "
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin
                                            ? 'Нету аккаунта? Зарегестрироватся'
                                            : 'Уже есть аккаунт? Войти'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div
                            className={`w-96 rounded-lg bg-white p-8 shadow-lg ${
                                isLogin ? 'block' : 'hidden'
                            }`}
                        >
                            <h2 className="mb-4 text-2xl font-bold">Вход</h2>
                            <form onSubmit={loginHandler}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="loginEmail"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Email
                                    </label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        id="loginEmail"
                                        name="loginEmail"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="example@example.com"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="loginPassword"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Пароль
                                    </label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        id="loginPassword"
                                        name="loginPassword"
                                        className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:outline-none"
                                        placeholder="Ваш пароль"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-gradient bg-blue-gradient mb-4 w-full rounded-[10px] py-2 font-poppins text-[18px] font-medium text-primary outline-none"
                                    >
                                        Войти
                                    </button>
                                    <button
                                        className="w-full rounded-none py-2 font-poppins text-[18px] font-medium text-primary outline-none "
                                        onClick={() => setIsLogin(!isLogin)}
                                    >
                                        {isLogin
                                            ? 'Зарегестрировать аккаунт?'
                                            : 'Уже есть аккаунт? Войти'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div
                        className={
                            'bg-black-gradient ml-10 h-96 w-full rounded-lg p-8 shadow-lg'
                        }
                    >
                        <section
                            className={`${styles.flexCenter} ${styles.paddingY} flex-col`}
                        >
                            <div
                                className={`${styles.flexStart} mb-8 w-full flex-col md:flex-row`}
                            >
                                <div className="mr-10 flex flex-[1] flex-col justify-start">
                                    <img
                                        src={logo}
                                        alt="hoobank"
                                        className="h-[72.14px] w-[266px] object-contain"
                                    />
                                    <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
                                        Все быстро, прозрачно и легко.
                                    </p>
                                </div>

                                <div
                                    className="mt-10 flex w-full flex-[1.5] flex-row flex-wrap justify-between md:mt-0">
                                    {authLinks.map((footerlink) => (
                                        <div
                                            key={footerlink.title}
                                            className={`my-4 flex min-w-[150px] flex-col ss:my-0`}
                                        >
                                            <h4 className="font-poppins text-[18px] font-medium leading-[27px] text-white">
                                                {footerlink.title}
                                            </h4>
                                            <ul className="mt-4 list-none">
                                                {footerlink.links.map((link, index) => (
                                                    <li
                                                        key={link.name}
                                                        className={`cursor-pointer font-poppins text-[16px] font-normal leading-[24px] text-dimWhite hover:text-secondary ${
                                                            index !== footerlink.links.length - 1
                                                                ? 'mb-4'
                                                                : 'mb-0'
                                                        }`}
                                                    >
                                                        {link.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className="flex w-full flex-col items-center justify-between border-t-[1px] border-t-[#3F3E45] pt-6 md:flex-row">
                                <p className="text-center font-poppins text-[18px] font-normal leading-[27px] text-white">
                                    Авторское право (C) 2023 ProfitStake. Все права защищены.
                                </p>

                                <div className="mt-6 flex flex-row md:mt-0">
                                    {socialMedia.map((social, index) => (
                                        <img
                                            key={social.id}
                                            src={social.icon}
                                            alt={social.id}
                                            className={`h-[21px] w-[21px] cursor-pointer object-contain ${
                                                index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
                                            }`}
                                            onClick={() => window.open(social.link)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
