import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LanguageContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { LogOut, Truck, Phone, MessageCircle, RefreshCw, Trash2, Inbox, Search, Download } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const STATUS_STYLE = {
  new: "bg-orange-100 text-orange-700 border-orange-200",
  contacted: "bg-blue-100 text-blue-700 border-blue-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  cancelled: "bg-slate-100 text-slate-600 border-slate-200",
};

export default function AdminDashboard() {
  const { user, token, logout, loading: authLoading } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/admin/login", { replace: true });
  }, [authLoading, user, navigate]);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(data);
    } catch (e) {
      toast.error("Nu s-au putut încărca rezervările");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { if (token) fetchBookings(); }, [token, fetchBookings]);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await axios.patch(`${API}/admin/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.map((b) => (b.id === id ? data : b)));
      toast.success("Status actualizat");
    } catch (e) {
      toast.error("Eroare la actualizare");
    }
  };

  const deleteBooking = async (id) => {
    if (!confirm("Ștergi această rezervare?")) return;
    try {
      await axios.delete(`${API}/admin/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success("Rezervare ștearsă");
    } catch (e) {
      toast.error("Eroare la ștergere");
    }
  };

  const onLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const counts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (typeFilter !== "all" && b.transport_type !== typeFilter) return false;
      if (!q) return true;
      return (
        b.full_name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.departure.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q)
      );
    });
  }, [bookings, statusFilter, typeFilter, search]);

  const exportCsv = () => {
    if (filtered.length === 0) {
      toast.error("Nicio rezervare de exportat");
      return;
    }
    const headers = ["Data", "Nume", "Telefon", "Plecare", "Destinație", "Tip", "Status", "Mesaj"];
    const escape = (v) => {
      const s = (v ?? "").toString().replace(/"/g, '""');
      return /[",\n;]/.test(s) ? `"${s}"` : s;
    };
    const rows = filtered.map((b) => [
      new Date(b.created_at).toLocaleString("ro-RO"),
      b.full_name,
      b.phone,
      b.departure,
      b.destination,
      b.transport_type,
      b.status,
      b.message || "",
    ].map(escape).join(","));
    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bgd-trans-rezervari-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`${filtered.length} rezervări exportate`);
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl h-16 flex items-center justify-between">
          <Link to="/" data-testid="admin-home-link" className="flex items-center gap-2 font-bold text-lg">
            <span className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <Truck className="w-5 h-5 text-orange-400" />
            </span>
            BGD<span className="text-orange-500">-</span>Trans <span className="text-slate-400 font-normal ml-2 text-sm">/ admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-500">{user?.email}</span>
            <Button
              variant="outline"
              onClick={onLogout}
              data-testid="admin-logout-btn"
              className="rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t.admin.logout}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 max-w-7xl py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.admin.dashboard}
            </h1>
            <p className="mt-2 text-slate-500">{filtered.length} / {bookings.length} total</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={fetchBookings} data-testid="admin-refresh-btn" variant="outline" className="rounded-xl">
              <RefreshCw className="w-4 h-4 mr-2" /> Reîncarcă
            </Button>
            <Button onClick={exportCsv} data-testid="admin-export-csv" className="rounded-xl bg-slate-900 hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {["new", "contacted", "confirmed", "cancelled"].map((s) => (
            <div key={s} data-testid={`stat-${s}`} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="text-xs font-bold tracking-[0.15em] uppercase text-slate-500">{t.admin.status[s]}</div>
              <div className="mt-1 text-3xl font-bold text-slate-900">{counts[s] || 0}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              data-testid="admin-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caută după nume, telefon, oraș..."
              className="pl-9 h-11 rounded-xl"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger data-testid="admin-status-filter" className="h-11 w-full sm:w-44 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate statusurile</SelectItem>
              <SelectItem value="new">{t.admin.status.new}</SelectItem>
              <SelectItem value="contacted">{t.admin.status.contacted}</SelectItem>
              <SelectItem value="confirmed">{t.admin.status.confirmed}</SelectItem>
              <SelectItem value="cancelled">{t.admin.status.cancelled}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger data-testid="admin-type-filter" className="h-11 w-full sm:w-44 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toate tipurile</SelectItem>
              <SelectItem value="persoane">Persoane</SelectItem>
              <SelectItem value="colete">Colete</SelectItem>
              <SelectItem value="auto">Auto</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">Se încarcă...</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="mt-3 text-slate-500">{bookings.length === 0 ? t.admin.empty : "Nicio rezervare nu se potrivește filtrului."}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-testid="bookings-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Nume</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Rută</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((b) => (
                    <TableRow key={b.id} data-testid={`booking-row-${b.id}`}>
                      <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                        {new Date(b.created_at).toLocaleString("ro-RO", { dateStyle: "short", timeStyle: "short" })}
                      </TableCell>
                      <TableCell className="font-semibold text-slate-900">{b.full_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a href={`tel:${b.phone}`} className="text-slate-700 hover:text-orange-500 inline-flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {b.phone}
                          </a>
                          <a
                            href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:opacity-80"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {b.departure} <span className="text-slate-400">→</span> {b.destination}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{b.transport_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={b.status} onValueChange={(v) => updateStatus(b.id, v)}>
                          <SelectTrigger data-testid={`status-select-${b.id}`} className={`h-8 w-36 text-xs font-bold border ${STATUS_STYLE[b.status] || ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">{t.admin.status.new}</SelectItem>
                            <SelectItem value="contacted">{t.admin.status.contacted}</SelectItem>
                            <SelectItem value="confirmed">{t.admin.status.confirmed}</SelectItem>
                            <SelectItem value="cancelled">{t.admin.status.cancelled}</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-testid={`delete-btn-${b.id}`}
                          onClick={() => deleteBooking(b.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
