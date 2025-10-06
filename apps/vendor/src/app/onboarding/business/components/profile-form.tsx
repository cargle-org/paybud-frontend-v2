import useToast from "@/context/toast";
import { useBaseStore } from "@/store/hook";
import React, { useEffect } from "react";
import ProfilePicker from "@repo/ui/extra/profile-picker";
import Seperator from "@repo/ui/extra/seperator";
import FormText from "@repo/ui/form/text";
import { IoBusinessOutline, IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import FormPhoneNumber from "@repo/ui/form/phone-number";
import FormTextArea from "@repo/ui/form/text-area";
import FormSubmit from "@repo/ui/form/submit";
import z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import BackButton from "@repo/ui/extra/back-button";
import { useRouter } from "nextjs-toploader/app";

const onboardingBusinessProfileSchema = z.object({
  logo: z
    .any()
    .refine((f) => !f || f instanceof File, "File is required")
    .refine((f: File) => f?.size <= MAX_FILE_SIZE * 1024 * 1024, `Max file size is ${MAX_FILE_SIZE} MB`)
    .refine((f: File) => ACCEPTED_IMAGE_TYPES.includes(f.type), "Unsupported file type")
    .optional(),
  name: z.string().min(2).max(100),
  // category: z.enum([]),
  address: z.string().min(2).max(100),
  businessEmail: z.email(),
  businessPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  contactEmail: z.email(),
  contactPhoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  description: z.string().max(160).optional(),
});

type OnboardingBusinessProfile = z.infer<typeof onboardingBusinessProfileSchema>;

const OnboardingProfileForm = () => {
  const router = useRouter();
  const { openToast } = useToast();
  const { user, setBusinessProfile, setStage, onboardingDetails } = useBaseStore((state) => state);

  useEffect(() => {
    setStage("business");
  }, []);

  const form = useForm<OnboardingBusinessProfile>({
    resolver: zodResolver(onboardingBusinessProfileSchema),
    defaultValues: {
      logo: onboardingDetails.business.profile.logo,
      name: onboardingDetails.business.profile.name,
      address: onboardingDetails.business.profile.address,
      businessEmail: onboardingDetails.business.profile.businessEmail || user?.email,
      businessPhone: onboardingDetails.business.profile.businessPhone || user?.phoneNumber,
      contactEmail: onboardingDetails.business.profile.contactEmail || user?.profile.contactEmail,
      contactPhoneNumber: onboardingDetails.business.profile.contactPhoneNumber || user?.profile.contactPhoneNumber,
      description: onboardingDetails.business.profile.description,
    },
  });

  async function onSubmit(data: OnboardingBusinessProfile) {
    setBusinessProfile(data);
    router.push("/onboarding/business?step=account-details");
  }
  return (
    <div className="w-full">
      <div className=" relative">
        <BackButton onClick={() => router.back()} className="absolute left-0" />
        <h3 className=" text-xl text-blue-15 text-center mb-3">Company Profile</h3>
      </div>
      <div className="rounded-lg border border-gray-95 p-5  bg-white">
        <div className="flex  justify-center pt-5">
          <ProfilePicker
            options={{
              acceptedFileTypes: ACCEPTED_IMAGE_TYPES,
              maxFileSizeMB: MAX_FILE_SIZE,
            }}
            handleFileChange={(file) => form.setValue("logo", file)}
            handleError={() =>
              openToast({
                message: "Error selecting file",
                type: "error",
              })
            }
          />
        </div>
        <Seperator spacing="lg" />
        <div className=" grid grid-cols-2">
          <div className=" col-span-2">
            <FormText
              {...form.register("name")}
              leftIcon={<IoBusinessOutline />}
              placeholder="Enter company name..."
              label="Company Name"
              required
              error={form.formState.errors.name?.message}
            />
          </div>
          <div className=" col-span-2">
            <FormText
              {...form.register("address")}
              leftIcon={<IoLocationOutline />}
              placeholder="Enter address..."
              label="Address"
              required
              error={form.formState.errors.address?.message}
            />
          </div>
          <div className="">
            <FormText
              {...form.register("businessEmail")}
              leftIcon={<IoMailOpenOutline />}
              placeholder="Enter business email..."
              label="Business Email"
              type="email"
              required
              error={form.formState.errors.businessEmail?.message}
            />
          </div>
          <div className="">
            <FormPhoneNumber
              value={form.watch("businessPhone")}
              {...form.register("businessPhone")}
              handleChange={(num) => form.setValue("businessPhone", num, { shouldValidate: true })}
              placeholder="Enter business phone number..."
              label="Business Phone Number"
              required
              error={form.formState.errors.contactPhoneNumber?.message}
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
          {/* <div className="">
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
          </div> */}
          <div className=" col-span-2">
            <FormTextArea
              placeholder="A brief information..."
              {...form.register("description")}
              label="Description"
              error={form.formState.errors.description?.message}
            />
          </div>
          <div className="col-span-2">
            <FormSubmit onClick={form.handleSubmit(onSubmit)} text="Complete Company Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingProfileForm;
