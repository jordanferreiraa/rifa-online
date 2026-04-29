import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserData {
  name: string;
  whatsapp: string;
}

interface RaffleState {
  userData: UserData | null;
  selectedPoints: number[];
  purchasedPoints: number[];
  currentStep: number;
  paymentConfirmed: boolean;

  // Actions
  setUserData: (data: UserData) => void;
  togglePoint: (point: number) => void;
  clearSelectedPoints: () => void;
  setCurrentStep: (step: number) => void;
  setPaymentConfirmed: (confirmed: boolean) => void;
  confirmPayment: () => void;
  reset: () => void;
}

export const useRaffleStore = create<RaffleState>()(
  persist(
    (set) => ({
      userData: null,
      selectedPoints: [],
      purchasedPoints: [],
      currentStep: 1,
      paymentConfirmed: false,

      setUserData: (data) => set({ userData: data }),
      
      togglePoint: (point) =>
        set((state) => {
          const isSelected = state.selectedPoints.includes(point);
          if (isSelected) {
            return {
              selectedPoints: state.selectedPoints.filter((p) => p !== point),
            };
          } else {
            return {
              selectedPoints: [...state.selectedPoints, point].sort((a, b) => a - b),
            };
          }
        }),

      clearSelectedPoints: () => set({ selectedPoints: [] }),
      
      setCurrentStep: (step) => set({ currentStep: step }),

      setPaymentConfirmed: (confirmed) => set({ paymentConfirmed: confirmed }),

      confirmPayment: () => 
        set((state) => ({
          purchasedPoints: [...new Set([...state.purchasedPoints, ...state.selectedPoints])],
          paymentConfirmed: true,
        })),

      reset: () =>
        set({
          userData: null,
          selectedPoints: [],
          purchasedPoints: [],
          currentStep: 1,
          paymentConfirmed: false,
        }),
    }),
    {
      name: "rifa-online-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
