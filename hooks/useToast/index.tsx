import { CSSProperties } from 'react';
import toast, { ToastPosition } from 'react-hot-toast';

interface IToast {
  msg: string;
  position?: ToastPosition;
  style?: CSSProperties;
  className?: string;
  duration?: number;
}

export const useToast = () => {
  const toastError = ({
    msg,
    position = 'top-center',
    style = { maxWidth: '600px' },
    className,
    duration,
  }: IToast) => {
    toast.error(msg, { position, style, className, duration });
  };

  const toastSuccess = ({
    msg,
    position = 'top-center',
    style = { maxWidth: '600px' },
    className,
    duration,
  }: IToast) => {
    toast.success(msg, { position, style, className, duration });
  };

  const toastWarning = ({
    msg,
    position = 'top-center',
    style = { maxWidth: '600px' },
    className,
    duration,
  }: IToast) => {
    toast.error(msg, { position, style, className, duration });
  };
  return { toastError, toastSuccess, toastWarning };
};
