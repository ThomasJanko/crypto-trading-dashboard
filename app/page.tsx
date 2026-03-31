import CoinOverview from '@/components/home/CoinOverview';
import { CoinOverViewFallback, TrendingCoinsOverviewFallback } from '@/components/home/Fallback';
import TrendingCoins from '@/components/home/TrendingCoins';
import { Suspense } from 'react';

const page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverViewFallback />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<TrendingCoinsOverviewFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};

export default page;
