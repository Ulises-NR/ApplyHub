"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "@/schemas/application.schema";
import { createApplication } from "@/actions/application";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: "",
      company: "",
      date: new Date(),
      status: "dnd-applied",
    },
  });
  const { handleSubmit, formState, control } = form;

  const onSubmit = async (data) => {
    try {
      if (!user) return;

      const expectedValues = {
        ...data,
        user_id: user.uid,
      };
      await createApplication(expectedValues);

      toast.success("Application submitted");
      router.push("/hub");
    } catch {
      toast.error("Failed to create application");
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-screen-sm p-8 rounded bg-neutral-50 mx-auto space-y-8 my-32"
      >
        <FormField
          control={control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input
                  type="position"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Awesome company" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                {...field}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dnd-applied">Applied</SelectItem>
                  <SelectItem value="dnd-interviewee">Interviewee</SelectItem>
                  <SelectItem value="dnd-offer">Offer</SelectItem>
                  <SelectItem value="dnd-denied">Denied</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full disabled:bg-current/10"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
