import { Link } from "react-router-dom";

interface BookingDialogProps {
  children: React.ReactNode;
}

export function BookingDialog({ children }: BookingDialogProps) {
  return (
    <Link to="/booking">
      {children}
    </Link>
  );
}
