"use client";
import { Input } from "antd";
import { SearchProps } from "antd/es/input/Search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { Search } = Input;

export default function TransactionSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const onSearch: SearchProps["onSearch"] = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Search
      placeholder="search transactions"
      defaultValue={searchParams.get("query")?.toString()}
      onSearch={onSearch}
      enterButton
    />
  );
}
