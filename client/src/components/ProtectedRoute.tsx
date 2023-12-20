import {FC} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import Button from "./Button.tsx";
import {Link} from "react-router-dom";

interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({children}) => {
    const isAuth = useAuth()
    return (
        <>
            {isAuth ? children : (
                <div className='min-h-screen flex flex-col items-center bg-gray-gradient justify-start gap-10'>
                    <h1 className='text-4xl font-bold mt-80  text-white text-center'>Вы не авторизованы</h1>
                    <Link
                        to={'/auth'}
                    >
                        <Button titleText="Авторизоватся"/>
                    </Link>
                </div>)}
        </>
    );
};

export default ProtectedRoute;