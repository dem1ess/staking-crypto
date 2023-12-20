import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute.tsx'
import UserRoleBasedComponent from '../components/RoleProtectedRoute.tsx'
import Account from '../pages/Account.tsx'
import AdminAccount from '../pages/AdminAccount.tsx'
import Auth from '../pages/Auth'
import DepositCreatingPage from '../pages/DepositCreatingPage.tsx'
import Deposits from '../pages/Deposits.tsx'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home'
import Layout from '../pages/Layout'
import { Legal } from '../pages/Legal.tsx'
import NewDeposit from '../pages/NewDepisit.tsx'
import Transactions from '../pages/Transactions.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'legal', element: <Legal /> },
			{
				path: 'account',
				element: (
					<ProtectedRoute>
						<UserRoleBasedComponent
							adminComponent={<AdminAccount />}
							userComponent={<Account />}
						/>
					</ProtectedRoute>
				),
			},
			{
				path: 'account/transactions',
				element: (
					<ProtectedRoute>
						<Transactions />
					</ProtectedRoute>
				),
			},
			{
				path: 'account/new-deposit',
				element: (
					<ProtectedRoute>
						<NewDeposit />
					</ProtectedRoute>
				),
			},
			{
				path: '/start-staking',
				element: (
					<ProtectedRoute>
						<DepositCreatingPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/staking',
				element: (
					<ProtectedRoute>
						<Deposits />
					</ProtectedRoute>
				),
			},
			{ path: 'auth', element: <Auth /> },
		],
	},
])
