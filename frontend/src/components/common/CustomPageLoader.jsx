export default function CustomPageLoader({ loading }) {
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }
}
