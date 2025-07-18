import Loading from '@/modules/common/screens/Loading';
import NotFound from '@/modules/common/screens/NotFound';
import React, { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './modules/Index';
import HistoryPage from './modules/history/HistoryPage';

const AppRoutes: React.FC = memo(() => (
  <Suspense fallback={<Loading />}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
));

export default AppRoutes;
