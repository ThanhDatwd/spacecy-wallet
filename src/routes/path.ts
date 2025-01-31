function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

const ROOTS_COLLECTION = '/collection';
const ROOTS_ITEM = '/item';
const ROOTS_AUCTION = '/auction';
const ROOTS_IGO = '/igo';
const ROOTS_EARN = '/earn';
const ROOTS_CATEGORY = '/view-all';
const ROOTS_VIEWALL = '/view-all';
const ROOTS_MARKETPLACE = '/marketplace';
const ROOTS_BOARC = '/boarc';
const ROOTS_DROP = '/drops';
const ROOTS_EVENT = '/event';
const ROOTS_ABOUT = '/about';
const ROOTS_BLOG = '/blog';
const ROOTS_PREDICTION = '/prediction';
const ROOTS_VIRTUAL = 'https://virtual.metaspacecy.com/';

// Main routes
export const PATH_PAGE = {
	user: '/user',
	viewAll: '/view-all',
	otherUser: '/other-user',
	mysteryBox: '/mystery-box',
};

export const PATH_MARKETPLACE = {
	root: ROOTS_MARKETPLACE,
};

export const PATH_BOARC = {
	root: ROOTS_BOARC,
};

export const PATH_DROP = {
	root: ROOTS_DROP,
	boarc: path(ROOTS_DROP, '/:id'),
};

export const PATH_BLOG = {
	root: ROOTS_BLOG,
};
export const PATH_ABOUT = {
	root: ROOTS_ABOUT,
};
export const PATH_EVENT = {
	root: ROOTS_EVENT,
	create: path(ROOTS_EVENT, '/create'),
};
export const PATH_PREDICTION = {
	root: ROOTS_PREDICTION,
	boarc: path(ROOTS_PREDICTION, '/:id'),
};

// Route Collection
export const PATH_COLLECTION = {
	root: ROOTS_COLLECTION,
	trending: path(ROOTS_COLLECTION, '/trending'),
	myCollection: path(ROOTS_COLLECTION, '/my-collection'),
	detail: path(ROOTS_COLLECTION, '/detail'),
	createItem: path(ROOTS_COLLECTION, '/create-item'),
	createCollection: path(ROOTS_COLLECTION, '/create-collection'),
	editCollection: path(ROOTS_COLLECTION, '/edit-collection'),
};

// Route Items
export const PATH_ITEM = {
	root: ROOTS_ITEM,
	sell: path(ROOTS_ITEM, '/sell'),
	detail: path(ROOTS_ITEM, '/detail'),
	createItem: path(ROOTS_ITEM, '/create-item'),
	editItem: path(ROOTS_ITEM, '/edit-item'),
};

// Route Auction
export const PATH_AUCTION = {
	root: ROOTS_AUCTION,
	liveOn: path(ROOTS_AUCTION, '/live-on'),
	upComming: path(ROOTS_AUCTION, '/up-coming'),
	completed: path(ROOTS_AUCTION, '/completed'),
	attendance: path(ROOTS_AUCTION, '/attendance'),
	create: path(ROOTS_AUCTION, '/create'),
	permission: path(ROOTS_AUCTION, '/permission'),
	detail: path(ROOTS_AUCTION, '/detail'),
	igo: path(ROOTS_AUCTION, '/igo'),
	testauction: path(ROOTS_AUCTION, '/testauction'),
};

// IGO
export const PATH_IGO = {
	root: ROOTS_IGO,
	create: path(ROOTS_IGO, '/create'),
	request: path(ROOTS_IGO, '/request'),
	detail: path(ROOTS_IGO, '/detail'),
};

//EARN
export const PATH_EARN = {
	assets: path(ROOTS_EARN, '/assets'),
	staking: path(ROOTS_EARN, '/staking'),
	userDetail: path(ROOTS_EARN, '/user-detail'),
};
// CATEGORY
export const PATH_CATEGORY = {
	root: ROOTS_CATEGORY,
	other: path(ROOTS_CATEGORY, '/other'),
	art: path(ROOTS_CATEGORY, '/collections?category=Art'),
	music: path(ROOTS_CATEGORY, '/music'),
	photography: path(ROOTS_CATEGORY, '/photography'),
	games: path(ROOTS_CATEGORY, '/games'),
	sport: path(ROOTS_CATEGORY, '/collections?category=Sport'),
	metaverse: path(ROOTS_CATEGORY, '/metaverse'),
	box: path(ROOTS_CATEGORY, '/box'),
	card: path(ROOTS_CATEGORY, '/card'),
};

// CATEGORY
export const PATH_VIEWALL = {
	root: ROOTS_VIEWALL,
	items: path(ROOTS_VIEWALL, '/items'),
	collections: path(ROOTS_VIEWALL, '/collections'),
	user: path(ROOTS_VIEWALL, '/user'),
};

//VIRTUAL WORLD
export const PATH_VIRTUAL_WORLD = {
	root: ROOTS_VIRTUAL,
	virtualWorld: path(ROOTS_VIRTUAL, '/#/time-square'),
	virtualEvent: path(ROOTS_VIRTUAL, '/#/virtual-event'),
	virtualConcert: path(ROOTS_VIRTUAL, '/#/virtual-concerts'),
	virtualExhibition: path(ROOTS_VIRTUAL, '/#/virtual-exhibition'),
	virtualSport: path(ROOTS_VIRTUAL, '/#/stadium-lusail'),
	virtualArt: path(ROOTS_VIRTUAL, '/#/boarc-gallery'),
	virtualFashionAndLuxury: path(ROOTS_VIRTUAL, '/#/fashion-luxury'),
	eventFifa: 'https://fifa.metaspacecy.com/',
	eventXmax: 'http://virtual.metaspacecy.com/#/xmas',
};
//SOCIAL MEDIA
export const PATH_SOCIAL = {
	discord: 'https://discord.gg/QDEhpR5jDC',
	tele: 'https://t.me/MetaSpacecy',
	twitter: 'https://twitter.com/metaspacecy',
	instagram: 'https://www.instagram.com/metaspacecy_nfts',
	youtube: 'https://www.youtube.com/@metaspacecy',
	facebook: 'https://www.facebook.com/metaspacecy',
	medium: 'https://metaspacecynfts.medium.com/',
};
