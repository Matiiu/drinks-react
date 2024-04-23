import {Outlet} from 'react-router-dom';

import Header from '../components/Header';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import Loader from '../components/Loader';
import {useAppStore} from '../stores/useAppStore';

export default function Layout() {
	const {loading} = useAppStore();

	return (
		<>
			{loading && <Loader />}
			<Header />
			<main className='container mx-auto py-16'>
				<Outlet />
			</main>
			<Modal />
			<Notification />
		</>
	);
}
