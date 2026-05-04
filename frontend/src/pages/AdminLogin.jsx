import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Lock, Truck, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) navigate("/admin/dashboard", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Bine ai venit!");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.detail || "Autentificare eșuată";
      toast.error(typeof msg === "string" ? msg : "Autentificare eșuată");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.15),transparent_60%)]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
        <Link to="/" data-testid="admin-login-home-link" className="inline-flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
          <span className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
            <Truck className="w-5 h-5 text-orange-400" />
          </span>
          BGD<span className="text-orange-500">-</span>Trans
        </Link>

        <h1 className="mt-8 text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {t.admin.loginTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-500">Doar pentru administratori.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
          <div>
            <Label htmlFor="email" className="text-slate-700 font-semibold">{t.admin.email}</Label>
            <Input
              id="email"
              type="email"
              data-testid="admin-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 h-12 rounded-xl"
              placeholder="admin@bgd-trans.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-slate-700 font-semibold">{t.admin.password}</Label>
            <Input
              id="password"
              type="password"
              data-testid="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 h-12 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="w-full h-12 rounded-xl bg-orange-500 hover:bg-orange-600 font-bold"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lock className="w-4 h-4 mr-2" />}
            {t.admin.login}
          </Button>
        </form>
      </div>
    </div>
  );
}
