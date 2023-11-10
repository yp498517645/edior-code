import { FC, ReactElement, SetStateAction, useEffect, useState } from "react";
import useMarkDown from "@/hooks/useMarkDown";
import { Input } from "antd";
import React from "react";

const { TextArea } = Input;
const MarkDownComponent: FC<{}> = (): ReactElement => {
  const [raw, setRaw, renderValue, setRenderValue] = useMarkDown("");
  return (
    <div className="flex justify-around w-screen mt-6 h-screen">
      <div className="w-1/3 h-1/4 border order-solid border-yellow-400 mr-6 min-h-[80%]">
        <TextArea
          value={raw as string}
          className="h-screen"
          onChange={({ target }) => {
            setRaw(target.value);
          }}
        />
      </div>
      <div
        className="w-1/3 h-1/4 border order-solid border-yellow-400 mr-6 min-h-[80%]"
        dangerouslySetInnerHTML={{ __html: renderValue }}
      ></div>
    </div>
  );
};

export default MarkDownComponent;
