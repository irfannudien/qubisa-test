import { useAppDispatch, useAppSelector } from "@/redux/store";
import { History, Close, Search } from "@mui/icons-material";
import { useState } from "react";
import Popup from "./elements/Popup";
import { InputAdornment, TextField } from "@mui/material";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const searchPopulerKeyword = useAppSelector(
    (state) => state.home.searchPopulerKeyword
  );

  const [search, setSearch] = useState("");

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      customHeader={
        <div className="w-full">
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Hi... Mau belajar apa nih?"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "gray",
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "gray",
                },
            }}
          />
        </div>
      }
    >
      <div className="w-full max-w-7xl">
        <h3 className="font-semibold mb-3">Terakhir dicari</h3>
        <ul className="flex flex-col gap-3">
          {searchPopulerKeyword.map((item, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 text-gray-700 py-1 rounded hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex gap-2 w-[85%]">
                <History className="w-4 h-4 text-gray-400" />
                {item}
              </div>
              <button onClick={() => setSearch("")} className="flex-1">
                <Close sx={{ fontSize: 20, color: "#6B7280" }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Popup>
  );
}
