import { ICreateBusinessDTO } from "@/types/business";
import { IUpdateUserPayload } from "@/types/user";
import { StateCreator } from "zustand";

export interface IOnboardingSlice {
  onboardingDetails: {
    user: Partial<IUpdateUserPayload>;
    business: {
      profile: Partial<
        Pick<ICreateBusinessDTO, "name" | "businessEmail" | "address" | "businessPhone" | "contactEmail" | "contactPhoneNumber" | "description">
      > & { logo?: any };
      accountDetails: Partial<Pick<ICreateBusinessDTO, "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode">>;
    };
    stage?: "user" | "business" | "success";
  };
  setUserProfile: (user: Partial<IUpdateUserPayload>) => void;
  setBusinessProfile: (
    profile: Partial<
      Pick<ICreateBusinessDTO, "name" | "businessEmail" | "address" | "businessPhone" | "contactEmail" | "contactPhoneNumber" | "description">
    >
  ) => void;
  setBusinessAccountDetails: (
    accountDetails: Partial<Pick<ICreateBusinessDTO, "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode">>
  ) => void;
  setStage: (stage: "user" | "business" | "success") => void;
}

export const createOnboardingSlice: StateCreator<IOnboardingSlice, [], [], IOnboardingSlice> = (set, get) => ({
  onboardingDetails: {
    user: {},
    business: {
      profile: {},
      accountDetails: {},
    },
    stage: "user",
  },
  setUserProfile: (user: Partial<IUpdateUserPayload>) =>
    set((state) => ({
      onboardingDetails: {
        ...state.onboardingDetails,
        user: {
          ...state.onboardingDetails.user,
          ...user,
        },
      },
    })),
  setBusinessProfile: (profile) =>
    set((state) => ({
      onboardingDetails: {
        ...state.onboardingDetails,
        business: {
          ...state.onboardingDetails.business,
          profile: {
            ...state.onboardingDetails.business.profile,
            ...profile,
          },
          accountDetails: {
            ...state.onboardingDetails.business.accountDetails,
          },
        },
      },
    })),
  setBusinessAccountDetails: (accountDetails) =>
    set((state) => ({
      onboardingDetails: {
        ...state.onboardingDetails,
        business: {
          ...state.onboardingDetails.business,
          profile: {
            ...state.onboardingDetails.business.profile,
          },
          accountDetails: {
            ...state.onboardingDetails.business.accountDetails,
            ...accountDetails,
          },
        },
      },
    })),
  setStage: (stage) => {
    set((state) => ({
      ...state,
      onboardingDetails: {
        ...state.onboardingDetails,
        stage: stage,
      },
    }));
  },
});
