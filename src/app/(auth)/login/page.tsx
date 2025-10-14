import { LoginForm } from "@/features/user-login/ui/LoginForm";
import "@/shared/api/interceptors";
export default function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
}
