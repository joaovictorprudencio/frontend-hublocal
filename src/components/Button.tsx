import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type CustomButtonProps = MuiButtonProps & {
  label: string;
};

const Button = ({ label, ...props }: CustomButtonProps) => {
  return (
    <MuiButton variant="contained" {...props}>
      {label}
    </MuiButton>
  );
};

export default Button;
