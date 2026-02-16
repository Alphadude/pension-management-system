import { useNumberInput } from "@/hooks/logic/use-number-input";
import type { InvoicesFormData } from "@/types/common";
import { ActionIcon, Stack, Textarea, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { Trash } from "lucide-react";
import numeral from "numeral";
import { useEffect } from "react";

type LineItemProps = {
  index: number;
  form: UseFormReturnType<InvoicesFormData>;
  canRemove: boolean;
};

const LineItem = ({ index, form, canRemove }: LineItemProps) => {
  const quantityInput = useNumberInput(form, `lineItems.${index}.quantity`, 0);
  const unitCostInput = useNumberInput(form, `lineItems.${index}.unitCost`, 0);

  const subTotal =
    Number(quantityInput.display.replace(/,/g, "")) *
    Number(unitCostInput.display.replace(/,/g, ""));
  useEffect(() => {
    if (subTotal) {
      form.setFieldValue(`lineItems.${index}.totalCost`, subTotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTotal]);

  return (
    <div className="grid grid-cols-[auto_20px]">
      <Stack className="gap-y-3 sm:gap-y-4">
        <Textarea
          label="Project/Service Description"
          placeholder="Enter project description"
          classNames={{
            input: "h-[98px]",
          }}
          key={form.key(`lineItems.${index}.description`)}
          {...form.getInputProps(`lineItems.${index}.description`)}
        />
        <TextInput
          label="Quantity"
          placeholder="Enter quantity"
          key={form.key(`lineItems.${index}.quantity`)}
          {...form.getInputProps(`lineItems.${index}.quantity`)}
          value={quantityInput.display}
          onChange={quantityInput.onChange}
          onBlur={quantityInput.onBlur}
        />
        <TextInput
          label="Unit Cost(N)"
          placeholder="Enter Amount"
          key={form.key(`lineItems.${index}.unitCost`)}
          {...form.getInputProps(`lineItems.${index}.unitCost`)}
          value={unitCostInput.display}
          onChange={unitCostInput.onChange}
          onBlur={unitCostInput.onBlur}
        />
        <TextInput
          label="Subtotal (N)"
          placeholder="Enter Amount"
          key={form.key(`lineItems.${index}.totalCost`)}
          {...form.getInputProps(`lineItems.${index}.totalCost`)}
          value={numeral(subTotal).format("0,0.00")}
          disabled
        />
      </Stack>
      {canRemove && (
        <ActionIcon
          variant="transparent"
          onClick={() => form.removeListItem("lineItems", index)}
        >
          <Trash />
        </ActionIcon>
      )}
    </div>
  );
};

export default LineItem;
