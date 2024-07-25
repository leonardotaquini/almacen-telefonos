import { useSnackbar } from 'notistack';

export type VariantToast = "default" | "error" | "success" | "warning" | "info" | undefined

export const useToast = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message:string, variant: VariantToast ) => {
      enqueueSnackbar(message, { variant,  anchorOrigin:{
        vertical: 'bottom',
        horizontal: 'right',
      } });
    };
  
    return showSnackbar;
  }