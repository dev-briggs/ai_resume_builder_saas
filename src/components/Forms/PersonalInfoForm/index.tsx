import { debounce } from "lodash-es";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personalInfoSchema, PersonalInfoSchema } from "@/schema/personal-info";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import { PhoneInput } from "@/components/ui/phone-input";
import { useResumeContext } from "@/components/ResumeEditor/context";
import { Button } from "@/components/ui/button";

export default function PersonalInfoForm() {
  const { resumeData, setResumeData } = useResumeContext();

  const form = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName,
      lastName: resumeData.lastName,
      jobTitle: resumeData.jobTitle,
      country: resumeData.country,
      city: resumeData.city,
      phone: resumeData.phone,
      email: resumeData.email,
    },
  });

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(
    null,
  );

  useEffect(() => {
    const debouncedCB = debounce(async (val) => {
      const isValid = await form.trigger(); // trigger validation because we bypass normal submission via the form submit button
      if (!isValid) return;
      setResumeData({ ...resumeData, ...val });
    }, 300);

    const { unsubscribe } = form.watch(debouncedCB);

    return () => {
      unsubscribe(); // cleanup function to unsubscribe from the watch
      debouncedCB.cancel(); // cancel the debounced function to prevent memory leaks
    };
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal Info</h2>
        <p className="text-muted-foreground text-sm">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Your photo</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldValues}
                      onChange={(e) => {
                        const files = e.target.files;
                        fieldValues.onChange(files ? files[0] : null); // event returns a FileList but schema only supports File
                      }}
                      ref={photoInputRef}
                    />
                  </FormControl>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => {
                      fieldValues.onChange(null);
                      if (photoInputRef.current)
                        photoInputRef.current.value = "";
                    }}
                  >
                    Remove
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountryDropdown
                      defaultValue={field.value}
                      onChange={(country) => {
                        field.onChange(country.alpha3);
                        setSelectedCountry(country);
                        form.setValue("phone", country.countryCallingCodes[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                    value={field.value}
                    placeholder="Enter your number"
                    defaultCountry={selectedCountry?.alpha2}
                  />
                </FormControl>
                <FormDescription>
                  Include country code (e.g. +34)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
