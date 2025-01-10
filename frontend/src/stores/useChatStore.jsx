import { create } from "zustand"
import toast from "react-hot-toast"
import axios from "axios"
import { useUserStore } from "./useUserStore"


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null ,
    isMessageLoading: false,
    
    getMessages: async (userId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axios.get(`http://localhost:8888/api/message/${userId}`)
            set({ messages: res.data, isMessageLoading: false })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get()
        try {
            const res = await axios.post(`http://localhost:8888/api/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    realTimeMessages: async () => {
        const {selectedUser} = get()
        if(!selectedUser) return 

        const socket = useUserStore.getState().socket
        socket.on("newMessage",(newMessage)=>{
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
            if(!isMessageSentFromSelectedUser) return
            set({messages: [...get().messages,newMessage]})
        })
    },

    stopRealTimeMessages:  () =>{
        const socket = useUserStore.getState().socket
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({selectedUser}),

}))