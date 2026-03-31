import { fetcher } from '@/lib/coingecko.actions';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DataTable from '../DataTable';
import { TrendingCoinsOverviewFallback } from './Fallback';

const TrendingCoins = async () => {
  let trendingCoins: { coins: TrendingCoin[] } | undefined;
  try {
    trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);
  } catch (error) {
    console.error(error);
    return <TrendingCoinsOverviewFallback />;
  }

  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coin/${item.id}`}>
            <Image src={item.large} alt={item.name} width={26} height={26} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            <p>
              {isTrendingUp ? (
                <div className="flex flex-col items-center">
                  <TrendingUp width={16} height={16} />
                  <p>{item.data.price_change_percentage_24h.usd.toFixed(2)}%</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <TrendingDown width={16} height={16} />
                  <p>{item.data.price_change_percentage_24h.usd.toFixed(2)}%</p>
                </div>
              )}
            </p>
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => {
        const item = coin.item;
        return <p>{item.data.price}</p>;
      },
    },
  ];

  return (
    <div id="trending-coins">
      <DataTable
        columns={columns}
        data={trendingCoins.coins.slice(0, 6) || []}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};

export default TrendingCoins;
