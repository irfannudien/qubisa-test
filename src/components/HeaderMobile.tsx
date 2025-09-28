"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Menu as MenuIcon,
  Close,
  Search,
  ChevronRight,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logout } from "@/redux/slice/auth/authSlice";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import SignInModal from "./SignInModal";
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

export default function HeaderMobile() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { menus } = useAppSelector((state) => state.home) as { menus: Menu[] };
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleLogout = async () => {
    dispatch(logout());
    enqueueSnackbar("Logout berhasil!", { variant: "success" });
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white h-[60px] w-full border-b border-gray-300 shadow-md px-4 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="qubisa.com"
            width={70}
            height={70}
            className="cursor-pointer w-14 sm:w-20 md:w-30 h-auto object-contain"
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
            width={80}
            height={80}
            className="cursor-pointer w-14 sm:w-20 md:w-24 h-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5 text-[#373737] cursor-pointer" />
          </button>
          <button onClick={() => setOpen(true)}>
            <MenuIcon className="text-[#373737] cursor-pointer" />
          </button>
        </div>
      </nav>

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => {
          setIsSignInOpen(false);
        }}
      />
      <SearchPopup
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: { sx: { width: "100%" } },
        }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <IconButton onClick={() => setOpen(false)}>
            <Close sx={{ fontSize: 26, color: "#373737" }} />
          </IconButton>
        </div>

        <List>
          {!user && (
            <>
              <ListItemButton
                onClick={() => {
                  setIsSignInOpen(true);
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary="Sign In"
                  slotProps={{
                    primary: {
                      sx: { fontSize: 16 },
                    },
                  }}
                />
                <ChevronRight sx={{ fontSize: 20, color: "#373737" }} />
              </ListItemButton>
              <Divider />
              <ListItemButton>
                <ListItemText
                  primary="Sign Up"
                  slotProps={{
                    primary: {
                      sx: { fontSize: 16 },
                    },
                  }}
                />
                <ChevronRight sx={{ fontSize: 20, color: "#373737" }} />
              </ListItemButton>
              <Divider />
            </>
          )}

          {menus?.map((menu: Menu, idx: number) => {
            const isLastMenu = idx === menus.length - 1;
            const isExpanded = expandedIndex === idx;

            return (
              <div key={menu.name}>
                <ListItemButton onClick={() => toggleExpand(idx)}>
                  <ListItemText
                    primary={
                      <span
                        className={`flex items-center gap-2 ${
                          isExpanded ? "text-[#BF1E2E]" : "text-[#373737]"
                        }
                `}
                      >
                        <span>{menu.name}</span>
                        {menu.flag && (
                          <span className="px-2 py-0.5 text-xs rounded-full capitalize bg-[#BF1E2E] text-white">
                            {menu.flag.name}
                          </span>
                        )}
                      </span>
                    }
                    slotProps={{
                      primary: {
                        sx: { fontSize: 16 },
                      },
                    }}
                  />
                  {menu.subMenus.length > 0 &&
                    (isExpanded ? (
                      <ExpandLess sx={{ fontSize: 20, color: "#BF1E2E" }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 20, color: "#373737" }} />
                    ))}
                </ListItemButton>

                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((sub: SubMenu, subIdx: number) => (
                      <ListItemButton key={subIdx} sx={{ pl: 4 }}>
                        {isLastMenu ? (
                          sub.imageUrl ? (
                            <a
                              href={sub.actionUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full"
                            >
                              <img
                                src={sub.imageUrl}
                                alt={sub.name}
                                className="w-full rounded border-2 border-transparent hover:border-[#BF1E2E] transition duration-200"
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
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>

                <Divider />
              </div>
            );
          })}

          {user && (
            <>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  color: "#BF1E2E",
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                <ListItemText
                  primary="Logout"
                  slotProps={{
                    primary: {
                      sx: { fontSize: 16 },
                    },
                  }}
                />
              </ListItemButton>
              <Divider />
            </>
          )}
        </List>
      </Drawer>
    </>
  );
}
