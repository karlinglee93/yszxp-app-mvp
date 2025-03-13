"use client";
import { DatePicker, Select, Space } from "antd";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PickerType } from "@/lib/definitions";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

export default function CustomDatePicker() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [type, setType] = useState<PickerType>(() =>
    searchParams.get("date")?.length === 4 ? PickerType.YEAR : PickerType.MONTH
  );
  const [open, setOpen] = useState(false);

  const handleSelect = (value: PickerType) => {
    setType(value);
    setOpen(true);
  };

  const handleChange = (date: Dayjs) => {
    const params = new URLSearchParams(searchParams);
    if (date) {
      let parsedDate = "";
      if (type === PickerType.MONTH) {
        parsedDate = dayjs(date).format("YYYY-MM");
      } else if (type === PickerType.YEAR) {
        parsedDate = dayjs(date).format("YYYY");
      }
      params.set("date", parsedDate);
    } else {
      params.delete("date");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Space>
      <Select
        style={{ width: 100 }}
        aria-label="Picker Type"
        value={type}
        onChange={handleSelect}
      >
        <Option value={PickerType.MONTH}>Month</Option>
        <Option value={PickerType.YEAR}>Year</Option>
        <Option disabled value={PickerType.FROM_START}>
          From start
        </Option>
      </Select>
      {type !== PickerType.FROM_START && (
        <DatePicker
          picker={type}
          onChange={handleChange}
          defaultValue={dayjs(searchParams.get("date"))}
          needConfirm
          open={open}
          onOk={() => setOpen(false)}
          onClick={() => setOpen(!open)}
        />
      )}
    </Space>
  );
}
