import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress 설정 커스터마이징 (optional)
NProgress.configure({ showSpinner: false, speed: 500 });

export default function ProgressBar({ start }) {
  useEffect(() => {
    if (start) NProgress.start();
    else NProgress.done();
    return () => NProgress.done(); // unmount 시 안전하게 정리
  }, [start]);

  return null; // UI 자체는 없음 (상단 바만 보임)
}