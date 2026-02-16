"use client";

import { Accordion } from "@mantine/core";

const FAQAccordion = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Frequently Asked Question</h2>
      <Accordion variant="default" transitionDuration={200}>
        <Accordion.Item value="withdrawal">
          <Accordion.Control>How do I request a withdrawal?</Accordion.Control>
          <Accordion.Panel>
            You can request a withdrawal from your account dashboard under the
            withdrawals tab.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="bank-details">
          <Accordion.Control>
            How do I update my bank details?
          </Accordion.Control>
          <Accordion.Panel>
            Visit the settings page and update your bank information under the
            payments section.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="documents">
          <Accordion.Control>
            What documents do I need for pension claims?
          </Accordion.Control>
          <Accordion.Panel>
            {`You'll`} typically need a valid ID and pension claim form. Check
            our documentation for more details.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="delayed">
          <Accordion.Control>Why is my pension delayed?</Accordion.Control>
          <Accordion.Panel>
            Pension delays can be caused by incomplete documentation or pending
            verification.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
