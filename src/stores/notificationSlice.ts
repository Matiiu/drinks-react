import {StateCreator} from 'zustand';
import {FavoritesSliceType} from './favoritesSlice';

type Notification = {
	text: string;
	isError?: boolean;
	show: boolean;
	timeOut?: number;
};

export type NotificationSliceType = {
	notification: Notification;
	showNotification: (
		payload: Pick<Notification, 'text' | 'isError' | 'timeOut'>,
	) => void;
	closeNotificationModal: ({closeManual}: {closeManual?: boolean}) => void;
};

type createNotificationSliceType = StateCreator<
	NotificationSliceType & FavoritesSliceType,
	[],
	[],
	NotificationSliceType
>;

const initialNotification: Notification = {
	text: '',
	isError: false,
	show: false,
	timeOut: 3500,
};

export const createNotificationSlice: createNotificationSliceType = (set, get) => ({
	notification: {...initialNotification},
	showNotification: (payload) => {
		set({
			notification: {
				text: payload.text,
				isError: payload.isError || initialNotification.isError,
				timeOut: payload.timeOut || initialNotification.timeOut,
				show: true,
			},
		});
		// Close modal
		get().closeNotificationModal({});
	},
	closeNotificationModal: ({closeManual = false}) => {
		if (closeManual) {
			set({
				notification: {
					...initialNotification,
				},
			});
			return;
		}
		setTimeout(
			() =>
				set({
					notification: {
						...initialNotification,
					},
				}),
			get().notification.timeOut,
		);
	},
});
