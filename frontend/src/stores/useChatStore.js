import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"
import { useUserStore } from "./useUserStore"
import { useProductStore } from "./useProductStore.js"

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessageLoading: false,

  getUsers: async () => {

    try {
      const bookId = useProductStore.getState().book._id
      const res = await axiosInstance.get(`/messages/users/${bookId}`);

      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getMessages: async (userId) => {


    set({ isMessageLoading: true })

    try {
      const res = await axiosInstance.get(`/messages/${userId}`)

      set({ messages: res.data, isMessageLoading: false })
    } catch (error) {
      console.error(error)
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get()
    try {
      const bookId = useProductStore.getState().book._id
      const updatedMessageData = { ...messageData, bookId }
      const res = await axiosInstance.post(`messages/send/${selectedUser._id || selectedUser}`, updatedMessageData)

      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useUserStore.getState().socket;

    socket?.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser?._id || selectedUser;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useUserStore.getState().socket;
    socket?.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

}))