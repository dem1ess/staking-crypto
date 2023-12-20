import {
	binance,
	coinbase,
	dropbox,
	facebook,
	instagram,
	linkedin,
	people01,
	people02,
	people03,
	send,
	shield,
	star,
	twitter,
} from '../assets'

export const dynamicWallets = [
	{
		id: 33,
		name: 'Bitcoin',
		balance: 0,
	},
	{
		id: 34,
		name: 'Ethereum',
		balance: 0,
	},
	{
		id: 35,
		name: 'Tether',
		balance: 0,
	},
	{
		id: 36,
		name: 'Litecoin',
		balance: 0,
	},
	{
		id: 37,
		name: 'Ripple',
		balance: 0,
	},
	{
		id: 38,
		name: 'Cardano',
		balance: 0,
	},
	{
		id: 39,
		name: 'Polkadot',
		balance: 0,
	},
	{
		id: 40,
		name: 'Stellar',
		balance: 0,
	},
	{
		id: 41,
		name: 'Chainlink',
		balance: 0,
	},
]

export const navLinks = [
	{
		id: 'home',
		title: 'Стейкинг',
	},
	{
		id: 'featuress',
		title: 'Как это работает',
	},
	{
		id: 'product',
		title: 'Контакты',
	},
	{
		id: 'clients',
		title: 'Отзывы',
	},
]

export const loginLink = [
	{
		id: 'auth',
		title: 'Авторизация',
	},
	{
		id: '/',
		title: 'Выйти',
	},
]

export const features = [
	{
		id: 'feature-1',
		icon: star,
		title: 'Преданный',
		content:
			'Мы обладаем богатым опытом в крипто-пространстве. Наш основатель является соучредителем одного из крупнейших майнинг-пулов в мире. Мы хотим сделать аналогичный вклад в развитие Proof-of-Stake блокчейнов.',
	},
	{
		id: 'feature-2',
		icon: shield,
		title: '100% Безопасный',
		content:
			'Гарантированные выплаты, один из примеров - Profit Stake. Пользователь защищён от мошенничества, не только смарт контрактами, но и авторитетом самой платформы.',
	},
	{
		id: 'feature-3',
		icon: send,
		title: 'Распределенный',
		content:
			'Не только узлы нашего валидатора распределены по всему миру, но и наша команда! Это гарантирует бесперебойную работу узлов валидатора 24 часа в сутки. Мы можем отслеживать любые возникающие проблемы и оперативно реагировать на них. ',
	},
]

export const feedback = [
	{
		id: 'feedback-1',
		content:
			'Большая благодарность поддержке которая всегда на связи! Работаем стабильно и делаем профит.',
		name: 'Яна Залуцкая',
		title: '7 месяцев',
		img: people01,
	},
	{
		id: 'feedback-2',
		content:
			'Спасибо за такой инструмент который работает как часы, все предельно просто и понятно.',
		name: 'Иван Кузнецов',
		title: '3 месяца',
		img: people02,
	},
	{
		id: 'feedback-3',
		content:
			'Самый удобный и простой валидатор с которым работал, поддержка топ.',
		name: 'Александр Антонов',
		title: '11 месяцев',
		img: people03,
	},
]

export const stats = [
	{
		id: 'stats-1',
		title: 'Активных Пользователей',
		value: '1800+',
	},
	{
		id: 'stats-2',
		title: 'Доверяных компаний',
		value: '130+',
	},
	{
		id: 'stats-3',
		title: 'Транзакций',
		value: '$30M+',
	},
]

export const footerLinks = [
	{
		title: 'Полезные ссылки',
		links: [
			{
				name: 'Контент',
				link: 'https://www.hoobank.com/content/',
			},
			{
				name: 'Как это работает',
				link: 'https://www.hoobank.com/how-it-works/',
			},
			{
				name: 'Исследовать',
				link: 'https://www.hoobank.com/explore/',
			},
			{
				name: 'Условия и услуги',
				link: 'https://www.hoobank.com/terms-and-services/',
			},
		],
	},
	{
		title: 'Сообщество',
		links: [
			{
				name: 'Справочный центр',
				link: 'https://www.hoobank.com/help-center/',
			},
			{
				name: 'Партнеры',
				link: 'https://www.hoobank.com/partners/',
			},
			{
				name: 'Предложения',
				link: 'https://www.hoobank.com/suggestions/',
			},
			{
				name: 'Блог',
				link: 'https://www.hoobank.com/blog/',
			},
		],
	},
	{
		title: 'Партнеры',
		links: [
			{
				name: 'Наши партнеры',
				link: 'https://www.hoobank.com/our-partner/',
			},
			{
				name: 'Стать партнером',
				link: 'https://www.hoobank.com/become-a-partner/',
			},
		],
	},
]
export const authLinks = [
	{
		title: 'Полезные ссылки',
		links: [
			{
				name: 'Контент',
				link: 'https://www.hoobank.com/content/',
			},
			{
				name: 'Как это работает',
				link: 'https://www.hoobank.com/how-it-works/',
			},
			{
				name: 'Исследовать',
				link: 'https://www.hoobank.com/explore/',
			},
			{
				name: 'Условия и услуги',
				link: 'https://www.hoobank.com/terms-and-services/',
			},
		],
	},
	{
		title: 'Сообщество',
		links: [
			{
				name: 'Справочный центр',
				link: 'https://www.hoobank.com/help-center/',
			},
			{
				name: 'Юридические вопросы и конфиденциальность',
				link: '/legal',
			},
			{
				name: 'Предложения',
				link: 'https://www.hoobank.com/suggestions/',
			},
			{
				name: 'Блог',
				link: 'https://www.hoobank.com/blog/',
			},
		],
	},
]

export const socialMedia = [
	{
		id: 'social-media-1',
		icon: instagram,
		link: 'https://www.instagram.com/',
	},
	{
		id: 'social-media-2',
		icon: facebook,
		link: 'https://www.facebook.com/',
	},
	{
		id: 'social-media-3',
		icon: twitter,
		link: 'https://www.twitter.com/',
	},
	{
		id: 'social-media-4',
		icon: linkedin,
		link: 'https://www.linkedin.com/',
	},
]

export const clients = [
	{
		id: 'client-2',
		logo: binance,
	},
	{
		id: 'client-3',
		logo: coinbase,
	},
	{
		id: 'client-4',
		logo: dropbox,
	},
]
