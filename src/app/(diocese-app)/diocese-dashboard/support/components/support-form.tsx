"use client";

import { Button, Textarea, TextInput } from "@mantine/core";

const ContactSupportForm = () => {
  return (
    <div className="mt-10 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Contact Support</h2>
      <form className="space-y-4">
        <TextInput
          label="Subject"
          placeholder="What can we help you with?"
          required
        />
        <Textarea
          label="Message"
          placeholder="Describe your issue or question"
          autosize
          minRows={4}
          required
        />
        <div className="flex justify-end pt-2">
          <Button className="bg-[#2E5AAC] transition-colors hover:bg-blue-700">
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactSupportForm;
