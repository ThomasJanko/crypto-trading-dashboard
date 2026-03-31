import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import CandleStickChart from '../CandleStickChart';
import { CoinOverviewFallback } from './Fallback';

const CoinOverview = async () => {
  const result = await Promise.all([
    fetcher<CoinDetailsData>('/coins/bitcoin', {
      dex_pair_format: 'symbol',
    }),
    fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
      vs_currency: 'usd',
      days: '1',
      //   interval: 'hourly',
      precision: 'full',
    }),
  ]).catch((error) => {
    console.error(error);
    return null;
  });

  if (!result) {
    return <CoinOverviewFallback />;
  }

  const [coin, coinOHLCData] = result;

  return (
    <div id="coin-overview">
      <CandleStickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
