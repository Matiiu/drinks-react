import { StateCreator } from "zustand";
import { FavoritesSliceType } from "./favoritesSlice";

type Notification = {
  text: string;
  isError?: boolean;
  show: boolean;
  timeOut?: number;
};

export type NofiticationSliceType = {
  notification: Notification;
  showNotification: (
    payload: Pick<Notification, "text" | "isError" | "timeOut">
  ) => void;
  closeNotificationModal: ({ closeManual }: { closeManual?: boolean }) => void;
};

type CreateNofiticationSliceType = StateCreator<
  NofiticationSliceType & FavoritesSliceType,
  [],
  [],
  NofiticationSliceType
>;

const initialNotification: Notification = {
  text: "",
  isError: false,
  show: false,
  timeOut: 3500,
};

export const createNofiticationSlice: CreateNofiticationSliceType = (
  set,
  get
) => ({
  notification: { ...initialNotification },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        isError: payload.isError || initialNotification.isError,
        timeOut: payload.timeOut || initialNotification.timeOut,
        show: true,
      },
    });
    // LLamar a la función que cierra el modal
    get().closeNotificationModal({});
  },
  closeNotificationModal: ({ closeManual = false }) => {
    if (closeManual) {
      set({
        notification: {
          ...initialNotification,
        },
      });
    } else {
      setTimeout(
        () =>
          set({
            notification: {
              ...initialNotification,
            },
          }),
        get().notification.timeOut
      );
    }
  },
});
