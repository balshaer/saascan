import HistoryPage from '@/pages/HistoryPage';
import Loading from '@/pages/Loading';
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Index = lazy(() => import('@/pages/Index'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
