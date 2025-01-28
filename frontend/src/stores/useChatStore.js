import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios.js"
import { useUserStore } from "./useUserStore"


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null ,
    isMessageLoading: false,

    getUsers: async () => {
       
        try {
          const res = await axiosInstance.get("/messages/users");
         // console.log(res.data)
          set({ users: res.data });
        } catch (error) {
          toast.error(error.response.data.message);
        } 
      },

    getMessages: async (userId) => {
       
        set({ isMessageLoading: true })
        
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            console.log(res.data)
            set({ messages: res.data, isMessageLoading: false })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },    
 
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`, messageData)
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
          const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
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

    setSelectedUser: (selectedUser) => set({selectedUser}),

}))