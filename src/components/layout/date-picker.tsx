"use client";
import { DatePicker, Select, Space } from "antd";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PickerType } from "@/lib/definitions";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

export default function CustomDatePicker() {
  // TODO: fix selected dates and default dates unasync issue
  // TODO: fix url issue while clearing the selected dates
  const [type, setType] = useState<PickerType>(PickerType.MONTH);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (date: Dayjs) => {
    let parsedDate = "";
    if (type === PickerType.MONTH) {
      parsedDate = dayjs(date).format("YYYY-MM");
    } else if (type === PickerType.YEAR) {
      parsedDate = dayjs(date).format("YYYY");
    }

    const params = new URLSearchParams(searchParams);
    params.set("date", parsedDate);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Space>
      <Select aria-label="Picker Type" value={type} onChange={setType}>
        <Option value={PickerType.MONTH}>Month</Option>
        <Option value={PickerType.YEAR}>Year</Option>
        <Option value={PickerType.FROM_START}>From start</Option>
      </Select>
      {type !== PickerType.FROM_START && (
        <DatePicker picker={type} onChange={handleChange} />
      )}
    </Space>
  );
}
