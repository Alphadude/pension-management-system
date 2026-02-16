import FAQAccordion from "./faq-accordion";
import ContactSupportForm from "./support-form";

export default function HelpSupportPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Help & Support</h1>
      <FAQAccordion />
      <ContactSupportForm />
    </main>
  );
}
