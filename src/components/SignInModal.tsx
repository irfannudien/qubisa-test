"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { loginUser } from "@/redux/slice/auth/authSlice";
import Modal from "./elements/Modal";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Formik, Field, FieldProps, Form } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  KeyboardArrowRight,
} from "@mui/icons-material";
import Link from "next/link";
import { useSnackbar } from "notistack";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface SignInValues {
  email: string;
  password: string;
}

// ====== COMPONENTS ======
const EmailField = () => (
  <Field name="email">
    {({ field, meta }: FieldProps) => (
      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        color="success"
        size="small"
        error={meta.touched && !!meta.error}
      >
        <InputLabel htmlFor="email" sx={{ fontSize: 12 }}>
          Email
        </InputLabel>
        <OutlinedInput
          {...field}
          id="email"
          type="email"
          label="Email"
          inputProps={{ sx: { fontSize: 12 } }}
        />
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    )}
  </Field>
);

const PasswordField = ({
  showPassword,
  toggleShow,
}: {
  showPassword: boolean;
  toggleShow: () => void;
}) => (
  <Field name="password">
    {({ field, meta }: FieldProps) => (
      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        color="success"
        size="small"
        error={meta.touched && !!meta.error}
      >
        <InputLabel htmlFor="password" sx={{ fontSize: 12 }}>
          Password
        </InputLabel>
        <OutlinedInput
          {...field}
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          inputProps={{ sx: { fontSize: 12 } }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={toggleShow}
                edge="end"
                sx={{ "& svg": { fontSize: 20 } }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    )}
  </Field>
);

const LoginButton = ({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) => (
  <Button
    type="submit"
    variant="contained"
    size="small"
    fullWidth
    disabled={disabled}
    sx={{
      mt: 2,
      textTransform: "none",
      boxShadow: "none",
      backgroundColor: disabled ? "grey.300" : "#BF1E2E",
      color: disabled ? "text.disabled" : "white",
      cursor: disabled ? "not-allowed" : "pointer",
      "&:hover": {
        backgroundColor: disabled ? "grey.400" : "rgba(191, 30, 46, 0.8)",
        boxShadow: "none",
      },
    }}
  >
    {loading ? "Loading..." : "Masuk"}
  </Button>
);

const SocialLoginButton = ({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) => (
  <Button
    fullWidth
    size="small"
    variant="outlined"
    sx={{
      textTransform: "none",
      backgroundColor: "transparent",
      boxShadow: "none",
      borderColor: "#373737",
      color: "#000",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div className="flex items-center space-x-3">
      <Image src={icon} alt={`${label} Icon`} width={20} height={20} />
      <span>{label}</span>
    </div>
    <KeyboardArrowRight />
  </Button>
);

// ====== MAIN COMPONENT ======
export default function SignInModal({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);
  const initialValues: SignInValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email wajib diisi")
      .email("Email tidak valid"),
    password: Yup.string()
      .min(6, "Minimal 6 karakter")
      .required("Password wajib diisi"),
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full bg-white flex justify-between gap-10 overflow-hidden">
        <div className="w-[50%]">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop
          >
            {[1, 2, 3].map((i) => (
              <SwiperSlide key={i}>
                <Image
                  src="/assets/image-1.png"
                  width={500}
                  height={500}
                  alt="Promo Image"
                  className="object-contain rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <div className="max-w-xs space-y-4">
            <div className="text-center space-y-2 px-2">
              <h3 className="text-3xl font-bold text-[#373737]">
                Siap Belajar? Mulai Sekarang
              </h3>
              <p className="text-[#373737] text-sm">
                Masukkan email atau nomor handphone untuk masuk ke akun Kamu
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const result = await dispatch(loginUser(values));
                setSubmitting(false);

                if (loginUser.fulfilled.match(result)) {
                  enqueueSnackbar("Login berhasil", { variant: "success" });
                  onClose();
                } else if (loginUser.rejected.match(result)) {
                  enqueueSnackbar("Email atau password salah", {
                    variant: "error",
                  });
                }
              }}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <EmailField />
                  <PasswordField
                    showPassword={showPassword}
                    toggleShow={toggleShowPassword}
                  />
                  <LoginButton
                    loading={loading}
                    disabled={
                      isSubmitting ||
                      loading ||
                      !values.email ||
                      !values.password
                    }
                  />
                </Form>
              )}
            </Formik>

            <div className="text-center text-sm text-gray-500">
              atau mulai dengan
            </div>
            <SocialLoginButton label="Google" icon="/assets/google-icon.svg" />

            <div className="text-center pt-4 text-sm text-gray-600">
              Pengguna Baru?{" "}
              <Link href="" className="text-[#BF1E2E] font-semibold">
                Buat Akun
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
