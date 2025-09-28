"use client";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import SignInModal from "@/components/SignInModal";
import { Button, Divider, InputAdornment, TextField } from "@mui/material";
import {
  ExpandMore,
  FavoriteBorder,
  Menu,
  NotificationsOutlined,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { logout } from "@/redux/slice/auth/authSlice";
import SearchPopup from "./SearchPopup";

interface MenuFlag {
  name: string;
  textColorHex: string;
  bgColorHex: string;
}

interface SubMenu {
  name: string;
  description?: string | null;
  actionUrl?: string | null;
  flag?: MenuFlag | null;
  subMenus: SubMenu[];
  imageUrl?: string;
}

interface Menu {
  name: string;
  description?: string | null;
  actionUrl?: string | null;
  flag?: MenuFlag | null;
  subMenus: SubMenu[];
}

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { menus } = useAppSelector((state) => state.home);
  const { user, loading } = useAppSelector((state) => state.auth);

  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [openDropdown, setIsOpenDropdown] = useState<boolean>(false);

  const handleLogout = async () => {
    dispatch(logout());
    enqueueSnackbar("Logout berhasil!", { variant: "success" });
    router.push("/");
  };

  const handleMouseEnter = () => setIsOpenDropdown(true);
  const handleMouseLeave = () => setIsOpenDropdown(false);

  return (
    <>
      <header className="w-screen fixed z-50">
        <nav className="bg-white flex h-[78px] w-full border-b border-gray-300 justify-between items-center shadow-md lg:shadow-none fixed px-4 md:px-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-10">
              <div className="flex items-center justify-center gap-4">
                <Image
                  src="/assets/logo.png"
                  alt="qubisa.com"
                  width={85}
                  height={85}
                  className="cursor-pointer"
                />
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  style={{ height: 30 }}
                />
                <Image
                  src="/assets/prakerja.png"
                  alt="prakerja"
                  width={85}
                  height={85}
                  className="cursor-pointer"
                />
              </div>

              <div
                className={`items-center space-x-4 ${
                  user ? "flex" : "hidden"
                } `}
              >
                {menus.map((menu: Menu, index: number) => {
                  const isLastMenu = index === menus.length - 1;

                  return (
                    <div key={menu.name} className="relative group">
                      <button className="flex items-center font-normal py-2 text-sm">
                        <span className="cursor-pointer hover:text-[#BF1E2E]">
                          {menu.name}
                        </span>

                        {menu.flag && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full capitalize bg-[#BF1E2E] text-white">
                            {menu.flag.name}
                          </span>
                        )}

                        <ExpandMore
                          sx={{ fontSize: 16, cursor: "pointer" }}
                          className="ml-1 transform transition-transform duration-200 group-hover:rotate-180"
                        />

                        {menu.subMenus.length > 0 && (
                          <ul className="w-[300px] rounded-md space-y-4 absolute top-full left-0 bg-white shadow p-4 opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                            {menu.subMenus.map((sub: SubMenu) => (
                              <li
                                key={sub.name}
                                className="hover:text-[#BF1E2E] cursor-pointer text-left"
                              >
                                {isLastMenu ? (
                                  sub.imageUrl ? (
                                    <a
                                      href={sub.actionUrl || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block"
                                    >
                                      <img
                                        src={sub.imageUrl}
                                        alt={sub.name}
                                        className="w-full object-cover rounded border-2 border-transparent hover:border-[#BF1E2E] transition duration-200"
                                        loading="lazy"
                                      />
                                    </a>
                                  ) : (
                                    <span className="text-gray-400 italic">
                                      No image
                                    </span>
                                  )
                                ) : (
                                  <a
                                    href={sub.actionUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block hover:text-[#BF1E2E]"
                                  >
                                    {sub.name}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={`flex-grow mx-6 ${user ? "hidden" : "block"}`}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Hi.. Let's start learning now"
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

            <div className="flex items-center space-x-5">
              <button
                className={`p-2 border rounded-md border-gray-400 cursor-pointer ${
                  user ? "block" : "hidden"
                }`}
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 text-[#373737]" />
              </button>

              <div className="flex items-center space-x-4">
                <FavoriteBorder sx={{ cursor: "pointer" }} />
                <ShoppingCartOutlined sx={{ cursor: "pointer" }} />
                <NotificationsOutlined sx={{ cursor: "pointer" }} />
              </div>

              {user ? (
                <div
                  className="flex items-center gap-2 cursor-pointer relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-[#BF1E2E] text-white">
                    <Menu sx={{ fontSize: 22 }} />
                    <span className="text-xl">
                      {user.fullPath ? (
                        <Image
                          src={user.fullPath}
                          alt="User Avatar"
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </span>
                  </div>

                  {openDropdown && (
                    <div className="absolute top-11 right-0 w-[200px] bg-white shadow-md rounded-lg">
                      <div className="flex items-center p-4 gap-2">
                        {user.fullPath && (
                          <Image
                            src={user.fullPath}
                            alt="User Avatar"
                            width={50}
                            height={50}
                            className="rounded-full"
                          />
                        )}
                        <div>
                          <span className="block">{user.name}</span>
                          <span className="block text-xs">{user.email}</span>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex flex-col">
                        <button
                          onClick={() => router.push("/profile")}
                          className="cursor-pointer text-sm px-4 py-2 text-left hover:text-[#BF1E2E]"
                        >
                          ProfilQu
                        </button>
                        <Divider />
                        <button
                          onClick={handleLogout}
                          className="text-sm cursor-pointer px-4 py-2 text-left text-[#BF1E2E]"
                        >
                          {loading ? "Logging out..." : "Keluar"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 items-center">
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#BF1E2E",
                      borderColor: "#BF1E2E",
                      "&:hover": {
                        borderColor: "#b91c1c",
                        color: "white",
                        backgroundColor: "#BF1E2E",
                      },
                      textTransform: "none",
                      fontWeight: 500,
                      height: { sm: 35, lg: 40 },
                      px: { sm: 1, lg: 3 },
                      py: { sm: 0.5, lg: 1 },
                      fontSize: { sm: "12px", lg: "14px" },
                    }}
                    onClick={() => setIsSignInOpen(true)}
                  >
                    Sign In
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#BF1E2E",
                      textTransform: "none",
                      fontWeight: 500,
                      height: { sm: 35, lg: 40 },
                      px: { sm: 1, lg: 3 },
                      py: { sm: 0.5, lg: 1 },
                      fontSize: { sm: "12px", lg: "14px" },
                      boxShadow: "none",
                      "&:hover": {
                        boxShadow: "none",
                        backgroundColor: "rgba(191, 30, 46, 0.8)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </nav>
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => {
            setIsSignInOpen(false);
            setIsOpenDropdown(false);
          }}
        />
        <SearchPopup
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </header>
    </>
  );
}
