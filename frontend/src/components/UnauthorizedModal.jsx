export default function UnauthorizedModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-bold mb-4">권한이 없습니다</h2>
        <p className="mb-4">이 기능에 접근할 수 있는 권한이 없습니다.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}