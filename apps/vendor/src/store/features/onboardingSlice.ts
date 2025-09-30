import { ICreateBusinessDTO } from "@/types/business";
import { IUpdateUserDto } from "@/types/user";
import { StateCreator } from "zustand";

export interface IOnboardingSlice {
  onboardingDetails: {
    user: Partial<IUpdateUserDto>;
    business: {
      profile: Partial<
        Pick<ICreateBusinessDTO, "name" | "businessEmail" | "address" | "businessPhone" | "contactEmail" | "contactPhoneNumber" | "description">
      >;
      accountDetails: Partial<Pick<ICreateBusinessDTO, "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode">>;
    };
  };
  setUserProfile: (user: Partial<IUpdateUserDto>) => void;
  setBusinessProfile: (
    profile: Partial<
      Pick<ICreateBusinessDTO, "name" | "businessEmail" | "address" | "businessPhone" | "contactEmail" | "contactPhoneNumber" | "description">
    >
  ) => void;
  setBusinessAccountDetails: (
    accountDetails: Partial<Pick<ICreateBusinessDTO, "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode">>
  ) => void;
}

export const createOnboardingSlice: StateCreator<IOnboardingSlice, [], [], IOnboardingSlice> = (set, get) => ({
  onboardingDetails: {
    user: {},
    business: {
      profile: {},
      accountDetails: {},
    },
  },
  setUserProfile: (user: Partial<IUpdateUserDto>) =>
    set((state) => ({
      onboardingDetails: {
        ...state.onboardingDetails,
        user: {
          ...state.onboardingDetails.user,
          ...user,
        },
      },
    })),
  setBusinessProfile: (
    profile: Partial<
      Pick<ICreateBusinessDTO, "name" | "businessEmail" | "address" | "businessPhone" | "contactEmail" | "contactPhoneNumber" | "description">
    >
  ) =>
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
  setBusinessAccountDetails: (
    accountDetails: Partial<Pick<ICreateBusinessDTO, "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode">>
  ) =>
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
});
