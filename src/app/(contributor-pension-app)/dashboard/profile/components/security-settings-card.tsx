"use client";

import {
  Button,
  Card,
  // Checkbox,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { useState } from "react";
import ChangePasswordModal from "./change-password-modal";

const SecuritySettingsCard = () => {
  // const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card shadow="sm" radius="md" className="mt-6 bg-white p-6">
        <Stack gap="md">
          <Title order={3} className="text-gray-900">
            Security Settings
          </Title>

          <div>
            {/* <div className="flex items-center justify-between">
              <Checkbox
                label="Enable Two-Factor Authentication"
                checked={twoFactorEnabled}
                onChange={(event) =>
                  setTwoFactorEnabled(event.currentTarget.checked)
                }
                className="text-gray-800"
              />
            </div>
            <p className="mt-1 px-6 text-sm text-gray-500">
              Add an extra layer of security to your account
            </p> */}

            <Button onClick={open} className="bg-transparent text-[#2E5AAC]">
              Change Password
            </Button>
          </div>
        </Stack>
      </Card>
      <ChangePasswordModal {...{ close, opened }} />
    </>
  );
};

export default SecuritySettingsCard;
