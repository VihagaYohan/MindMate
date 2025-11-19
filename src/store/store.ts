import { create } from 'zustand'
import { StateType } from './'



const useStore = create((set) => ({
    loading: false,
    isError: false,
    errorMessage: "",
    changeLoadingState: () => set((state: StateType) => ({ loading: !state.loading }))
}))


export default useStore

