import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { useChatStore } from "../stores/useChatStore"
import { useUserStore } from "./useUserStore.js";
export const useReportStore = create((set, get) => ({
    
    report: [],
    allReports: [],
    loading: false,

    getReports: async () => {
        set({ loading: true })

        try {
            const res = await axiosInstance.get('/report/get-report')
            set({ allReports: res.data, loading: false })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    sendReport: async (reportData) => {
        
        try {
            const userId = useUserStore.getState().user
            const res = await axiosInstance.post(`/report/send-report/${userId?._id}`, reportData)
            console.log(res,"res")
            toast.success("Report send")
            set({ report: res.data, loading: false })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


}))