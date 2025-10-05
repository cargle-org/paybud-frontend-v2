"use client";
import { useBaseStore } from "@/store/hook";
import React, { useEffect } from "react";
import * as z from "zod";
import ProfilePicker from "@repo/ui/extra/profile-picker";
import Seperator from "@repo/ui/extra/seperator";
import FormText from "@repo/ui/form/text";
import { IoAt, IoMail, IoMailOpenOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import FormPhoneNumber from "@repo/ui/form/phone-number";
import FormTextArea from "@repo/ui/form/text-area";
import FormDatePicker from "@repo/ui/form/date-picker";
import FormSelect from "@repo/ui/form/select";
import FormSubmit from "@repo/ui/form/submit";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { URL } from "node:url";
import useToast from "@/context/toast";
import fileService from "@/services/file.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user.service";
import { IUpdateUserPayload } from "@/types/user";
import { AxiosError } from "axios";
import { useRouter } from "nextjs-toploader/app";

const onboardingUserSchema = z.object({
  profilePicture: z
    .any()
    .refine((f) => f instanceof File, "File is required")
    .refine((f: File) => f?.size <= MAX_FILE_SIZE * 1024 * 1024, `Max file size is ${MAX_FILE_SIZE} MB`)
    .refine((f: File) => ACCEPTED_IMAGE_TYPES.includes(f.type), "Unsupported file type")
    .optional(),
  userName: z.string().min(2).max(100),
  fullName: z.string().min(2).max(100),
  contactEmail: z.email(),
  contactPhoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  sex: z.enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: z.date(),
  bio: z.string().max(160).optional(),
});

type OnboardingUserData = z.infer<typeof onboardingUserSchema>;

const OnboardingUserPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { openToast } = useToast();
  const { onboardingDetails, user, setUserProfile, setStage } = useBaseStore((state) => state);

  useEffect(() => {
    setStage("user");
  }, []);

  const form = useForm<OnboardingUserData>({
    resolver: zodResolver(onboardingUserSchema),
    defaultValues: {
      contactEmail: user?.email || onboardingDetails.user.contactEmail,
      fullName: user?.fullName || onboardingDetails.user.fullName,
      dateOfBirth: user?.profile.dateOfBirth || onboardingDetails.user.dateOfBirth ? new Date(onboardingDetails.user.dateOfBirth!) : undefined,
      contactPhoneNumber: onboardingDetails.user.contactPhoneNumber || user?.profile.contactPhoneNumber,
      sex: onboardingDetails.user.sex || user?.profile.sex,
      bio: onboardingDetails.user.bio,
      userName: onboardingDetails.user.userName || user?.profile.userName,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload: IUpdateUserPayload) => userService.updateUserProfile(user?.id!, payload),
    onSuccess: (data) => {
      openToast({
        message: "User profile updated successfully",
        description: data.message || "",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setStage("business");
      router.push("/onboarding/business");
    },
    onError: (error: any) => {
      openToast({
        message: "Error updating user profile",
        description: error?.message || "Please try again",
        type: "error",
      });
    },
  });

  async function onSubmit(data: OnboardingUserData) {
    setUserProfile(data);
    let dataToSubmit: IUpdateUserPayload = { ...data };
    console.log("profile", data.profilePicture);
    if (data.profilePicture) {
      const file = await fileService
        .uploadFile({
          file: data.profilePicture,
          label: "profilePicture",
          folder: "profile",
        })
        .catch((err: AxiosError<any>) => {
          openToast({
            message: "Error uploading profile picture",
            description: err.response?.data?.message || "Please try again",
            type: "error",
          });
          throw new Error("Error uploading profile picture");
        });
      dataToSubmit = { ...data, profilePictureId: file.data?.id };
    }
    console.log({ dataToSubmit });
    updateProfileMutation.mutate(dataToSubmit);
  }

  return (
    <div className=" w-full">
      <h3 className=" text-xl text-blue-15 text-center mb-3">User Profile</h3>
      <div className="rounded-lg border border-gray-95 p-5  bg-white">
        <div className="flex  justify-center pt-5">
          <ProfilePicker
            options={{
              acceptedFileTypes: ACCEPTED_IMAGE_TYPES,
              maxFileSizeMB: MAX_FILE_SIZE,
            }}
            fileUrl={user?.profile.profilePicture?.url ? user?.profile.profilePicture?.url : user?.profile.profilePictureUrl}
            handleFileChange={(file) => form.setValue("profilePicture", file)}
            handleError={() =>
              openToast({
                message: "Error selecting file",
                type: "error",
              })
            }
          />
          <div className="">{form.formState.errors.profilePicture?.message as string}</div>
        </div>
        <Seperator spacing="lg" />
        <div className=" grid grid-cols-2">
          <div className=" col-span-2">
            <FormText
              {...form.register("fullName")}
              leftIcon={<IoPersonOutline />}
              name="fullName"
              placeholder="Enter Full Name"
              label="Full Name"
              required
              error={form.formState.errors.fullName?.message}
            />
          </div>
          <div className=" col-span-2">
            <FormText
              {...form.register("userName")}
              leftIcon={<IoAt />}
              name="userName"
              placeholder="Enter user name..."
              label="Username"
              required
              error={form.formState.errors.userName?.message}
            />
          </div>
          <div className="">
            <FormText
              {...form.register("contactEmail")}
              leftIcon={<IoMailOpenOutline />}
              placeholder="Enter conatact email..."
              label="Contact Email"
              type="email"
              required
              error={form.formState.errors.contactEmail?.message}
            />
          </div>
          <div className="">
            <FormPhoneNumber
              value={form.watch("contactPhoneNumber")}
              {...form.register("contactPhoneNumber")}
              handleChange={(num) => form.setValue("contactPhoneNumber", num, { shouldValidate: true })}
              placeholder="Enter contact phone number..."
              label="Contact Phone Number"
              required
              error={form.formState.errors.contactPhoneNumber?.message}
            />
          </div>
          <div className="">
            <FormDatePicker
              date={form.watch("dateOfBirth")}
              onChange={(date) => {
                form.setValue("dateOfBirth", date!, { shouldValidate: true });
              }}
              placeholder="Enter date of birth..."
              name="dateOfBirth"
              label="Date of Birth"
              required
              error={form.formState.errors.dateOfBirth?.message}
            />
          </div>
          <div className="">
            <FormSelect
              name="sex"
              label="Sex"
              placeholder="Select sex..."
              value={form.watch("sex")}
              handleSelect={(value) => form.setValue("sex", value)}
              required
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
              error={form.formState.errors.sex?.message}
            />
          </div>
          <div className=" col-span-2">
            <FormTextArea placeholder="Tell us about yourself..." {...form.register("bio")} label="Bio" error={form.formState.errors.bio?.message} />
          </div>
          <div className="col-span-2">
            <FormSubmit onClick={form.handleSubmit(onSubmit)} text="Complete User Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUserPage;
