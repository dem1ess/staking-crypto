import {useAppSelector} from '../store/hooks.ts';

export const useAdmin = (): boolean => {
    const userRole = useAppSelector((state) => state.user.isAdmin);
    return userRole;
};