import { toast } from "@/components/ui/toast";
import type { FileRejection, FileWithPath } from "@mantine/dropzone";
import clsx, { type ClassValue } from "clsx";
import type { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export type ProfileStatus = "active";

const PROFILE_STATUS_COLOR: Record<ProfileStatus, string> = {
  active: "text-secondary bg-[#DCFCE7]",
};

export const getProfileStatusColor = (status: ProfileStatus) =>
  PROFILE_STATUS_COLOR[status] ?? "text-primary bg-primary/50";

/**
 * @param {string} isoDateString  An ISO 8601 birthdate, e.g. '1964-06-21T00:00:00.000Z'
 * @returns {boolean}             True if age > 60
 */
export const hasExceededSixty = (isoDateString: string) => {
  const birth = new Date(isoDateString);
  const today = new Date();

  // Calculate preliminary age
  let age = today.getFullYear() - birth.getFullYear();

  // If today's date is before their birthday this year, subtract 1
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  // Return true only if they've fully passed 60
  return age > 60;
};

export const dynamicQueryEndpoint = (
  params: Record<string, unknown>,
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const convertToCSV = (data: unknown[]) => {
  if (data.length === 0) return "";

  const firstRow = data[0] as Record<string, unknown>;
  const keys = Object.keys(firstRow);
  const csvRows = [];

  // Add header row
  csvRows.push(keys.join(","));

  // Process each row of data
  for (const row of data) {
    const values = keys.map((key) => {
      // @ts-expect-error typescript is not smart enough to know that row is a Record<string, unknown>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let val = row[key];
      if (val === null || val === undefined) {
        return "";
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      val = val.toString();

      // Check if the field contains a comma, double quote, or newline
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (/[",\n]/.test(val)) {
        // Escape double quotes by replacing " with ""
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        val = '"' + val.replace(/"/g, '""') + '"';
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return val;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};

export const downloadCSV = (data: unknown[], fileName?: string) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const MAX_SIZE_BYTES = 2048 * 1024;

export const handleDropzoneReject = (rejections: FileRejection[]) => {
  rejections.forEach(({ file, errors }) => {
    errors.forEach((e) => {
      if (e.code === "file-invalid-type") {
        toast({
          variant: "error",
          message: `Invalid file type: ${file.name}`,
        });
      }
      if (e.code === "file-too-large") {
        toast({
          variant: "error",
          message: `File is too large: ${file.name}`,
        });
      }
    });
  });
};

export const handleUploadFile = async (
  file: FileWithPath | null,
  cb:
    | Dispatch<SetStateAction<FileWithPath | null>>
    | ((file: FileWithPath) => void),
) => {
  if (!file) return;
  cb(file);
};

export const serviceEmail = "testuser@Ggmail.com";
export const headerStyles = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#6B7280",
};

export const getAgefromBirthdate = (dob: string) => {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age;
};
