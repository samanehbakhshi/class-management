"use client";

import { logout } from "../../../app/lib/actions/logout";

type LogoutButtonProps = {
  onDone: () => void;
};
export default function LogoutButton({ onDone }: LogoutButtonProps) {
  return (
    <button
      onClick={async () => {
        onDone();
        await logout();
      }}
    >
      خروچ
    </button>
  );
}
