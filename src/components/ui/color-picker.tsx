import React, { useState } from "react";
import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { PaletteIcon } from "lucide-react";

export type ColorPickerProps = {
  color?: Color;
  onChange: ColorChangeHandler;
};

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger className="cursor-pointer" asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume color"
          onClick={() => setShowPopover(true)}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="end"
      >
        <TwitterPicker triangle="top-right" color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
