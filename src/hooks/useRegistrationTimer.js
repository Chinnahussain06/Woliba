import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { resendOtp } from "@/src/redux/thunks/registrationThunks";
import { clearRegistrationDeadline } from "@/src/redux/slices/registrationSlice";
import {
  selectRegistrationDeadline,
  selectEmail,
} from "@/src/redux/selectors/registrationSelectors";

export const useRegistrationTimer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deadline = useAppSelector(selectRegistrationDeadline);
  const email = useAppSelector(selectEmail);

  useEffect(() => {
    if (!deadline) return;

    const check = async () => {
      if (Date.now() >= deadline) {
        dispatch(clearRegistrationDeadline());

        if (email) {
          await dispatch(resendOtp({ email }));
        }

        navigate("/register/otp-verification", {
          state: { expiredSession: true },
        });
      }
    };

    check();

    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, [deadline, email, dispatch, navigate]);
};
