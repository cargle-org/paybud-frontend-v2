import useToast from "@/context/toast";
import businessService from "@/services/business.service";
import fileService from "@/services/file.service";
import settingsService from "@/services/settings.service";
import { useBaseStore } from "@/store/hook";
import { ICreateBusinessDTO } from "@/types/business";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@repo/ui/form/select";
import FormSubmit from "@repo/ui/form/submit";
import FormText from "@repo/ui/form/text";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import { useForm } from "react-hook-form";
import { IoClipboardOutline, IoJournalOutline, IoPersonOutline } from "react-icons/io5";
import z from "zod";

//  "businessAccountName" | "businessAccountNumber" | "businessBVN" | "businessBankCode"

const onboardingBusinessAccountDetailsSchema = z.object({
  businessAccountName: z.string().min(2).max(100),
  businessAccountNumber: z.string().min(10).max(10),
  businessBVN: z.string().min(11).max(11),
  businessBankCode: z.string().min(3).max(3),
});

type OnboardingAccountDetails = z.infer<typeof onboardingBusinessAccountDetailsSchema>;

const OnboardingAccountDetailsForm = () => {
  const router = useRouter();
  const { openToast } = useToast();
  const { user, setBusinessAccountDetails, setStage, onboardingDetails } = useBaseStore((state) => state);

  const { data } = useQuery({
    queryKey: ["banks"],
    queryFn: settingsService.fetchBanks,
  });

  const form = useForm<OnboardingAccountDetails>({
    resolver: zodResolver(onboardingBusinessAccountDetailsSchema),
    defaultValues: {
      businessAccountName: onboardingDetails.business.accountDetails.businessAccountName,
      businessAccountNumber: onboardingDetails.business.accountDetails.businessAccountNumber,
      businessBVN: onboardingDetails.business.accountDetails.businessBVN,
      businessBankCode: onboardingDetails.business.accountDetails.businessBankCode,
    },
  });

  const createBusinessMutation = useMutation({
    mutationFn: businessService.createBusiness,
    onSuccess: (data) => {
      openToast({
        type: "success",
        message: data.message,
      });
    },
    onError: (data) => {
      openToast({
        type: "error",
        message: "Business Creation Failed",
        description: data.message,
      });
    },
  });

  async function onSubmit(data: OnboardingAccountDetails) {
    setBusinessAccountDetails(data);
    let dataToSubmit: ICreateBusinessDTO = { userId: user?.id!, ...(onboardingDetails.business.profile as any), ...data };
    if (onboardingDetails.business.profile.logo) {
      const file = await fileService
        .uploadFile({
          file: onboardingDetails.business.profile.logo,
          label: "businessLogo",
          folder: "businessProfile",
        })
        .catch((err: AxiosError<any>) => {
          openToast({
            message: "Error uploading profile picture",
            description: err.response?.data?.message || "Please try again",
            type: "error",
          });
          throw new Error("Error uploading profile picture");
        });
      dataToSubmit = { ...dataToSubmit, logoId: file.data?.id };
    }
    createBusinessMutation.mutate(dataToSubmit);
    router.push("/onboarding/success");
  }

  return (
    <div className="w-full">
      <h3 className=" text-xl text-blue-15 text-center mb-3">Business Account Details</h3>
      <div className="rounded-lg border border-gray-95 p-5  bg-white">
        <div className=" grid grid-cols-2">
          <div className=" col-span-2">
            <FormText
              {...form.register("businessAccountName")}
              leftIcon={<IoPersonOutline />}
              placeholder="Enter business account name..."
              label="Business Account Name"
              required
              error={form.formState.errors.businessAccountName?.message}
            />
          </div>
          <div className=" col-span-2">
            <FormText
              {...form.register("businessAccountNumber")}
              leftIcon={<IoJournalOutline className=" transform rotate-270" />}
              placeholder="Enter business account number..."
              label="Business Account Number"
              required
              error={form.formState.errors.businessAccountNumber?.message}
            />
          </div>
          <div className="">
            <FormText
              {...form.register("businessBVN")}
              leftIcon={<IoClipboardOutline />}
              placeholder="Enter business BVN..."
              label="Business BVN"
              required
              error={form.formState.errors.businessBVN?.message}
            />
          </div>
          <div className="">
            <FormSelect
              {...form.register("businessBankCode")}
              label="Select Bank"
              placeholder="Select Bank"
              value={form.watch("businessBankCode")}
              handleSelect={(value) => form.setValue("businessBankCode", value)}
              required
              options={data?.data?.map((bank) => ({ label: bank.name, value: bank.code })) || []}
              error={form.formState.errors.businessBankCode?.message}
            />
          </div>

          <div className="col-span-2">
            <FormSubmit onClick={form.handleSubmit(onSubmit)} text="Complete User Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingAccountDetailsForm;
