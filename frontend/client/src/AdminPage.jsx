import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AdminDashboard />
    </div>
  );
}

export default AdminPage;